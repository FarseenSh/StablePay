import { Pool, QueryResult } from 'pg';
import { format as sqlFormat } from 'pg-format';
import config from '../config';
import logger from '../utils/logger';

export enum MerchantStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED',
}

export interface Merchant {
  id: string;
  name: string;
  email: string;
  status: MerchantStatus;
  walletAddress: string;
  preferredSettlementCurrency: string;
  createdAt: Date;
  updatedAt: Date;
  apiKey?: string;
  webhookUrl?: string;
  metadata?: Record<string, any>;
}

/**
 * Merchant database repository
 */
export class MerchantRepository {
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
        CREATE TABLE IF NOT EXISTS merchants (
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          status VARCHAR(20) NOT NULL,
          wallet_address VARCHAR(255) NOT NULL,
          preferred_settlement_currency VARCHAR(20) NOT NULL,
          created_at TIMESTAMP NOT NULL,
          updated_at TIMESTAMP NOT NULL,
          api_key VARCHAR(255),
          webhook_url TEXT,
          metadata JSONB
        )
      `);
      
      // Create index on email
      await this.pool.query(`
        CREATE UNIQUE INDEX IF NOT EXISTS idx_merchants_email 
        ON merchants(email)
      `);
      
      // Create index on api_key
      await this.pool.query(`
        CREATE INDEX IF NOT EXISTS idx_merchants_api_key
        ON merchants(api_key)
      `);
      
      this.initialized = true;
      logger.info('Merchant database initialized successfully');
    } catch (error: any) {
      logger.error(`Failed to initialize merchant database: ${error.message}`);
      logger.error('Using in-memory storage as fallback');
    }
  }
  
  /**
   * Save a merchant
   */
  async save(merchant: Merchant): Promise<void> {
    try {
      if (!this.initialized) {
        // Fallback to in-memory storage
        await merchantStore.create(merchant);
        return;
      }
      
      const query = `
        INSERT INTO merchants (
          id, name, email, status, wallet_address, preferred_settlement_currency, 
          created_at, updated_at, api_key, webhook_url, metadata
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (id) DO UPDATE SET
          name = $2,
          email = $3,
          status = $4,
          wallet_address = $5,
          preferred_settlement_currency = $6,
          updated_at = $8,
          api_key = $9,
          webhook_url = $10,
          metadata = $11
      `;
      
      await this.pool.query(query, [
        merchant.id,
        merchant.name,
        merchant.email,
        merchant.status,
        merchant.walletAddress,
        merchant.preferredSettlementCurrency,
        merchant.createdAt,
        merchant.updatedAt,
        merchant.apiKey,
        merchant.webhookUrl,
        merchant.metadata ? JSON.stringify(merchant.metadata) : null
      ]);
    } catch (error: any) {
      logger.error(`Failed to save merchant: ${error.message}`);
      
      // Fallback to in-memory storage
      try {
        await merchantStore.create(merchant);
      } catch (storeError: any) {
        // If merchant already exists in store, try to update it
        await merchantStore.update(merchant.id, merchant);
      }
    }
  }
  
  /**
   * Find merchant by ID
   */
  async findById(id: string): Promise<Merchant | null> {
    try {
      if (!this.initialized) {
        // Fallback to in-memory storage
        return await merchantStore.findById(id);
      }
      
      const result: QueryResult = await this.pool.query(`
        SELECT * FROM merchants WHERE id = $1
      `, [id]);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return this.mapDbRowToMerchant(result.rows[0]);
    } catch (error: any) {
      logger.error(`Failed to find merchant by ID: ${error.message}`);
      
      // Fallback to in-memory storage
      return await merchantStore.findById(id);
    }
  }
  
  /**
   * Find merchant by email
   */
  async findByEmail(email: string): Promise<Merchant | null> {
    try {
      if (!this.initialized) {
        // Fallback to in-memory storage
        return await merchantStore.findByEmail(email);
      }
      
      const result: QueryResult = await this.pool.query(`
        SELECT * FROM merchants WHERE email = $1
      `, [email]);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return this.mapDbRowToMerchant(result.rows[0]);
    } catch (error: any) {
      logger.error(`Failed to find merchant by email: ${error.message}`);
      
      // Fallback to in-memory storage
      return await merchantStore.findByEmail(email);
    }
  }
  
  /**
   * Find merchant by API key
   */
  async findByApiKey(apiKey: string): Promise<Merchant | null> {
    try {
      if (!this.initialized) {
        // Fallback to in-memory storage
        return await merchantStore.findByApiKey(apiKey);
      }
      
      const result: QueryResult = await this.pool.query(`
        SELECT * FROM merchants WHERE api_key = $1
      `, [apiKey]);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return this.mapDbRowToMerchant(result.rows[0]);
    } catch (error: any) {
      logger.error(`Failed to find merchant by API key: ${error.message}`);
      
      // Fallback to in-memory storage
      return await merchantStore.findByApiKey(apiKey);
    }
  }
  
  /**
   * Update merchant
   */
  async update(id: string, updates: Partial<Merchant>): Promise<Merchant | null> {
    try {
      if (!this.initialized) {
        // Fallback to in-memory storage
        return await merchantStore.update(id, updates);
      }
      
      // Ensure we have the original merchant
      const originalMerchant = await this.findById(id);
      if (!originalMerchant) {
        return null;
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
        UPDATE merchants 
        SET ${setClauses.join(', ')}
        WHERE id = $${paramCounter}
        RETURNING *
      `;
      
      const result = await this.pool.query(query, queryParams);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return this.mapDbRowToMerchant(result.rows[0]);
    } catch (error: any) {
      logger.error(`Failed to update merchant: ${error.message}`);
      
      // Fallback to in-memory storage
      return await merchantStore.update(id, updates);
    }
  }
  
  /**
   * Delete merchant
   */
  async delete(id: string): Promise<boolean> {
    try {
      if (!this.initialized) {
        // Fallback to in-memory storage
        return await merchantStore.delete(id);
      }
      
      const result = await this.pool.query(`
        DELETE FROM merchants WHERE id = $1
      `, [id]);
      
      return result.rowCount > 0;
    } catch (error: any) {
      logger.error(`Failed to delete merchant: ${error.message}`);
      
      // Fallback to in-memory storage
      return await merchantStore.delete(id);
    }
  }
  
  /**
   * List merchants
   */
  async list(limit = 100, offset = 0): Promise<Merchant[]> {
    try {
      if (!this.initialized) {
        // Fallback to in-memory storage
        return await merchantStore.list(limit, offset);
      }
      
      const result: QueryResult = await this.pool.query(`
        SELECT * FROM merchants 
        ORDER BY created_at DESC
        LIMIT $1 OFFSET $2
      `, [limit, offset]);
      
      return result.rows.map(row => this.mapDbRowToMerchant(row));
    } catch (error: any) {
      logger.error(`Failed to list merchants: ${error.message}`);
      
      // Fallback to in-memory storage
      return await merchantStore.list(limit, offset);
    }
  }
  
  /**
   * Map database row to Merchant object
   */
  private mapDbRowToMerchant(row: any): Merchant {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      status: row.status as MerchantStatus,
      walletAddress: row.wallet_address,
      preferredSettlementCurrency: row.preferred_settlement_currency,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
      apiKey: row.api_key,
      webhookUrl: row.webhook_url,
      metadata: row.metadata ? JSON.parse(row.metadata) : undefined,
    };
  }
}

// In-memory storage for merchants (fallback)
class MerchantStore {
  private merchants: Map<string, Merchant> = new Map();

  async create(merchant: Merchant): Promise<Merchant> {
    if (this.merchants.has(merchant.id)) {
      throw new Error(`Merchant with ID ${merchant.id} already exists`);
    }
    this.merchants.set(merchant.id, merchant);
    return merchant;
  }

  async findById(id: string): Promise<Merchant | null> {
    return this.merchants.get(id) || null;
  }

  async findByEmail(email: string): Promise<Merchant | null> {
    for (const merchant of this.merchants.values()) {
      if (merchant.email === email) {
        return merchant;
      }
    }
    return null;
  }

  async findByApiKey(apiKey: string): Promise<Merchant | null> {
    for (const merchant of this.merchants.values()) {
      if (merchant.apiKey === apiKey) {
        return merchant;
      }
    }
    return null;
  }

  async update(id: string, updates: Partial<Merchant>): Promise<Merchant | null> {
    const merchant = this.merchants.get(id);
    if (!merchant) {
      return null;
    }
    
    const updatedMerchant = {
      ...merchant,
      ...updates,
      updatedAt: new Date(),
    };
    
    this.merchants.set(id, updatedMerchant);
    return updatedMerchant;
  }

  async delete(id: string): Promise<boolean> {
    return this.merchants.delete(id);
  }

  async list(limit = 100, offset = 0): Promise<Merchant[]> {
    return Array.from(this.merchants.values())
      .slice(offset, offset + limit);
  }
}

// Create and export singletons
export const merchantStore = new MerchantStore();
export const merchantRepository = new MerchantRepository(); 