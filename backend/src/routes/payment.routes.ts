import { Router } from 'express';
import { paymentController } from '../controllers/payment.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Create payment request
router.post(
  '/',
  authMiddleware.authenticateMerchant,
  paymentController.createPayment
);

// Get payment details
router.get(
  '/:id',
  authMiddleware.authenticateMerchant,
  paymentController.getPayment
);

// Verify payment
router.post(
  '/:id/verify',
  authMiddleware.authenticateMerchant,
  paymentController.verifyPayment
);

// List merchant payments
router.get(
  '/list',
  authMiddleware.authenticateMerchant,
  paymentController.listPayments
);

export default router; 