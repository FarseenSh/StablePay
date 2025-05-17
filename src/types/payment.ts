export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

export interface StablecoinInfo {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  rate: number;
  tokenMintAddress?: string;
}

export interface PaymentRequest {
  id: string;
  amount: number;
  currency: string;
  reference: string;
  status: PaymentStatus;
  merchantId: string;
  merchantName: string;
  stablecoins: StablecoinInfo[];
  expiresAt: string;
  tokenMint?: string;
  metadata?: Record<string, any>;
}

export interface PaymentVerificationResult {
  status: PaymentStatus;
  signature?: string;
  message: string;
} 