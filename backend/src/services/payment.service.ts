import { v4 as uuidv4 } from 'uuid';
import { PublicKey } from '@solana/web3.js';
import { Payment, PaymentRequest, PaymentStatus, PaymentVerificationResult, paymentRepository } from '../models/payment';
import { merchantService } from './merchant.service';
import { perenaService } from './perena.service';
import { solanaService } from './solana.service';
import config from '../config';
import logger from '../utils/logger';

export class PaymentService {
  /**
   * Create a payment request
   */
  async createPaymentRequest(
    merchantId: string,
    amount: number,
    currency: string,
    metadata: Record<string, any> = {}
  ): Promise<PaymentRequest> {
    try {
      // Input validation
      if (!merchantId) {
        throw new Error('Merchant ID is required');
      }
      
      if (!amount || amount <= 0) {
        throw new Error('Amount must be greater than zero');
      }
      
      if (!currency) {
        throw new Error('Currency is required');
      }
      
      // Get merchant details
      const merchant = await merchantService.getMerchantById(merchantId);
      if (!merchant) {
        throw new Error('Merchant not found');
      }
      
      // Security check for merchant status
      if (merchant.status !== 'ACTIVE') {
        throw new Error('Merchant account is inactive');
      }

      // Generate unique reference for this payment
      // In Solana, we'll use this as a reference address to track the payment
      const reference = new PublicKey(Buffer.from(uuidv4().replace(/-/g, ''), 'hex')).toString();
      const id = uuidv4();
      
      // Sanitize metadata to prevent injection
      const sanitizedMetadata = this.sanitizeMetadata(metadata);

      const now = new Date();
      const expiresAt = new Date(now.getTime() + 15 * 60 * 1000); // 15 minute expiry
      
      // Create payment record
      const payment: Payment = {
        id,
        merchantId,
        amount,
        currency,
        reference,
        status: PaymentStatus.PENDING,
        createdAt: now,
        updatedAt: now,
        expiresAt,
        metadata: sanitizedMetadata,
      };
      
      // Save payment to store
      await paymentRepository.save(payment);
      
      // Get supported stablecoins from Perena service
      const stablecoins = await perenaService.getSupportedStablecoins();
      
      // Get Solana token mint for this currency
      let tokenMint = '';
      if (config.tokenMints && config.tokenMints[currency.toLowerCase()]) {
        tokenMint = config.tokenMints[currency.toLowerCase()];
      }
      
      // Generate payment request data
      const paymentRequest: PaymentRequest = {
        id: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        reference: payment.reference,
        status: payment.status,
        expiresAt: payment.expiresAt,
        merchantId: payment.merchantId,
        merchantName: merchant.name,
        stablecoins,
        metadata: payment.metadata,
        tokenMint,
      };
      
      logger.info(`Created payment request: ${payment.id}`);
      return paymentRequest;
    } catch (error: any) {
      logger.error(`Failed to create payment request: ${error.message}`);
      throw new Error(`Failed to create payment request: ${error.message}`);
    }
  }
  
  /**
   * Sanitize metadata to prevent injection
   */
  private sanitizeMetadata(metadata: Record<string, any>): Record<string, any> {
    // Basic sanitization
    const sanitized: Record<string, any> = {};
    
    for (const [key, value] of Object.entries(metadata)) {
      // Only allow simple types
      if (typeof value === 'string' || 
          typeof value === 'number' || 
          typeof value === 'boolean') {
        sanitized[key] = value;
      }
    }
    
    return sanitized;
  }
  
  /**
   * Verify payment status
   */
  async verifyPayment(paymentId: string): Promise<PaymentVerificationResult> {
    try {
      // Input validation
      if (!paymentId) {
        throw new Error('Payment ID is required');
      }
      
      // Get payment record
      const payment = await paymentRepository.findById(paymentId);
      if (!payment) {
        throw new Error('Payment not found');
      }
      
      // Check for payment expiration
      if (payment.expiresAt && payment.expiresAt < new Date()) {
        await paymentRepository.update(paymentId, { 
          status: PaymentStatus.EXPIRED,
          updatedAt: new Date()
        });
        return { 
          status: PaymentStatus.EXPIRED, 
          message: 'Payment has expired' 
        };
      }
      
      // Check if payment is already verified
      if (payment.status === PaymentStatus.COMPLETED) {
        return { 
          status: PaymentStatus.COMPLETED, 
          signature: payment.transactionSignature,
          message: 'Payment already verified' 
        };
      }

      // Verify payment on-chain using the Solana service
      try {
        // Verify payment by reference address
        const isVerified = await solanaService.verifyPaymentByReference(payment.reference);
        
        if (isVerified) {
          // Get the signature for this reference
          const referencePubkey = new PublicKey(payment.reference);
          const signatureInfo = await solanaService.getSignaturesForAddress(referencePubkey);
          const signature = signatureInfo[0]?.signature;
          
          // Update payment record
          await paymentRepository.update(paymentId, {
            status: PaymentStatus.COMPLETED,
            transactionSignature: signature,
            updatedAt: new Date()
          });
          
          // Return successful verification
          return {
            status: PaymentStatus.COMPLETED,
            signature,
            message: 'Payment verified successfully'
          };
        }
      } catch (error: any) {
        logger.error(`Error verifying payment on chain: ${error.message}`);
        // We'll continue with the function to return a PENDING status
      }
      
      // If not yet verified, return pending status
      return {
        status: PaymentStatus.PENDING,
        message: 'Payment not yet verified on blockchain'
      };
    } catch (error: any) {
      logger.error(`Failed to verify payment: ${error.message}`);
      throw new Error(`Failed to verify payment: ${error.message}`);
    }
  }
  
  /**
   * Get payment by ID
   */
  async getPaymentById(paymentId: string): Promise<Payment | null> {
    return await paymentRepository.findById(paymentId);
  }
  
  /**
   * Get payments by merchant ID
   */
  async getPaymentsByMerchantId(merchantId: string, limit = 100, offset = 0): Promise<Payment[]> {
    return await paymentRepository.findByMerchantId(merchantId, limit, offset);
  }
  
  /**
   * Cleanup expired payments
   */
  async cleanupExpiredPayments(): Promise<number> {
    try {
      return await paymentRepository.cleanupExpired();
    } catch (error: any) {
      logger.error(`Failed to cleanup expired payments: ${error.message}`);
      return 0;
    }
  }
}

export const paymentService = new PaymentService(); 