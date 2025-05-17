import config from '../config';

// Types for the Perena service
export interface StablecoinInfo {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  rate: number;
}

export enum YieldStrategy {
  PERENA_SEED_POOL = 'PERENA_SEED_POOL',
  PERENA_GROWTH_POOL = 'PERENA_GROWTH_POOL',
  PERENA_STABLE_POOL = 'PERENA_STABLE_POOL',
}

export interface SwapRoute {
  steps: Array<{
    from: string;
    to: string;
    pool: string;
  }>;
  estimatedSlippage: number;
}

/**
 * Service for integrating with Perena's stablecoin infrastructure
 * Currently implements a mock version for testing
 */
export class PerenaService {
  private apiUrl: string;
  private apiKey: string;
  
  constructor() {
    this.apiUrl = config.perena.apiUrl;
    this.apiKey = config.perena.apiKey;
  }
  
  /**
   * Get supported stablecoins from Perena
   * Currently returns mock data
   */
  async getSupportedStablecoins(): Promise<StablecoinInfo[]> {
    // In a real implementation, this would call Perena's API
    // For now, return the mock data from config
    return config.fallbackStablecoins;
  }
  
  /**
   * Get the optimal route for swapping stablecoins
   * Currently returns mock data
   */
  async getOptimalRoute(
    sourceToken: string,
    destinationToken: string,
    amount: number
  ): Promise<SwapRoute> {
    // Input validation
    if (!sourceToken || !destinationToken) {
      throw new Error('Invalid token addresses');
    }
    if (!amount || amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }
    
    // Mock implementation - would call Perena in real scenario
    return {
      steps: [
        { 
          from: sourceToken, 
          to: destinationToken, 
          pool: 'mock-perena-pool'
        }
      ],
      estimatedSlippage: 0.001 // 0.1%
    };
  }
  
  /**
   * Execute a swap through Perena (mock implementation)
   */
  async executeSwap(
    route: SwapRoute,
    amount: number,
    slippageTolerance: number = 0.5
  ): Promise<string> {
    // Validate inputs
    if (!route || !route.steps || route.steps.length === 0) {
      throw new Error('Invalid route provided');
    }
    if (amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }
    if (slippageTolerance < 0 || slippageTolerance > 100) {
      throw new Error('Slippage tolerance must be between 0 and 100');
    }
    
    // Mock implementation - would call Perena in real scenario
    // Return a mock transaction signature
    return 'mock-transaction-' + Math.random().toString(36).substring(2, 15);
  }
  
  /**
   * Deposit funds into Perena liquidity pools for yield (mock implementation)
   */
  async depositToYieldStrategy(
    token: string,
    amount: number,
    strategy: YieldStrategy
  ): Promise<string> {
    // Validate inputs
    if (!token) {
      throw new Error('Token address is required');
    }
    if (!amount || amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }
    if (!Object.values(YieldStrategy).includes(strategy)) {
      throw new Error('Invalid yield strategy');
    }
    
    // Mock implementation - would call Perena in real scenario
    // Return a mock transaction signature
    return 'mock-deposit-tx-' + Math.random().toString(36).substring(2, 15);
  }
  
  /**
   * Get current yield rates for different strategies (mock implementation)
   */
  async getYieldRates(): Promise<Record<YieldStrategy, number>> {
    // Mock implementation - would call Perena in real scenario
    return {
      [YieldStrategy.PERENA_SEED_POOL]: 0.03, // 3%
      [YieldStrategy.PERENA_GROWTH_POOL]: 0.05, // 5%
      [YieldStrategy.PERENA_STABLE_POOL]: 0.02, // 2%
    };
  }
}

// Create and export a singleton instance
export const perenaService = new PerenaService(); 