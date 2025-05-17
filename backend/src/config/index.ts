import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface TokenMints {
  [key: string]: string;
}

interface StablecoinInfo {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  rate: number;
}

const config = {
  server: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'default-secret-key',
    jwtExpiration: process.env.JWT_EXPIRATION || '24h',
  },
  solana: {
    rpcUrl: process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com',
    privateKey: process.env.SOLANA_PRIVATE_KEY,
    programId: process.env.SOLANA_PROGRAM_ID || 'Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS',
  },
  perena: {
    apiUrl: process.env.PERENA_API_URL || 'https://api.perena.io',
    apiKey: process.env.PERENA_API_KEY,
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
  cors: {
    allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:8086')
      .split(',')
      .map(origin => origin.trim()),
  },
  security: {
    rateLimitWindow: process.env.RATE_LIMIT_WINDOW || '15m',
    rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },
  // Default stablecoins for testing when Perena connection isn't available
  fallbackStablecoins: [
    { id: 'usdc', name: 'USD Coin', symbol: 'USDC', icon: '💲', rate: 1 },
    { id: 'usdt', name: 'Tether', symbol: 'USDT', icon: '💵', rate: 0.9998 },
    { id: 'pyusd', name: 'PayPal USD', symbol: 'PYUSD', icon: '🔵', rate: 0.9997 },
    { id: 'usd*', name: 'USD*', symbol: 'USD*', icon: '⭐', rate: 1.0003 },
  ] as StablecoinInfo[],
  // Supported token mints on Solana
  tokenMints: {
    'usdc': process.env.USDC_MINT || 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // Mainnet USDC mint
    'usdt': process.env.USDT_MINT || 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', // Mainnet USDT mint
  } as TokenMints,
  database: {
    uri: process.env.DATABASE_URI || 'postgresql://postgres:postgres@localhost:5432/perenapay',
    ssl: process.env.DATABASE_SSL === 'true',
  }
};

export default config; 