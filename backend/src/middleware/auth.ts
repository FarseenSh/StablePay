import { Request, Response, NextFunction } from 'express';
import { merchantService } from '../services/merchant.service';
import logger from '../utils/logger';

// Extend Request type to include merchant property
declare global {
  namespace Express {
    interface Request {
      merchant?: {
        id: string;
        name: string;
        email: string;
      };
    }
  }
}

class AuthMiddleware {
  /**
   * Authenticate merchant using API key
   */
  async authenticateMerchant(req: Request, res: Response, next: NextFunction) {
    try {
      const apiKey = req.headers['x-api-key'] as string;
      
      if (!apiKey) {
        return res.status(401).json({ error: 'API key is required' });
      }
      
      const merchant = await merchantService.getMerchantByApiKey(apiKey);
      
      if (!merchant) {
        return res.status(401).json({ error: 'Invalid API key' });
      }
      
      if (merchant.status !== 'ACTIVE') {
        return res.status(403).json({ error: 'Merchant account is not active' });
      }
      
      // Attach merchant info to request
      req.merchant = {
        id: merchant.id,
        name: merchant.name,
        email: merchant.email,
      };
      
      next();
    } catch (error) {
      logger.error(`Authentication error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return res.status(500).json({ error: 'Authentication failed' });
    }
  }
  
  /**
   * Handle CORS preflight requests
   */
  handleCors(req: Request, res: Response, next: NextFunction) {
    // Set CORS headers
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-API-Key');
    
    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
      return res.status(204).end();
    }
    
    next();
  }
  
  /**
   * Simple rate limiting middleware
   */
  rateLimit(req: Request, res: Response, next: NextFunction) {
    // Implementation would go here - for now just pass through
    next();
  }
}

// Create and export a singleton instance
export const authMiddleware = new AuthMiddleware(); 