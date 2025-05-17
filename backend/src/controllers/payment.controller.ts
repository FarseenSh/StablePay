import { Request, Response } from 'express';
import { paymentService } from '../services/payment.service';
import logger from '../utils/logger';

class PaymentController {
  /**
   * Create a new payment request
   */
  async createPayment(req: Request, res: Response) {
    try {
      const { amount, currency, metadata } = req.body;
      const merchantId = req.merchant?.id;
      
      if (!merchantId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      // Validate inputs
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        return res.status(400).json({ error: 'Invalid amount' });
      }
      
      if (!currency) {
        return res.status(400).json({ error: 'Currency is required' });
      }
      
      const paymentRequest = await paymentService.createPaymentRequest(
        merchantId,
        Number(amount),
        currency,
        metadata || {}
      );
      
      return res.status(201).json(paymentRequest);
    } catch (error) {
      logger.error(`Error in createPayment controller: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      return res.status(500).json({ 
        error: 'Failed to create payment request',
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  }
  
  /**
   * Get payment details
   */
  async getPayment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const merchantId = req.merchant?.id;
      
      if (!merchantId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      if (!id) {
        return res.status(400).json({ error: 'Payment ID is required' });
      }
      
      const payment = await paymentService.getPaymentDetails(id);
      
      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }
      
      // Verify the payment belongs to the merchant
      if (payment.merchantId !== merchantId) {
        return res.status(403).json({ error: 'Access denied' });
      }
      
      return res.status(200).json(payment);
    } catch (error) {
      logger.error(`Error in getPayment controller: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      return res.status(500).json({ 
        error: 'Failed to get payment details',
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  }
  
  /**
   * Verify payment status
   */
  async verifyPayment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const merchantId = req.merchant?.id;
      
      if (!merchantId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      if (!id) {
        return res.status(400).json({ error: 'Payment ID is required' });
      }
      
      // Get payment first to verify merchant ownership
      const payment = await paymentService.getPaymentDetails(id);
      
      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }
      
      // Verify the payment belongs to the merchant
      if (payment.merchantId !== merchantId) {
        return res.status(403).json({ error: 'Access denied' });
      }
      
      const verificationResult = await paymentService.verifyPayment(id);
      
      return res.status(200).json(verificationResult);
    } catch (error) {
      logger.error(`Error in verifyPayment controller: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      return res.status(500).json({ 
        error: 'Failed to verify payment',
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  }
  
  /**
   * List merchant payments
   */
  async listPayments(req: Request, res: Response) {
    try {
      const merchantId = req.merchant?.id;
      
      if (!merchantId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 100;
      const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : 0;
      
      if (isNaN(limit) || limit < 1 || limit > 100) {
        return res.status(400).json({ error: 'Invalid limit parameter' });
      }
      
      if (isNaN(offset) || offset < 0) {
        return res.status(400).json({ error: 'Invalid offset parameter' });
      }
      
      const payments = await paymentService.listMerchantPayments(merchantId, limit, offset);
      
      return res.status(200).json({
        data: payments,
        limit,
        offset,
        count: payments.length
      });
    } catch (error) {
      logger.error(`Error in listPayments controller: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      return res.status(500).json({ 
        error: 'Failed to list payments',
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  }
}

// Create and export a singleton instance
export const paymentController = new PaymentController(); 