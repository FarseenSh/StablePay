import { Pool, QueryResult } from 'pg';
import { format as sqlFormat } from 'pg-format';
import config from '../config';
import logger from '../utils/logger';

/**
 * Payment status enum
 */
export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

/**
 * Payment model
 */
export interface Payment {
  id: string;
  merchantId: string;
  amount: number;
  currency: string;
  reference: string;
  status: PaymentStatus;
  transactionSignature?: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
  completedAt?: Date;
  metadata?: Record<string, any>;
}

/**
 * Payment request model
 */
export interface PaymentRequest {
  id: string;
  merchantId: string;
  merchantName: string;
  amount: number;
  currency: string;
  reference: string;
  status: PaymentStatus;
  expiresAt?: Date;
  stablecoins: StablecoinInfo[];
  tokenMint?: string;
  metadata?: Record<string, any>;
}

/**
 * Payment verification result
 */
export interface PaymentVerificationResult {
  status: PaymentStatus;
  signature?: string;
  message: string;
}

/**
 * Stablecoin information
 */
export interface StablecoinInfo {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  rate: number;
}

/**
 * Payment database repository
 */
export class PaymentRepository {
  private pool: Pool;
  private initialized: boolean = false;
  
  constructor() {
    this.pool = new Pool({
      connectionString: config.database.uri,
      ssl: config.database.ssl ? { rejectUnauthorized: false } : false,
    });
    
    this.initialize();
  }
  
  /**
   * Initialize the database
   */
  private async initialize() {
    try {
      await this.pool.query(`
        CREATE TABLE IF NOT EXISTS payments (
          id VARCHAR(255) PRIMARY KEY,
          merchant_id VARCHAR(255) NOT NULL,
          amount DECIMAL(20, 8) NOT NULL,
          currency VARCHAR(10) NOT NULL,
          reference VARCHAR(255) NOT NULL,
          status VARCHAR(20) NOT NULL,
          transaction_signature VARCHAR(255),
          created_at TIMESTAMP NOT NULL,
          updated_at TIMESTAMP NOT NULL,
          expires_at TIMESTAMP,
          completed_at TIMESTAMP,
          metadata JSONB
        )
      `);
      
      // Create index on merchant_id
      await this.pool.query(`
        CREATE INDEX IF NOT EXISTS idx_payments_merchant_id 
        ON payments(merchant_id)
      `);
      
      // Create index on reference
      await this.pool.query(`
        CREATE INDEX IF NOT EXISTS idx_payments_reference
        ON payments(reference)
      `);
      
      // Create index on status
      await this.pool.query(`
        CREATE INDEX IF NOT EXISTS idx_payments_status
        ON payments(status)
      `);
      
      this.initialized = true;
      logger.info('Payment database initialized successfully');
    } catch (error: any) {
      logger.error(`Failed to initialize payment database: ${error.message}`);
      logger.error('Using in-memory storage as fallback');
    }
  }
  
  /**
   * Save a payment
   */
  async save(payment: Payment): Promise<void> {
    try {
      if (!this.initialized) {
        // Fallback to in-memory storage
        return await paymentStore.save(payment);
      }
      
      const query = `
        INSERT INTO payments (
          id, merchant_id, amount, currency, reference, status, 
          transaction_signature, created_at, updated_at, expires_at, 
          completed_at, metadata
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        ON CONFLICT (id) DO UPDATE SET
          amount = $3,
          currency = $4,
          reference = $5,
          status = $6,
          transaction_signature = $7,
          updated_at = $9,
          expires_at = $10,
          completed_at = $11,
          metadata = $12
      `;
      
      await this.pool.query(query, [
        payment.id,
        payment.merchantId,
        payment.amount,
        payment.currency,
        payment.reference,
        payment.status,
        payment.transactionSignature,
        payment.createdAt,
        payment.updatedAt,
        payment.expiresAt,
        payment.completedAt,
        payment.metadata ? JSON.stringify(payment.metadata) : null
      ]);
    } catch (error: any) {
      logger.error(`Failed to save payment: ${error.message}`);
      
      // Fallback to in-memory storage
      await paymentStore.save(payment);
    }
  }
  
  /**
   * Find payment by ID
   */
  async findById(id: string): Promise<Payment | null> {
    try {
      if (!this.initialized) {
        // Fallback to in-memory storage
        return await paymentStore.findById(id);
      }
      
      const result: QueryResult = await this.pool.query(`
        SELECT * FROM payments WHERE id = $1
      `, [id]);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return this.mapDbRowToPayment(result.rows[0]);
    } catch (error: any) {
      logger.error(`Failed to find payment by ID: ${error.message}`);
      
      // Fallback to in-memory storage
      return await paymentStore.findById(id);
    }
  }
  
  /**
   * Find payment by reference
   */
  async findByReference(reference: string): Promise<Payment | null> {
    try {
      if (!this.initialized) {
        // Fallback to in-memory storage
        return await paymentStore.findByReference(reference);
      }
      
      const result: QueryResult = await this.pool.query(`
        SELECT * FROM payments WHERE reference = $1
      `, [reference]);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return this.mapDbRowToPayment(result.rows[0]);
    } catch (error: any) {
      logger.error(`Failed to find payment by reference: ${error.message}`);
      
      // Fallback to in-memory storage
      return await paymentStore.findByReference(reference);
    }
  }
  
  /**
   * Find payments by merchant ID
   */
  async findByMerchantId(merchantId: string, limit = 100, offset = 0): Promise<Payment[]> {
    try {
      if (!this.initialized) {
        // Fallback to in-memory storage
        return await paymentStore.findByMerchantId(merchantId);
      }
      
      const result: QueryResult = await this.pool.query(`
        SELECT * FROM payments 
        WHERE merchant_id = $1
        ORDER BY created_at DESC
        LIMIT $2 OFFSET $3
      `, [merchantId, limit, offset]);
      
      return result.rows.map(row => this.mapDbRowToPayment(row));
    } catch (error: any) {
      logger.error(`Failed to find payments by merchant ID: ${error.message}`);
      
      // Fallback to in-memory storage
      return await paymentStore.findByMerchantId(merchantId);
    }
  }
  
  /**
   * Update payment
   */
  async update(id: string, updates: Partial<Payment>): Promise<void> {
    try {
      if (!this.initialized) {
        // Fallback to in-memory storage
        return await paymentStore.update(id, updates);
      }
      
      // Construct update query dynamically based on provided fields
      const setClauses: string[] = [];
      const queryParams: any[] = [];
      let paramCounter = 1;
      
      for (const [key, value] of Object.entries(updates)) {
        // Convert camelCase to snake_case for DB column names
        const columnName = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        setClauses.push(`${columnName} = $${paramCounter}`);
        queryParams.push(value);
        paramCounter++;
      }
      
      if (updates.updatedAt === undefined) {
        setClauses.push(`updated_at = $${paramCounter}`);
        queryParams.push(new Date());
        paramCounter++;
      }
      
      // Add ID as the last parameter
      queryParams.push(id);
      
      const query = `
        UPDATE payments 
        SET ${setClauses.join(', ')}
        WHERE id = $${paramCounter}
      `;
      
      await this.pool.query(query, queryParams);
    } catch (error: any) {
      logger.error(`Failed to update payment: ${error.message}`);
      
      // Fallback to in-memory storage
      await paymentStore.update(id, updates);
    }
  }
  
  /**
   * Map database row to Payment object
   */
  private mapDbRowToPayment(row: any): Payment {
    return {
      id: row.id,
      merchantId: row.merchant_id,
      amount: parseFloat(row.amount),
      currency: row.currency,
      reference: row.reference,
      status: row.status as PaymentStatus,
      transactionSignature: row.transaction_signature,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
      expiresAt: row.expires_at ? new Date(row.expires_at) : undefined,
      completedAt: row.completed_at ? new Date(row.completed_at) : undefined,
      metadata: row.metadata ? JSON.parse(row.metadata) : undefined,
    };
  }
  
  /**
   * Clean up expired payments
   */
  async cleanupExpired(): Promise<number> {
    try {
      if (!this.initialized) {
        // Fallback to in-memory storage
        return await paymentStore.cleanupExpired();
      }
      
      const result = await this.pool.query(`
        UPDATE payments
        SET status = $1, updated_at = $2
        WHERE status = $3
        AND expires_at IS NOT NULL
        AND expires_at < $2
        RETURNING id
      `, [PaymentStatus.EXPIRED, new Date(), PaymentStatus.PENDING]);
      
      return result.rowCount;
    } catch (error: any) {
      logger.error(`Failed to cleanup expired payments: ${error.message}`);
      
      // Fallback to in-memory storage
      return await paymentStore.cleanupExpired();
    }
  }
}

/**
 * In-memory payment store (fallback)
 */
class PaymentStore {
  private payments: Map<string, Payment> = new Map();
  private referenceIndex: Map<string, string> = new Map();
  private merchantIndex: Map<string, Set<string>> = new Map();
  
  /**
   * Save a payment
   */
  async save(payment: Payment): Promise<void> {
    this.payments.set(payment.id, {...payment});
    this.referenceIndex.set(payment.reference, payment.id);
    
    // Update merchant index
    if (!this.merchantIndex.has(payment.merchantId)) {
      this.merchantIndex.set(payment.merchantId, new Set());
    }
    this.merchantIndex.get(payment.merchantId)?.add(payment.id);
  }
  
  /**
   * Find payment by ID
   */
  async findById(id: string): Promise<Payment | null> {
    const payment = this.payments.get(id);
    return payment ? {...payment} : null;
  }
  
  /**
   * Find payment by reference
   */
  async findByReference(reference: string): Promise<Payment | null> {
    const id = this.referenceIndex.get(reference);
    if (!id) return null;
    return this.findById(id);
  }
  
  /**
   * Find payments by merchant ID
   */
  async findByMerchantId(merchantId: string): Promise<Payment[]> {
    const paymentIds = this.merchantIndex.get(merchantId);
    if (!paymentIds) return [];
    
    const payments: Payment[] = [];
    for (const id of paymentIds) {
      const payment = await this.findById(id);
      if (payment) payments.push(payment);
    }
    
    // Sort by created date, newest first
    return payments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  /**
   * Update payment
   */
  async update(id: string, updates: Partial<Payment>): Promise<void> {
    const payment = this.payments.get(id);
    if (!payment) return;
    
    // Apply updates
    Object.assign(payment, updates);
    
    // Ensure updatedAt is set
    if (!updates.updatedAt) {
      payment.updatedAt = new Date();
    }
    
    // Save updated payment
    this.payments.set(id, payment);
  }
  
  /**
   * Clean up expired payments
   */
  async cleanupExpired(): Promise<number> {
    let count = 0;
    const now = new Date();
    
    for (const [id, payment] of this.payments.entries()) {
      if (
        payment.status === PaymentStatus.PENDING &&
        payment.expiresAt && 
        payment.expiresAt < now
      ) {
        await this.update(id, {
          status: PaymentStatus.EXPIRED,
          updatedAt: now
        });
        count++;
      }
    }
    
    return count;
  }
}

export const paymentStore = new PaymentStore();
export const paymentRepository = new PaymentRepository(); 