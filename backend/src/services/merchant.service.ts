import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { Merchant, MerchantStatus, merchantRepository } from '../models/merchant';
import logger from '../utils/logger';

export class MerchantService {
  /**
   * Create a new merchant
   */
  async createMerchant(
    name: string,
    email: string,
    walletAddress: string,
    preferredSettlementCurrency: string = 'USDC',
    webhookUrl?: string,
    metadata?: Record<string, any>
  ): Promise<Merchant> {
    try {
      // Input validation
      if (!name) {
        throw new Error('Merchant name is required');
      }
      
      if (!email) {
        throw new Error('Email is required');
      }
      
      if (!walletAddress) {
        throw new Error('Wallet address is required');
      }
      
      // Check if merchant with email already exists
      const existingMerchant = await merchantRepository.findByEmail(email);
      if (existingMerchant) {
        throw new Error(`Merchant with email ${email} already exists`);
      }
      
      // Generate unique ID and API key
      const id = uuidv4();
      const apiKey = this.generateApiKey();
      
      const now = new Date();
      
      // Create merchant record
      const merchant: Merchant = {
        id,
        name,
        email,
        status: MerchantStatus.ACTIVE,
        walletAddress,
        preferredSettlementCurrency,
        createdAt: now,
        updatedAt: now,
        apiKey,
        webhookUrl,
        metadata,
      };
      
      // Save merchant to repository
      await merchantRepository.save(merchant);
      
      logger.info(`Merchant created: ${id} - ${name}`);
      return merchant;
    } catch (error: any) {
      logger.error(`Failed to create merchant: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Get merchant by ID
   */
  async getMerchantById(id: string): Promise<Merchant | null> {
    try {
      if (!id) {
        throw new Error('Merchant ID is required');
      }
      
      return await merchantRepository.findById(id);
    } catch (error: any) {
      logger.error(`Failed to get merchant by ID: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Get merchant by API key
   */
  async getMerchantByApiKey(apiKey: string): Promise<Merchant | null> {
    try {
      if (!apiKey) {
        throw new Error('API key is required');
      }
      
      return await merchantRepository.findByApiKey(apiKey);
    } catch (error: any) {
      logger.error(`Failed to get merchant by API key: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Update merchant
   */
  async updateMerchant(id: string, updates: Partial<Merchant>): Promise<Merchant | null> {
    try {
      if (!id) {
        throw new Error('Merchant ID is required');
      }
      
      // Sanitize updates (don't allow updates to id or createdAt)
      const sanitizedUpdates = {...updates};
      delete sanitizedUpdates.id;
      delete sanitizedUpdates.createdAt;
      
      // Ensure updatedAt is set
      sanitizedUpdates.updatedAt = new Date();
      
      return await merchantRepository.update(id, sanitizedUpdates);
    } catch (error: any) {
      logger.error(`Failed to update merchant: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Delete merchant
   */
  async deleteMerchant(id: string): Promise<boolean> {
    try {
      if (!id) {
        throw new Error('Merchant ID is required');
      }
      
      return await merchantRepository.delete(id);
    } catch (error: any) {
      logger.error(`Failed to delete merchant: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * List merchants
   */
  async listMerchants(limit = 100, offset = 0): Promise<Merchant[]> {
    try {
      return await merchantRepository.list(limit, offset);
    } catch (error: any) {
      logger.error(`Failed to list merchants: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Generate a secure API key
   */
  private generateApiKey(): string {
    return 'pk_' + crypto.randomBytes(24).toString('hex');
  }
}

export const merchantService = new MerchantService(); 