import { PaymentStatus, StablecoinInfo, PaymentRequest as PaymentRequestType, PaymentVerificationResult } from '@/types/payment';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface CreatePaymentRequest {
  merchantId: string;
  amount: number;
  currency: string;
  metadata?: Record<string, any>;
}

// Use the imported type
type PaymentRequest = PaymentRequestType;

export async function createPaymentRequest(data: CreatePaymentRequest): Promise<PaymentRequest> {
  const response = await fetch(`${API_URL}/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create payment request');
  }

  return response.json();
}

export async function getPaymentStatus(paymentId: string): Promise<PaymentVerificationResult> {
  const response = await fetch(`${API_URL}/payments/${paymentId}/status`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get payment status');
  }

  return response.json();
}

// Poll payment status until complete or until timeout
export async function pollPaymentStatus(
  paymentId: string, 
  onStatusChange: (status: PaymentVerificationResult) => void,
  timeoutMs = 300000, // 5 minutes default timeout
  intervalMs = 3000  // 3 second polling interval
): Promise<PaymentVerificationResult | null> {
  const startTime = Date.now();
  let lastStatus: PaymentStatus | null = null;
  
  while (Date.now() - startTime < timeoutMs) {
    try {
      const status = await getPaymentStatus(paymentId);
      
      // Call callback if status has changed
      if (status.status !== lastStatus) {
        onStatusChange(status);
        lastStatus = status.status;
      }
      
      // If payment is complete or failed, stop polling
      if (
        status.status === PaymentStatus.COMPLETED || 
        status.status === PaymentStatus.FAILED || 
        status.status === PaymentStatus.EXPIRED
      ) {
        return status;
      }
      
      // Wait before polling again
      await new Promise(resolve => setTimeout(resolve, intervalMs));
    } catch (error) {
      console.error('Error polling payment status:', error);
      // Continue polling even if there's an error
    }
  }
  
  // Return null if timeout reached
  return null;
} 