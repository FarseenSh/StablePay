# PerenaPay2: Comprehensive Implementation Plan

## 1. Project Overview & Vision

PerenaPay is an enterprise-grade stablecoin payment processor built on Solana that leverages Perena's stablecoin infrastructure. The platform enables merchants to accept any stablecoin while receiving settlement in their preferred currency, with advanced features including yield generation, comprehensive analytics, and seamless integration options.

### Core Value Propositions:
- **Multi-stablecoin support** with preferred settlement currency
- **Direct integration with Perena's Numéraire** for optimal liquidity and routing
- **Yield generation** on idle merchant funds
- **Enterprise-grade merchant tools** and analytics
- **Multiple integration options** for seamless business adoption
- **Security-first architecture** with comprehensive protections

### Target Users:
- Web3-native businesses (NFT marketplaces, GameFi platforms, DeFi applications)
- Traditional businesses exploring crypto payments
- Individual merchants and creators
- Enterprise treasury departments seeking stablecoin integration

## 2. Technical Architecture

```
System Architecture
┌─────────────────────────────────────────────────────────────────────┐
│                       Frontend Applications                          │
│  ┌───────────────┐   ┌───────────────────┐   ┌───────────────────┐  │
│  │   Merchant    │   │     Checkout      │   │     Admin         │  │
│  │   Dashboard   │   │      Widget       │   │     Portal        │  │
│  └───────────────┘   └───────────────────┘   └───────────────────┘  │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
┌──────────────────────────────┼──────────────────────────────────────┐
│                      Integration Layer                               │
│  ┌───────────────┐   ┌───────────────────┐   ┌───────────────────┐  │
│  │     REST      │   │    JavaScript     │   │    E-commerce     │  │
│  │      API      │   │       SDK         │   │     Plugins       │  │
│  └───────────────┘   └───────────────────┘   └───────────────────┘  │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
┌──────────────────────────────┼──────────────────────────────────────┐
│                      Backend Services                                │
│  ┌───────────────┐   ┌───────────────────┐   ┌───────────────────┐  │
│  │    Payment    │   │     Merchant      │   │    Analytics      │  │
│  │    Service    │   │     Service       │   │     Service       │  │
│  └───────────────┘   └───────────────────┘   └───────────────────┘  │
│                                                                      │
│  ┌───────────────┐   ┌───────────────────┐   ┌───────────────────┐  │
│  │   Treasury    │   │     Webhook       │   │    Security       │  │
│  │   Service     │   │     Service       │   │     Service       │  │
│  └───────────────┘   └───────────────────┘   └───────────────────┘  │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
┌──────────────────────────────┼──────────────────────────────────────┐
│                     Perena Integration                               │
│  ┌───────────────┐   ┌───────────────────┐   ┌───────────────────┐  │
│  │   Numéraire   │   │  Smart Routing    │   │    Treasury       │  │
│  │  Connection   │   │    Algorithm      │   │   Integration     │  │
│  └───────────────┘   └───────────────────┘   └───────────────────┘  │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
┌──────────────────────────────┼──────────────────────────────────────┐
│                     Smart Contract Layer                             │
│  ┌───────────────┐   ┌───────────────────┐   ┌───────────────────┐  │
│  │   Payment     │   │     Treasury      │   │   Subscription    │  │
│  │   Processor   │   │     Manager       │   │     Manager       │  │
│  └───────────────┘   └───────────────────┘   └───────────────────┘  │
│                                                                      │
│  ┌───────────────┐   ┌───────────────────┐   ┌───────────────────┐  │
│  │  Access       │   │    Emergency      │   │    Upgrade        │  │
│  │  Control      │   │    Controls       │   │    Manager        │  │
│  └───────────────┘   └───────────────────┘   └───────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### Smart Contract Layer (On-chain):
- **PaymentProcessor Contract**: Handles payment processing, fee calculation, and settlement with security protections
- **TreasuryManager Contract**: Manages yield strategies and fund allocation through Perena with proper validation
- **SubscriptionManager Contract**: Manages recurring payments and subscription logic with secure authorization
- **AccessControl Contract**: Manages role-based permissions and authority across all contracts
- **EmergencyControls Contract**: Provides circuit breaker functionality to pause operations if vulnerabilities are discovered
- **UpgradeManager Contract**: Handles secure, transparent contract upgrades with timelocks

### Backend Services (Off-chain):
- **Payment Service**: Handles payment request generation, transaction verification, and webhooks
- **Merchant Service**: Manages accounts, settings, and configurations
- **Analytics Service**: Processes transaction data for reporting and insights
- **Treasury Service**: Monitors yield opportunities and manages fund allocation
- **Security Service**: Handles authentication, authorization, fraud prevention, and transaction monitoring
- **Webhook Service**: Delivers real-time event notifications securely

### Frontend Applications:
- **Merchant Dashboard**: React-based web application for payment management
- **Checkout Widget**: Customizable payment interface for customers
- **Admin Portal**: Internal tools for platform management with security controls

### Integration Layer:
- **REST API**: Comprehensive endpoints for external systems with rate limiting and security headers
- **JavaScript SDK**: Client library for web integration with robust error handling
- **Plugins**: Pre-built modules for e-commerce platforms
- **Webhook System**: Event notifications for real-time updates with authentication

## 3. Business Model & Pricing Structure

### Revenue Streams

1. **Transaction Fees**: 0.5-1% per transaction (vs. 2-3% traditional)
2. **Subscription Tiers**: Free, Pro ($49/mo), Enterprise (custom)
3. **Yield Share**: 10% of generated yield from treasury management
4. **Premium Services**: Custom integration, enhanced support, specialized features
5. **Security Services**: Advanced fraud prevention and risk management (Enterprise tier)

### Pricing Structure

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Transaction Fee | 1.0% | 0.7% | 0.5% or less |
| Monthly Cost | $0 | $49 | Custom |
| Payment Volume | Up to $10K/mo | Up to $100K/mo | Unlimited |
| Checkout Customization | Basic | Advanced | Full White-label |
| Treasury Management | Basic | Advanced | Custom |
| Security Features | Basic | Enhanced | Advanced |
| Support | Email | Priority Email | Dedicated Manager |
| API Rate Limits | 100/hr | 1,000/hr | Custom |
| Analytics | Basic | Advanced | Custom |
| Webhook Events | Limited | Full Access | Custom |
| Multi-user Access | No | Up to 3 users | Unlimited |
| Security Audit | No | Annual | Quarterly |

### Market Entry Strategy

1. **Target Early Adopters**: Focus on web3-native businesses first
   - NFT marketplaces
   - GameFi platforms
   - DeFi applications
   - Crypto-focused services

2. **Developer-First Approach**: Emphasize API accessibility and documentation
   - Comprehensive API documentation
   - Code samples and integration guides
   - Developer community support
   - Hackathons and developer events

3. **Strategic Partnerships**: Collaborate with key players in Solana ecosystem
   - Integration with popular wallets
   - Partnerships with Solana infrastructure providers
   - Collaboration with Perena on co-marketing
   - Integration with other Solana DeFi projects

4. **Content Marketing**: Educational content about stablecoin benefits for businesses
   - Case studies and success stories
   - Comparison guides vs. traditional payment processors
   - ROI calculators and financial models
   - Best practices for crypto payments
   - Security guides for merchant treasury operations

5. **Incentive Program**: Initial fee discounts for early adopters
   - First three months with reduced fees
   - Volume-based incentives
   - Referral program for existing merchants
   - Special rates for ecosystem partners

## 4. Perena Integration

### Numéraire AMM Integration

```typescript
class PerenaConnector {
  // Initialized state to prevent re-entrancy
  private locked: boolean = false;
  
  // Modifier pattern for re-entrancy protection
  private async withReentrancyGuard<T>(fn: () => Promise<T>): Promise<T> {
    if (this.locked) {
      throw new Error("PerenaConnector: re-entrant call detected");
    }
    this.locked = true;
    try {
      return await fn();
    } finally {
      this.locked = false;
    }
  }

  constructor(
    private perenaClient: PerenaClient,
    private solanaConnection: Connection,
    private keypair: Keypair,
    private logger: Logger
  ) {}

  // Get the optimal route for a stablecoin swap
  async getOptimalRoute(
    sourceToken: PublicKey,
    destinationToken: PublicKey,
    amount: number
  ): Promise<SwapRoute> {
    // Input validation
    if (!sourceToken || !destinationToken) {
      throw new Error("Invalid token addresses");
    }
    if (!amount || amount <= 0) {
      throw new Error("Amount must be greater than zero");
    }
    
    return await this.withReentrancyGuard(async () => {
      try {
        // Check direct swap availability
        const directPath = await this.perenaClient.findDirectPath(
          sourceToken, 
          destinationToken
        );
        
        // Check USD* routing
        const usdStarPath = await this.getUsdStarPath(
          sourceToken, 
          destinationToken
        );
        
        // Compare slippage and return best route
        return this.selectBestRoute([directPath, usdStarPath], amount);
      } catch (error) {
        this.logger.error(`Error finding optimal route: ${error.message}`);
        throw new Error(`Failed to get optimal route: ${error.message}`);
      }
    });
  }

  // Execute a swap through Perena with validation and error handling
  async executeSwap(
    route: SwapRoute,
    amount: number,
    slippageTolerance: number = 0.5,
    maxRetries: number = 3
  ): Promise<TransactionSignature> {
    // Validate inputs
    if (!route || !route.steps || route.steps.length === 0) {
      throw new Error("Invalid route provided");
    }
    if (amount <= 0) {
      throw new Error("Amount must be greater than zero");
    }
    if (slippageTolerance < 0 || slippageTolerance > 100) {
      throw new Error("Slippage tolerance must be between 0 and 100");
    }
    
    return await this.withReentrancyGuard(async () => {
      let retries = 0;
      while (retries < maxRetries) {
        try {
          // Build transaction
          const transaction = await this.buildSwapTransaction(
            route, 
            amount, 
            slippageTolerance
          );
          
          // Execute and confirm transaction
          const signature = await this.solanaConnection.sendTransaction(
            transaction, 
            [this.keypair]
          );
          
          // Wait for confirmation
          const confirmation = await this.solanaConnection.confirmTransaction(signature);
          
          // Verify transaction was successful
          if (confirmation.value.err) {
            throw new Error(`Transaction failed: ${confirmation.value.err}`);
          }
          
          return signature;
        } catch (error) {
          retries++;
          if (retries >= maxRetries) {
            this.logger.error(`Swap failed after ${retries} attempts: ${error.message}`);
            throw new Error(`Swap execution failed: ${error.message}`);
          }
          // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retries)));
        }
      }
    });
  }

  // Deposit funds into Perena liquidity pools for yield with security checks
  async depositToYieldStrategy(
    token: PublicKey,
    amount: number,
    strategy: YieldStrategy
  ): Promise<TransactionSignature> {
    // Validate inputs
    if (!token) {
      throw new Error("Token address is required");
    }
    if (!amount || amount <= 0) {
      throw new Error("Amount must be greater than zero");
    }
    if (!strategy || !Object.values(YieldStrategy).includes(strategy)) {
      throw new Error("Invalid yield strategy");
    }
    
    return await this.withReentrancyGuard(async () => {
      try {
        // Check if strategy is active
        const isActive = await this.isStrategyActive(strategy);
        if (!isActive) {
          throw new Error(`Strategy ${strategy} is not currently active`);
        }
        
        // Verify sufficient balance
        const balance = await this.getTokenBalance(token);
        if (balance < amount) {
          throw new Error("Insufficient token balance for deposit");
        }
        
        // Implementation based on strategy type
        switch (strategy) {
          case YieldStrategy.PERENA_SEED_POOL:
            return await this.depositToSeedPool(token, amount);
          case YieldStrategy.PERENA_GROWTH_POOL:
            return await this.depositToGrowthPool(token, amount);
          default:
            throw new Error(`Unsupported strategy: ${strategy}`);
        }
      } catch (error) {
        this.logger.error(`Deposit failed: ${error.message}`);
        throw new Error(`Failed to deposit to yield strategy: ${error.message}`);
      }
    });
  }
  
  // Helper methods with proper validation and error handling
  private async getUsdStarPath(sourceToken: PublicKey, destinationToken: PublicKey): Promise<SwapPath> {
    // Implementation with proper error handling
  }
  
  private selectBestRoute(routes: SwapPath[], amount: number): SwapRoute {
    // Implementation with proper validation
  }
  
  private async isStrategyActive(strategy: YieldStrategy): Promise<boolean> {
    // Implementation to check if strategy is active
  }
  
  private async getTokenBalance(token: PublicKey): Promise<number> {
    // Implementation to get token balance
  }
}
```

### Smart Routing Algorithm

```pseudocode
function findOptimalRoute(sourceToken, destinationToken, amount):
    // Input validation
    if sourceToken is null or destinationToken is null:
        throw "Invalid token addresses"
    if amount <= 0:
        throw "Amount must be greater than zero"
    
    try:
        // Direct swap through USD*
        directRoute = {
            steps: [
                {from: sourceToken, to: USD*, pool: Perena.seedPool},
                {from: USD*, to: destinationToken, pool: Perena.growthPool}
            ],
            estimatedSlippage: calculateSlippage(directRoute, amount)
        }
        
        // Alternative routes if available
        alternativeRoutes = []
        for each pool in Perena.allPools:
            if pool supports directSwap(sourceToken, destinationToken):
                route = {
                    steps: [{from: sourceToken, to: destinationToken, pool: pool}],
                    estimatedSlippage: calculateSlippage(route, amount)
                }
                alternativeRoutes.push(route)
        
        // Apply security checks to each route
        securityCheckedRoutes = []
        for each route in [directRoute, ...alternativeRoutes]:
            if isRouteSafe(route):
                securityCheckedRoutes.push(route)
        
        if securityCheckedRoutes.length == 0:
            throw "No safe routes available"
            
        // Select route with minimum slippage
        return findMinimumSlippage(securityCheckedRoutes)
    catch (error):
        logError("Route finding error", error)
        throw "Failed to find optimal route: " + error.message
        
function isRouteSafe(route):
    // Check for suspicious pools or tokens
    for each step in route.steps:
        if step.pool not in whitelistedPools:
            return false
        if step.from not in whitelistedTokens or step.to not in whitelistedTokens:
            return false
    
    // Check for reasonable slippage
    if route.estimatedSlippage > maxAllowedSlippage:
        return false
        
    return true
```

### Treasury Integration

```rust
#[program]
pub mod treasury_manager {
    use super::*;
    
    // State to prevent re-entrancy attacks
    pub struct ReentrancyGuard {
        pub entered: bool,
    }
    
    impl ReentrancyGuard {
        pub fn enter(&mut self) -> Result<()> {
            if self.entered {
                return Err(ErrorCode::ReentrancyDetected.into());
            }
            self.entered = true;
            Ok(())
        }
        
        pub fn exit(&mut self) {
            self.entered = false;
        }
    }

    // Access control modifiers
    pub fn only_admin<'info>(ctx: &Context<'_, '_, '_, 'info, DepositToYield<'info>>) -> Result<()> {
        if ctx.accounts.authority.key() != ctx.accounts.treasury_manager.admin {
            return Err(ErrorCode::UnauthorizedAccess.into());
        }
        Ok(())
    }
    
    // Emergency pause functionality
    pub fn is_paused(ctx: &Context<DepositToYield>) -> Result<bool> {
        Ok(ctx.accounts.treasury_manager.paused)
    }
    
    pub fn deposit_to_yield_strategy(
        ctx: Context<DepositToYield>,
        amount: u64,
        strategy_id: u8,
    ) -> Result<()> {
        // Check for emergency pause
        if is_paused(&ctx)? {
            return Err(ErrorCode::ContractPaused.into());
        }
        
        // Re-entrancy protection
        let mut guard = ctx.accounts.treasury_manager.reentrancy_guard;
        guard.enter()?;
        
        // Access control check
        only_admin(&ctx)?;
        
        // Input validation
        if amount == 0 {
            return Err(ErrorCode::InvalidAmount.into());
        }
        
        // Validate strategy ID
        if !ctx.accounts.treasury_manager.is_valid_strategy(strategy_id) {
            return Err(ErrorCode::InvalidStrategy.into());
        }
        
        // Validate the destination account
        if !ctx.accounts.treasury_manager.is_valid_strategy_account(
            strategy_id, 
            &ctx.accounts.perena_strategy_account.key()
        ) {
            return Err(ErrorCode::InvalidStrategyAccount.into());
        }
        
        // Check sufficient balance
        let balance = ctx.accounts.merchant_token_account.amount;
        if balance < amount {
            return Err(ErrorCode::InsufficientBalance.into());
        }
        
        // Following checks-effects-interactions pattern:
        // 1. Record deposit in treasury manager BEFORE external calls
        let treasury_manager = &mut ctx.accounts.treasury_manager;
        treasury_manager.deposits.push(Deposit {
            amount,
            strategy_id,
            timestamp: Clock::get()?.unix_timestamp,
            status: DepositStatus::Pending,
        });
        
        // 2. After state changes, perform external transfer
        let transfer_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.merchant_token_account.to_account_info(),
                to: ctx.accounts.perena_strategy_account.to_account_info(),
                authority: ctx.accounts.merchant.to_account_info(),
            },
        );
        
        // Execute transfer with proper error handling
        match token::transfer(transfer_ctx, amount) {
            Ok(_) => {
                // Update deposit status to completed
                let deposit_index = treasury_manager.deposits.len() - 1;
                treasury_manager.deposits[deposit_index].status = DepositStatus::Completed;
            },
            Err(err) => {
                // Revert state changes on error
                treasury_manager.deposits.pop();
                return Err(err.into());
            }
        }
        
        // Release reentrancy guard
        guard.exit();
        
        // Emit event for tracking
        emit!(DepositEvent {
            merchant: ctx.accounts.merchant.key(),
            amount,
            strategy_id,
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        Ok(())
    }
    
    // Additional functions for emergency controls
    pub fn pause(ctx: Context<EmergencyAction>) -> Result<()> {
        // Only admin can pause
        if ctx.accounts.authority.key() != ctx.accounts.treasury_manager.admin {
            return Err(ErrorCode::UnauthorizedAccess.into());
        }
        
        ctx.accounts.treasury_manager.paused = true;
        
        emit!(PauseEvent {
            admin: ctx.accounts.authority.key(),
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        Ok(())
    }
    
    pub fn unpause(ctx: Context<EmergencyAction>) -> Result<()> {
        // Only admin can unpause
        if ctx.accounts.authority.key() != ctx.accounts.treasury_manager.admin {
            return Err(ErrorCode::UnauthorizedAccess.into());
        }
        
        ctx.accounts.treasury_manager.paused = false;
        
        emit!(UnpauseEvent {
            admin: ctx.accounts.authority.key(),
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        Ok(())
    }
}

// Comprehensive error handling
#[error_code]
pub enum ErrorCode {
    #[msg("Re-entrancy detected")]
    ReentrancyDetected,
    #[msg("Unauthorized access")]
    UnauthorizedAccess,
    #[msg("Contract is paused")]
    ContractPaused,
    #[msg("Invalid amount")]
    InvalidAmount,
    #[msg("Invalid strategy")]
    InvalidStrategy,
    #[msg("Invalid strategy account")]
    InvalidStrategyAccount,
    #[msg("Insufficient balance")]
    InsufficientBalance,
}
```

## 5. Smart Contract Implementation

### PaymentProcessor Contract

```rust
#[program]
pub mod perenapay {
    use super::*;

    // State tracking for re-entrancy protection
    struct ProcessingState {
        processing_payment: bool,
        processing_swap: bool,
    }
    
    impl ProcessingState {
        fn new() -> Self {
            Self {
                processing_payment: false,
                processing_swap: false,
            }
        }
    }

    // Access control definitions
    const ROLE_ADMIN: u8 = 1;
    const ROLE_FEE_MANAGER: u8 = 2;
    const ROLE_EMERGENCY_ADMIN: u8 = 3;

    pub fn initialize(
        ctx: Context<Initialize>, 
        fee_basis_points: u16,
        admin: Pubkey,
        fee_recipient: Pubkey,
    ) -> Result<()> {
        // Input validation
        if fee_basis_points > 10000 {
            return Err(ErrorCode::InvalidFeeAmount.into());
        }
        
        let payment_processor = &mut ctx.accounts.payment_processor;
        payment_processor.admin = admin;
        payment_processor.fee_recipient = fee_recipient;
        payment_processor.fee_basis_points = fee_basis_points;
        payment_processor.perena_hub_address = ctx.accounts.perena_hub.key();
        payment_processor.state = ProcessingState::new();
        payment_processor.paused = false;
        payment_processor.version = 1;
        
        // Initialize roles
        payment_processor.grant_role(ROLE_ADMIN, admin)?;
        payment_processor.grant_role(ROLE_FEE_MANAGER, admin)?;
        payment_processor.grant_role(ROLE_EMERGENCY_ADMIN, admin)?;
        
        // Emit initialization event
        emit!(InitializedEvent {
            admin,
            fee_recipient,
            fee_basis_points,
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        Ok(())
    }

    pub fn process_payment(
        ctx: Context<ProcessPayment>,
        amount: u64,
        reference: Pubkey,
        memo: Option<String>,
    ) -> Result<()> {
        // Check if contract is paused
        let payment_processor = &ctx.accounts.payment_processor;
        if payment_processor.paused {
            return Err(ErrorCode::ContractPaused.into());
        }
        
        // Re-entrancy check
        if payment_processor.state.processing_payment {
            return Err(ErrorCode::ReentrancyDetected.into());
        }
        
        // Input validation
        if amount == 0 {
            return Err(ErrorCode::InvalidAmount.into());
        }
        
        // Set processing state - start of checks-effects-interactions pattern
        payment_processor.state.processing_payment = true;
        
        // Calculate fee amount with safe math
        let fee_amount = amount
            .checked_mul(payment_processor.fee_basis_points.into())
            .ok_or(ErrorCode::MathOverflow)?
            .checked_div(10000)
            .ok_or(ErrorCode::MathOverflow)?;
            
        let merchant_amount = amount
            .checked_sub(fee_amount)
            .ok_or(ErrorCode::MathOverflow)?;
            
        // Record payment before external calls
        payment_processor.record_payment(
            ctx.accounts.customer.key(),
            ctx.accounts.merchant.key(),
            amount,
            fee_amount,
            reference,
            &memo,
        )?;

        // Perform token transfers
        let transfer_to_processor_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.customer_token_account.to_account_info(),
                to: ctx.accounts.payment_processor_token_account.to_account_info(),
                authority: ctx.accounts.customer.to_account_info(),
            },
        );
        
        // Execute transfer with error handling
        match token::transfer(transfer_to_processor_ctx, amount) {
            Ok(_) => {},
            Err(err) => {
                // Revert state changes on error
                payment_processor.revert_payment_record(reference)?;
                payment_processor.state.processing_payment = false;
                return Err(err.into());
            }
        }

        // Transfer fee to fee recipient with error handling
        let fee_transfer_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.payment_processor_token_account.to_account_info(),
                to: ctx.accounts.fee_recipient_token_account.to_account_info(),
                authority: ctx.accounts.payment_processor.to_account_info(),
            },
        );
        
        if let Err(err) = token::transfer(fee_transfer_ctx, fee_amount) {
            // Handle fee transfer failure - potentially refund
            // For simplicity, we'll just log and continue
            msg!("Warning: Fee transfer failed: {:?}", err);
        }

        // Transfer remaining amount to merchant
        let merchant_transfer_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.payment_processor_token_account.to_account_info(),
                to: ctx.accounts.merchant_token_account.to_account_info(),
                authority: ctx.accounts.payment_processor.to_account_info(),
            },
        );
        
        // Execute merchant transfer with error handling
        match token::transfer(merchant_transfer_ctx, merchant_amount) {
            Ok(_) => {
                // Mark payment as completed
                payment_processor.complete_payment(reference)?;
            },
            Err(err) => {
                // Handle merchant transfer failure - potentially refund
                let refund_ctx = CpiContext::new(
                    ctx.accounts.token_program.to_account_info(),
                    Transfer {
                        from: ctx.accounts.payment_processor_token_account.to_account_info(),
                        to: ctx.accounts.customer_token_account.to_account_info(),
                        authority: ctx.accounts.payment_processor.to_account_info(),
                    },
                );
                
                // Attempt refund, but don't fail if refund fails
                if let Err(refund_err) = token::transfer(refund_ctx, merchant_amount) {
                    msg!("Critical: Refund failed: {:?}", refund_err);
                }
                
                payment_processor.fail_payment(reference)?;
                payment_processor.state.processing_payment = false;
                return Err(err.into());
            }
        }

        // Reset processing state
        payment_processor.state.processing_payment = false;

        // Emit payment event
        emit!(PaymentProcessed {
            customer: ctx.accounts.customer.key(),
            merchant: ctx.accounts.merchant.key(),
            amount,
            fee: fee_amount,
            reference,
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }

    pub fn swap_via_perena(
        ctx: Context<SwapViaPerena>,
        amount_in: u64,
        minimum_amount_out: u64,
    ) -> Result<()> {
        // Check if contract is paused
        let payment_processor = &ctx.accounts.payment_processor;
        if payment_processor.paused {
            return Err(ErrorCode::ContractPaused.into());
        }
        
        // Re-entrancy check
        if payment_processor.state.processing_swap {
            return Err(ErrorCode::ReentrancyDetected.into());
        }
        
        // Input validation
        if amount_in == 0 {
            return Err(ErrorCode::InvalidAmount.into());
        }
        
        if minimum_amount_out == 0 {
            return Err(ErrorCode::InvalidMinimumOutput.into());
        }
        
        // Set processing state
        payment_processor.state.processing_swap = true;
        
        // Record swap intent before external calls
        payment_processor.record_swap(
            ctx.accounts.customer.key(),
            ctx.accounts.customer_token_account.mint,
            ctx.accounts.perena_output_token_account.mint,
            amount_in,
            minimum_amount_out,
        )?;

        // Transfer tokens from customer to perena swap account
        let transfer_to_perena_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.customer_token_account.to_account_info(),
                to: ctx.accounts.perena_input_token_account.to_account_info(),
                authority: ctx.accounts.customer.to_account_info(),
            },
        );
        
        // Execute transfer with error handling
        match token::transfer(transfer_to_perena_ctx, amount_in) {
            Ok(_) => {},
            Err(err) => {
                payment_processor.state.processing_swap = false;
                return Err(err.into());
            }
        }

        // Call Perena's swap instruction
        let seeds = &[
            b"payment_processor".as_ref(),
            &[ctx.accounts.payment_processor.bump],
        ];
        let signer = &[&seeds[..]];
        let perena_swap_accounts = perena::cpi::accounts::Swap {
            // Accounts required by Perena's swap instruction
            // These will depend on Perena's specific implementation
        };
        let perena_swap_ctx = CpiContext::new_with_signer(
            ctx.accounts.perena_program.to_account_info(),
            perena_swap_accounts,
            signer,
        );
        
        // Execute swap with error handling
        match perena::cpi::swap(perena_swap_ctx, amount_in, minimum_amount_out) {
            Ok(_) => {},
            Err(err) => {
                // Handle swap failure - refund customer
                let refund_ctx = CpiContext::new(
                    ctx.accounts.token_program.to_account_info(),
                    Transfer {
                        from: ctx.accounts.perena_input_token_account.to_account_info(),
                        to: ctx.accounts.customer_token_account.to_account_info(),
                        authority: ctx.accounts.payment_processor.to_account_info(),
                    },
                );
                
                if let Err(refund_err) = token::transfer(refund_ctx, amount_in) {
                    msg!("Critical: Refund failed after swap error: {:?}", refund_err);
                }
                
                payment_processor.state.processing_swap = false;
                return Err(err.into());
            }
        }

        // Verify the swap was successful
        let output_token_account = &ctx.accounts.perena_output_token_account;
        if output_token_account.amount < minimum_amount_out {
            return Err(ErrorCode::InsufficientOutputAmount.into());
        }

        // Transfer the swapped tokens to the merchant
        let transfer_to_merchant_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.perena_output_token_account.to_account_info(),
                to: ctx.accounts.merchant_token_account.to_account_info(),
                authority: ctx.accounts.payment_processor.to_account_info(),
            },
        );
        
        match token::transfer(transfer_to_merchant_ctx, output_token_account.amount) {
            Ok(_) => {},
            Err(err) => {
                msg!("Critical: Transfer to merchant failed: {:?}", err);
                payment_processor.state.processing_swap = false;
                return Err(err.into());
            }
        }
        
        // Reset processing state
        payment_processor.state.processing_swap = false;
        
        // Emit swap event
        emit!(SwapCompleted {
            customer: ctx.accounts.customer.key(),
            merchant: ctx.accounts.merchant_token_account.owner,
            token_in: ctx.accounts.customer_token_account.mint,
            token_out: ctx.accounts.merchant_token_account.mint,
            amount_in,
            amount_out: output_token_account.amount,
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }
    
    // Emergency functions
    pub fn pause(ctx: Context<EmergencyAction>) -> Result<()> {
        // Only emergency admin can pause
        if !ctx.accounts.payment_processor.has_role(
            ROLE_EMERGENCY_ADMIN, 
            ctx.accounts.authority.key()
        ) {
            return Err(ErrorCode::UnauthorizedAccess.into());
        }
        
        ctx.accounts.payment_processor.paused = true;
        
        emit!(ContractPaused {
            admin: ctx.accounts.authority.key(),
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        Ok(())
    }
    
    pub fn unpause(ctx: Context<EmergencyAction>) -> Result<()> {
        // Only emergency admin can unpause
        if !ctx.accounts.payment_processor.has_role(
            ROLE_EMERGENCY_ADMIN, 
            ctx.accounts.authority.key()
        ) {
            return Err(ErrorCode::UnauthorizedAccess.into());
        }
        
        ctx.accounts.payment_processor.paused = false;
        
        emit!(ContractUnpaused {
            admin: ctx.accounts.authority.key(),
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        Ok(())
    }
    
    // Admin functions for managing roles
    pub fn grant_role(ctx: Context<RoleManagement>, role: u8, account: Pubkey) -> Result<()> {
        // Only admin can grant roles
        if !ctx.accounts.payment_processor.has_role(
            ROLE_ADMIN, 
            ctx.accounts.authority.key()
        ) {
            return Err(ErrorCode::UnauthorizedAccess.into());
        }
        
        ctx.accounts.payment_processor.grant_role(role, account)?;
        
        emit!(RoleGranted {
            role,
            account,
            admin: ctx.accounts.authority.key(),
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        Ok(())
    }
    
    pub fn revoke_role(ctx: Context<RoleManagement>, role: u8, account: Pubkey) -> Result<()> {
        // Only admin can revoke roles
        if !ctx.accounts.payment_processor.has_role(
            ROLE_ADMIN, 
            ctx.accounts.authority.key()
        ) {
            return Err(ErrorCode::UnauthorizedAccess.into());
        }
        
        ctx.accounts.payment_processor.revoke_role(role, account)?;
        
        emit!(RoleRevoked {
            role,
            account,
            admin: ctx.accounts.authority.key(),
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        Ok(())
    }
}

// Enhanced error handling
#[error_code]
pub enum ErrorCode {
    #[msg("Re-entrancy detected")]
    ReentrancyDetected,
    #[msg("Unauthorized access")]
    UnauthorizedAccess,
    #[msg("Contract is paused")]
    ContractPaused,
    #[msg("Invalid amount")]
    InvalidAmount,
    #[msg("Invalid fee amount")]
    InvalidFeeAmount,
    #[msg("Invalid minimum output amount")]
    InvalidMinimumOutput,
    #[msg("Insufficient output amount")]
    InsufficientOutputAmount,
    #[msg("Math overflow or underflow")]
    MathOverflow,
    #[msg("Invalid role")]
    InvalidRole,
    #[msg("Transaction failed")]
    TransactionFailed,
}
```

### SubscriptionManager Contract

```rust
#[program]
pub mod subscription_manager {
    use super::*;

    // Re-entrancy protection
    struct ReentrancyGuard {
        processing: bool,
    }
    
    impl ReentrancyGuard {
        fn new() -> Self {
            Self { processing: false }
        }
        
        fn enter(&mut self) -> Result<()> {
            if self.processing {
                return Err(ErrorCode::ReentrancyDetected.into());
            }
            self.processing = true;
            Ok(())
        }
        
        fn exit(&mut self) {
            self.processing = false;
        }
    }

    pub fn initialize(
        ctx: Context<Initialize>,
        admin: Pubkey,
    ) -> Result<()> {
        let subscription_manager = &mut ctx.accounts.subscription_manager;
        subscription_manager.admin = admin;
        subscription_manager.paused = false;
        subscription_manager.version = 1;
        subscription_manager.reentrancy_guard = ReentrancyGuard::new();
        
        // Initialize access control
        subscription_manager.initialize_access_control(admin)?;
        
        emit!(InitializedEvent {
            admin,
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        Ok(())
    }

    pub fn create_subscription(
        ctx: Context<CreateSubscription>,
        merchant: Pubkey,
        customer: Pubkey,
        token_mint: Pubkey,
        amount: u64,
        frequency: u64,  // in seconds
        start_time: i64,
        metadata: Option<String>,
    ) -> Result<()> {
        // Check if contract is paused
        if ctx.accounts.subscription_manager.paused {
            return Err(ErrorCode::ContractPaused.into());
        }
        
        // Re-entrancy protection
        let guard = &mut ctx.accounts.subscription_manager.reentrancy_guard;
        guard.enter()?;
        
        // Input validation
        if amount == 0 {
            return Err(ErrorCode::InvalidAmount.into());
        }
        
        if frequency == 0 {
            return Err(ErrorCode::InvalidFrequency.into());
        }
        
        if start_time < Clock::get()?.unix_timestamp {
            return Err(ErrorCode::InvalidStartTime.into());
        }
        
        // Authorization check
        if ctx.accounts.authority.key() != customer {
            return Err(ErrorCode::UnauthorizedAccess.into());
        }
        
        // Create subscription
        let subscription_id = ctx.accounts.subscription_manager.next_subscription_id;
        ctx.accounts.subscription_manager.next_subscription_id += 1;
        
        ctx.accounts.subscription_manager.subscriptions.push(Subscription {
            id: subscription_id,
            merchant,
            customer,
            token_mint,
            amount,
            frequency,
            start_time,
            last_payment_time: 0,  // No payments yet
            status: SubscriptionStatus::Active,
            metadata,
        });
        
        // Release reentrancy guard
        guard.exit();
        
        // Emit event
        emit!(SubscriptionCreated {
            id: subscription_id,
            merchant,
            customer,
            token_mint,
            amount,
            frequency,
            start_time,
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        Ok(())
    }

    pub fn process_subscription_payment(
        ctx: Context<ProcessSubscriptionPayment>,
        subscription_id: u64,
    ) -> Result<()> {
        // Check if contract is paused
        if ctx.accounts.subscription_manager.paused {
            return Err(ErrorCode::ContractPaused.into());
        }
        
        // Re-entrancy protection
        let guard = &mut ctx.accounts.subscription_manager.reentrancy_guard;
        guard.enter()?;
        
        // Get subscription
        let subscription = ctx.accounts.subscription_manager
            .get_subscription(subscription_id)?;
            
        // Validate subscription
        if subscription.status != SubscriptionStatus::Active {
            return Err(ErrorCode::InactiveSubscription.into());
        }
        
        let current_time = Clock::get()?.unix_timestamp;
        
        // Check if payment is due
        let next_payment_time = if subscription.last_payment_time == 0 {
            subscription.start_time
        } else {
            subscription.last_payment_time + subscription.frequency as i64
        };
        
        if current_time < next_payment_time {
            return Err(ErrorCode::PaymentNotDue.into());
        }
        
        // Verify accounts
        if ctx.accounts.customer.key() != subscription.customer {
            return Err(ErrorCode::InvalidCustomer.into());
        }
        
        if ctx.accounts.merchant.key() != subscription.merchant {
            return Err(ErrorCode::InvalidMerchant.into());
        }
        
        if ctx.accounts.customer_token_account.mint != subscription.token_mint {
            return Err(ErrorCode::InvalidTokenMint.into());
        }
        
        if ctx.accounts.merchant_token_account.mint != subscription.token_mint {
            return Err(ErrorCode::InvalidTokenMint.into());
        }
        
        // Update state before external call (checks-effects-interactions)
        ctx.accounts.subscription_manager.update_subscription_payment_time(
            subscription_id, 
            current_time
        )?;
        
        // Transfer tokens
        let transfer_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.customer_token_account.to_account_info(),
                to: ctx.accounts.merchant_token_account.to_account_info(),
                authority: ctx.accounts.customer.to_account_info(),
            },
        );
        
        // Execute transfer with error handling
        match token::transfer(transfer_ctx, subscription.amount) {
            Ok(_) => {
                // Emit success event
                emit!(SubscriptionPaymentProcessed {
                    id: subscription_id,
                    merchant: subscription.merchant,
                    customer: subscription.customer,
                    amount: subscription.amount,
                    timestamp: current_time,
                });
            },
            Err(err) => {
                // Revert state changes on error
                ctx.accounts.subscription_manager.revert_subscription_payment_time(
                    subscription_id
                )?;
                
                guard.exit();
                return Err(err.into());
            }
        }
        
        // Release reentrancy guard
        guard.exit();
        
        Ok(())
    }
    
    // Additional functions for subscription management
    // Cancel, pause, resume subscriptions, etc.
    
    // Emergency functions
    pub fn pause(ctx: Context<EmergencyAction>) -> Result<()> {
        // Only admin can pause
        if ctx.accounts.authority.key() != ctx.accounts.subscription_manager.admin {
            return Err(ErrorCode::UnauthorizedAccess.into());
        }
        
        ctx.accounts.subscription_manager.paused = true;
        
        emit!(ContractPaused {
            admin: ctx.accounts.authority.key(),
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        Ok(())
    }
    
    pub fn unpause(ctx: Context<EmergencyAction>) -> Result<()> {
        // Only admin can unpause
        if ctx.accounts.authority.key() != ctx.accounts.subscription_manager.admin {
            return Err(ErrorCode::UnauthorizedAccess.into());
        }
        
        ctx.accounts.subscription_manager.paused = false;
        
        emit!(ContractUnpaused {
            admin: ctx.accounts.authority.key(),
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        Ok(())
    }
}

// Comprehensive error handling
#[error_code]
pub enum ErrorCode {
    #[msg("Re-entrancy detected")]
    ReentrancyDetected,
    #[msg("Unauthorized access")]
    UnauthorizedAccess,
    #[msg("Contract is paused")]
    ContractPaused,
    #[msg("Invalid amount")]
    InvalidAmount,
    #[msg("Invalid frequency")]
    InvalidFrequency,
    #[msg("Invalid start time")]
    InvalidStartTime,
    #[msg("Subscription not found")]
    SubscriptionNotFound,
    #[msg("Inactive subscription")]
    InactiveSubscription,
    #[msg("Payment not due")]
    PaymentNotDue,
    #[msg("Invalid customer")]
    InvalidCustomer,
    #[msg("Invalid merchant")]
    InvalidMerchant,
    #[msg("Invalid token mint")]
    InvalidTokenMint,
}
```

## 6. Security Design and Audit Strategy

### Security Development Lifecycle

PerenaPay implements a comprehensive security development lifecycle that integrates security at every stage of development:

1. **Requirements Phase**:
   - Security requirements are defined alongside functional requirements
   - Threat modeling sessions identify potential attack vectors
   - Security goals and risk tolerances are established

2. **Design Phase**:
   - Security architecture review by domain experts
   - Attack surface analysis
   - Security design patterns selection
   - Formal security property specification

3. **Implementation Phase**:
   - Secure coding guidelines enforcement
   - Regular peer code reviews with security focus
   - Static analysis tool integration
   - Continuous integration with security checks

4. **Testing Phase**:
   - Security-focused test cases
   - Fuzz testing and property-based testing
   - Penetration testing by internal team
   - Integration of security testing in CI/CD pipeline

5. **Deployment Phase**:
   - Secure deployment procedures
   - Configuration hardening
   - Deployment verification
   - Monitoring and alerting setup

6. **Maintenance Phase**:
   - Regular security assessments
   - Vulnerability management process
   - Secure upgrade procedures
   - Incident response readiness

### Threat Modeling and Attack Vectors

Our threat modeling approach uses the STRIDE methodology to systematically identify threats:

1. **Spoofing**: 
   - Unauthorized access to merchant or customer accounts
   - Mitigations: Strong authentication, digital signatures for transactions

2. **Tampering**: 
   - Manipulation of payment data or transaction amounts
   - Mitigations: On-chain verification, integrity checks, immutable transaction records

3. **Repudiation**: 
   - Denial of payment execution
   - Mitigations: Transaction receipts, event logging, on-chain proofs

4. **Information Disclosure**: 
   - Exposure of sensitive merchant or customer data
   - Mitigations: Data minimization, encryption, privacy-preserving patterns

5. **Denial of Service**: 
   - Contract blocking or slowdown
   - Mitigations: Rate limiting, gas optimization, failover mechanisms

6. **Elevation of Privilege**: 
   - Unauthorized access to admin functions
   - Mitigations: Role-based access control, time-locked admin actions

Specific smart contract attack vectors addressed:

- **Re-entrancy**: Implemented re-entrancy guards and checks-effects-interactions pattern
- **Front-running**: Using minimum amount parameters and slippage tolerance
- **Integer overflow/underflow**: Using checked arithmetic operations
- **Access control vulnerabilities**: Comprehensive role-based access control
- **Logic errors**: Extensive testing and verification of business logic
- **Oracle manipulation**: Using decentralized price feeds with safety checks

### Comprehensive Security Testing

Our multi-layered testing approach ensures robust security validation:

1. **Unit Testing**:
   - Property-based testing of key security invariants
   - Test cases for boundary conditions and edge cases
   - Negative testing for error conditions

2. **Integration Testing**:
   - Testing interactions between contracts
   - Simulating complex transaction sequences
   - Cross-contract security validation

3. **Fuzz Testing**:
   - Automated generation of random inputs
   - Targeting state transitions and input validation
   - Stress testing with high transaction volumes

4. **Formal Verification**:
   - Mathematical proofs of critical security properties
   - Verification of access control logic
   - Validation of state transition safety

5. **Simulation Testing**:
   - Economic attack simulations
   - Game theory analysis of incentive structures
   - Liquidity stress testing

### Audit Strategy

Our multi-phase audit approach ensures comprehensive security validation:

1. **Internal Review (Pre-Hackathon)**:
   - Complete internal security review
   - Security-focused code review by developers
   - Documentation of security measures

2. **Initial External Audit (Post-Hackathon, Pre-MVP)**:
   - Engagement with reputable audit firm
   - Focus on architecture and core functionality
   - Critical vulnerability identification

3. **Comprehensive Audit (Pre-Beta)**:
   - Full-scope audit by multiple firms
   - Manual code review and automated analysis
   - Detailed testing of edge cases

4. **Final Audit (Pre-Production)**:
   - Complete system audit by top-tier firm
   - Verification of previous issue remediation
   - Live testing in testnet environment

5. **Continuous Security Assessments**:
   - Quarterly security reviews
   - Penetration testing
   - Regular code scans

### Bug Bounty Program

To leverage the broader security community, PerenaPay will implement a tiered bug bounty program:

1. **Scope**:
   - All smart contracts and backend services
   - Frontend applications
   - API endpoints

2. **Reward Structure**:
   - Critical: $50,000 - $100,000
   - High: $10,000 - $50,000
   - Medium: $2,500 - $10,000
   - Low: $500 - $2,500

3. **Vulnerability Classification**:
   - Based on CVSS scoring system
   - Impact and exploitability assessment
   - Time-bounded severity escalation

4. **Responsible Disclosure Policy**:
   - 90-day disclosure timeline
   - Safe harbor provisions for good-faith researchers
   - Coordinated disclosure process

### Incident Response Plan

In the event of a security incident, PerenaPay will follow a structured response process:

1. **Detection**:
   - Monitoring systems and alert triggers
   - Community and user reports
   - Audit partner notifications

2. **Assessment**:
   - Rapid triage and severity classification
   - Impact analysis
   - Exploitation risk evaluation

3. **Containment**:
   - Emergency pause activation if necessary
   - Isolation of affected components
   - Prevention of further exploitation

4. **Remediation**:
   - Vulnerability patching
   - Security review of fixes
   - Deployment through secure upgrade process

5. **Recovery**:
   - Secure system restoration
   - Verification of system integrity
   - Gradual resumption of services

6. **Communication**:
   - Transparent disclosure to users
   - Regular status updates
   - Post-incident analysis publication

### Secure Upgrade Mechanism

To allow for secure evolution of the system while protecting users:

1. **Timelocked Upgrades**:
   - Mandatory delay period between upgrade proposal and execution
   - Increasing timelock periods based on impact level
   - Emergency bypass only for critical vulnerabilities

2. **Transparent Proposal Process**:
   - Public announcement of upgrade plans
   - Technical documentation of changes
   - Community review period

3. **Multi-signature Approval**:
   - Multiple administrators required for upgrade approval
   - Threshold signature scheme
   - Independent approvers from different organizations

4. **Upgrade Requirements**:
   - Comprehensive test coverage
   - Security review documentation
   - Backward compatibility assessment
   - State migration validation

## 7. Backend Services Implementation

### Payment Service

```typescript
@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  
  constructor(
    private readonly perenaService: PerenaService,
    private readonly merchantService: MerchantService,
    private readonly configService: ConfigService,
    private readonly webhookService: WebhookService,
    private readonly securityService: SecurityService,
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async createPaymentRequest(
    merchantId: string, 
    amount: number, 
    currency: string,
    metadata: Record<string, any> = {},
  ): Promise<PaymentRequest> {
    try {
      // Input validation
      if (!merchantId) {
        throw new BadRequestException('Merchant ID is required');
      }
      
      if (!amount || amount <= 0) {
        throw new BadRequestException('Amount must be greater than zero');
      }
      
      if (!currency) {
        throw new BadRequestException('Currency is required');
      }
      
      // Rate limiting check
      await this.securityService.checkRateLimit('create_payment', merchantId);
      
      // Get merchant details
      const merchant = await this.merchantService.getMerchantById(merchantId);
      if (!merchant) {
        throw new NotFoundException('Merchant not found');
      }
      
      // Security check for merchant status
      if (!merchant.isActive) {
        throw new ForbiddenException('Merchant account is inactive');
      }

      // Generate unique reference for this payment
      const reference = new PublicKey(uuidv4().replace(/-/g, ''));
      
      // Validate metadata to prevent injection
      const sanitizedMetadata = this.securityService.sanitizeMetadata(metadata);

      // Create payment record in database with proper error handling
      let payment;
      try {
        payment = await this.paymentRepository.create({
          merchantId,
          amount,
          currency,
          reference: reference.toString(),
          status: 'PENDING',
          metadata: sanitizedMetadata,
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minute expiry
        });
      } catch (error) {
        this.logger.error(`Failed to create payment record: ${error.message}`, error.stack);
        throw new InternalServerErrorException('Failed to create payment');
      }

      // Get supported stablecoins from Perena with fallback
      let supportedStablecoins;
      try {
        supportedStablecoins = await this.perenaService.getSupportedStablecoins();
      } catch (error) {
        this.logger.warn(`Failed to get stablecoins from Perena, using fallback: ${error.message}`);
        supportedStablecoins = this.configService.get('fallbackStablecoins');
      }
      
      // Log payment creation for audit trail
      this.logger.log(`Payment created: ${payment.id} for merchant ${merchantId}`);
      
      // Return payment request details
      return {
        id: payment.id,
        reference: reference.toString(),
        amount,
        currency,
        merchantId,
        merchantName: merchant.name,
        supportedStablecoins,
        expiresAt: payment.expiresAt,
      };
    } catch (error) {
      // Enhanced error handling with proper logging
      if (error instanceof HttpException) {
        throw error;
      }
      
      this.logger.error(`Unexpected error in createPaymentRequest: ${error.message}`, error.stack);
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async verifyPayment(paymentId: string): Promise<PaymentVerificationResult> {
    try {
      // Input validation
      if (!paymentId) {
        throw new BadRequestException('Payment ID is required');
      }
      
      // Rate limiting check for API abuse prevention
      await this.securityService.checkRateLimit('verify_payment', paymentId);
      
      const payment = await this.paymentRepository.findById(paymentId);
      if (!payment) {
        throw new NotFoundException('Payment not found');
      }
      
      // Check for payment expiration
      if (payment.expiresAt && payment.expiresAt < new Date()) {
        await this.paymentRepository.update(paymentId, { status: 'EXPIRED' });
        return { status: 'EXPIRED', message: 'Payment has expired' };
      }
      
      // Check if payment is already verified
      if (payment.status === 'COMPLETED') {
        return { 
          status: 'COMPLETED', 
          signature: payment.transactionSignature,
          message: 'Payment already verified' 
        };
      }

      // Connect to Solana with retry logic
      const connection = await this.getConnectionWithRetry();

      // Find transaction by reference
      const reference = new PublicKey(payment.reference);
      let signatureInfo;
      try {
        signatureInfo = await connection.getSignaturesForAddress(reference);
      } catch (error) {
        this.logger.error(`Error getting signatures: ${error.message}`, error.stack);
        return { status: 'PENDING', message: 'Error checking transaction status' };
      }

      if (signatureInfo.length === 0) {
        return { status: 'PENDING', message: 'No transaction found' };
      }

      // Get the most recent signature
      const signature = signatureInfo[0].signature;
      
      // Get transaction details with retry logic
      let transaction;
      try {
        transaction = await this.getTransactionWithRetry(connection, signature);
      } catch (error) {
        this.logger.error(`Error getting transaction: ${error.message}`, error.stack);
        return { status: 'PENDING', message: 'Transaction details not available' };
      }

      // Verify transaction was successful
      if (transaction.meta.err) {
        await this.paymentRepository.update(paymentId, { 
          status: 'FAILED',
          transactionSignature: signature,
          errorDetails: JSON.stringify(transaction.meta.err)
        });
        return { status: 'FAILED', message: 'Transaction failed on-chain' };
      }

      // Verify payment amount matches
      const transferAmount = this.extractTransferAmount(transaction);
      if (transferAmount !== payment.amount) {
        await this.paymentRepository.update(paymentId, { 
          status: 'FAILED',
          transactionSignature: signature,
          errorDetails: 'Amount mismatch'
        });
        return { 
          status: 'FAILED', 
          message: 'Payment amount doesn\'t match transaction amount' 
        };
      }

      // Update payment status with transaction protection
      try {
        await this.paymentRepository.transaction(async (repo) => {
          await repo.update(paymentId, { 
            status: 'COMPLETED',
            transactionSignature: signature,
            completedAt: new Date(),
          });
        });
      } catch (error) {
        this.logger.error(`Failed to update payment: ${error.message}`, error.stack);
        throw new InternalServerErrorException('Failed to update payment status');
      }

      // Trigger webhook notification with retry logic
      try {
        await this.webhookService.sendPaymentNotificationWithRetry(payment.merchantId, {
          type: 'payment.completed',
          data: {
            paymentId,
            amount: payment.amount,
            currency: payment.currency,
            transactionSignature: signature,
          }
        });
      } catch (error) {
        // Log webhook failure but don't fail the verification
        this.logger.error(`Webhook notification failed: ${error.message}`, error.stack);
      }
      
      // Log successful verification for audit trail
      this.logger.log(`Payment verified: ${paymentId} with signature ${signature}`);

      return { 
        status: 'COMPLETED', 
        signature,
        message: 'Payment verified successfully' 
      };
    } catch (error) {
      // Enhanced error handling with proper logging
      if (error instanceof HttpException) {
        throw error;
      }
      
      this.logger.error(`Unexpected error in verifyPayment: ${error.message}`, error.stack);
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
  
  // Helper methods with proper error handling and retry logic
  
  private async getConnectionWithRetry(maxRetries = 3): Promise<Connection> {
    let retries = 0;
    while (retries < maxRetries) {
      try {
        return new Connection(this.configService.get('SOLANA_RPC_URL'));
      } catch (error) {
        retries++;
        if (retries >= maxRetries) {
          throw error;
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retries)));
      }
    }
  }
  
  private async getTransactionWithRetry(
    connection: Connection, 
    signature: string, 
    maxRetries = 3
  ): Promise<any> {
    let retries = 0;
    while (retries < maxRetries) {
      try {
        const transaction = await connection.getTransaction(signature);
        if (!transaction) {
          throw new Error('Transaction not found');
        }
        return transaction;
      } catch (error) {
        retries++;
        if (retries >= maxRetries) {
          throw error;
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retries)));
      }
    }
  }
  
  private extractTransferAmount(transaction: any): number {
    // Implementation to extract transfer amount from transaction
    // ...
  }
}
```

## 8. User Experience Design

### Merchant Experience:

1. **Onboarding Flow**:
   - Simple registration with minimal information
   - Wallet connection for receiving payments
   - Selection of preferred settlement stablecoin
   - Quick setup wizard for basic configuration
   - Security settings configuration
   - Two-factor authentication option

2. **Merchant Dashboard**:
   - Real-time transaction monitoring
   - Key metrics display (volume, revenue, conversions)
   - Stablecoin balance management
   - Treasury and yield management
   - Settings and integration management
   - Security monitoring and alerts
   - Transaction anomaly detection

### Customer Experience:

1. **Checkout Flow**:
   - View payment details (amount, merchant)
   - Select preferred stablecoin for payment
   - Connect wallet or scan QR code
   - Confirm transaction details
   - Complete payment and view confirmation
   - Transaction receipt generation
   - Optional email notification

2. **Security Features**:
   - Clear transaction preview before signing
   - Transaction amount verification
   - Merchant verification indicators
   - Connection security indicators
   - Privacy-preserving payment options

## 9. Integration Layer

### REST API Endpoints

```
API Endpoints Structure:

/api/v1/payments
  POST / - Create a new payment
  GET /{id} - Get payment details
  POST /{id}/verify - Verify payment
  GET /list - List payments (paginated)

/api/v1/merchants
  POST / - Create merchant account
  GET /{id} - Get merchant details
  PUT /{id} - Update merchant
  GET /{id}/transactions - Get merchant transactions

/api/v1/analytics
  GET /transactions - Get transaction analytics
  GET /revenue - Get revenue analytics
  GET /conversions - Get conversion analytics

/api/v1/treasury
  GET /balances - Get treasury balances
  GET /yield - Get yield analytics
  POST /allocate - Allocate funds to yield strategy
  POST /withdraw - Withdraw funds from strategy

/api/v1/webhooks
  POST /configure - Configure webhook endpoints
  GET /events - List webhook events
  GET /deliveries - List webhook deliveries
  
/api/v1/security
  POST /auth/token - Get authentication token
  GET /audit-log - Get security audit log
  POST /2fa/enable - Enable two-factor authentication
  POST /2fa/verify - Verify two-factor authentication
```

### JavaScript SDK

```typescript
export class PerenaPay {
  private apiKey: string;
  private baseUrl: string;
  private retryConfig: RetryConfig;
  private securityContext: SecurityContext;

  constructor(apiKey: string, options: PaymentOptions = {}) {
    // Input validation
    if (!apiKey) {
      throw new Error('API key is required');
    }
    
    this.apiKey = apiKey;
    this.baseUrl = options.baseUrl || 'https://api.perenapay.com';
    this.retryConfig = {
      maxRetries: options.maxRetries || 3,
      baseDelay: options.baseDelay || 1000,
      maxDelay: options.maxDelay || 10000,
    };
    this.securityContext = {
      csrfToken: null,
      lastRefreshTime: 0,
    };
    
    // Initialize security features
    this.initializeSecurity();
  }
  
  private async initializeSecurity() {
    try {
      // Get CSRF token for API requests
      const response = await fetch(`${this.baseUrl}/api/v1/security/csrf`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });
      
      if (!response.ok) {
        console.warn('Failed to initialize security context');
        return;
      }
      
      const data = await response.json();
      this.securityContext.csrfToken = data.token;
      this.securityContext.lastRefreshTime = Date.now();
    } catch (error) {
      console.warn('Failed to initialize security context', error);
    }
  }

  // Payment methods
  async createPayment(params: {
    amount: number;
    currency: string;
    preferredSettlementCurrency?: string;
    description?: string;
    metadata?: Record<string, any>;
  }) {
    // Input validation
    if (!params.amount || params.amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }
    
    if (!params.currency) {
      throw new Error('Currency is required');
    }
    
    // Sanitize metadata to prevent injection
    const sanitizedMetadata = this.sanitizeMetadata(params.metadata || {});
    
    return this.request<PaymentResponse>('POST', '/api/v1/payments', {
      ...params,
      metadata: sanitizedMetadata,
    });
  }

  async getPayment(paymentId: string) {
    // Input validation
    if (!paymentId) {
      throw new Error('Payment ID is required');
    }
    
    return this.request<PaymentDetails>('GET', `/api/v1/payments/${paymentId}`);
  }

  async verifyPayment(paymentId: string) {
    // Input validation
    if (!paymentId) {
      throw new Error('Payment ID is required');
    }
    
    return this.request<PaymentVerification>('POST', `/api/v1/payments/${paymentId}/verify`);
  }

  // Checkout widget methods
  renderCheckout(containerId: string, paymentId: string, options: CheckoutOptions = {}) {
    // Input validation
    if (!containerId) {
      throw new Error('Container ID is required');
    }
    
    if (!paymentId) {
      throw new Error('Payment ID is required');
    }
    
    // Create an iframe with the checkout URL
    const iframe = document.createElement('iframe');
    
    // Generate unique session ID for security
    const sessionId = this.generateSessionId();
    
    // Create secure URL with signed parameters
    const checkoutUrl = this.createSecureCheckoutUrl(paymentId, sessionId, options);
    
    iframe.src = checkoutUrl;
    iframe.style.width = options.width || '100%';
    iframe.style.height = options.height || '500px';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '8px';
    iframe.allow = 'camera; microphone';
    iframe.sandbox.add('allow-scripts', 'allow-same-origin', 'allow-forms');
    iframe.id = `perenapay-checkout-${paymentId}`;
    
    // Add security attributes
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('referrerpolicy', 'origin');

    // Clear container and append iframe
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }
    container.innerHTML = '';
    container.appendChild(iframe);

    // Set up secure messaging between iframe and parent
    const messageHandler = (event: MessageEvent) => {
      // Validate origin
      if (event.origin !== this.baseUrl) return;
      
      // Validate session
      if (event.data.sessionId !== sessionId) {
        console.error('Invalid session ID in message');
        return;
      }

      const { type, data } = event.data;
      
      if (type === 'PAYMENT_SUCCESS' && options.onSuccess) {
        options.onSuccess(data);
      } else if (type === 'PAYMENT_ERROR' && options.onError) {
        options.onError(data);
      } else if (type === 'PAYMENT_CANCEL' && options.onCancel) {
        options.onCancel(data);
      }
    };
    
    window.addEventListener('message', messageHandler);

    return {
      destroy: () => {
        window.removeEventListener('message', messageHandler);
        container.innerHTML = '';
      }
    };
  }

  // Helper methods
  private async request<T>(method: string, path: string, data?: any): Promise<T> {
    let retries = 0;
    
    while (true) {
      try {
        // Refresh CSRF token if needed
        await this.refreshSecurityContextIfNeeded();
        
        const url = `${this.baseUrl}${path}`;
        const headers: Record<string, string> = {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        };
        
        // Add CSRF token if available
        if (this.securityContext.csrfToken) {
          headers['X-CSRF-Token'] = this.securityContext.csrfToken;
        }
        
        // Add fingerprint for fraud detection
        headers['X-Device-Fingerprint'] = await this.generateDeviceFingerprint();

        const response = await fetch(url, {
          method,
          headers,
          body: data ? JSON.stringify(data) : undefined,
        });

        if (!response.ok) {
          const errorData = await response.json();
          
          // Special handling for authentication errors
          if (response.status === 401 || response.status === 403) {
            throw new Error(`Authentication error: ${errorData.message || 'Unauthorized'}`);
          }
          
          throw new Error(errorData.message || 'An error occurred');
        }

        return await response.json() as T;
      } catch (error) {
        retries++;
        
        // Check if we should retry
        if (retries >= this.retryConfig.maxRetries) {
          throw error;
        }
        
        // Exponential backoff with jitter
        const delay = Math.min(
          this.retryConfig.baseDelay * Math.pow(2, retries) + Math.random() * 100,
          this.retryConfig.maxDelay
        );
        
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  private async refreshSecurityContextIfNeeded() {
    const tokenLifetime = 15 * 60 * 1000; // 15 minutes
    
    if (
      !this.securityContext.csrfToken || 
      Date.now() - this.securityContext.lastRefreshTime > tokenLifetime
    ) {
      await this.initializeSecurity();
    }
  }
  
  private createSecureCheckoutUrl(
    paymentId: string,
    sessionId: string,
    options: CheckoutOptions
  ): string {
    const url = new URL(`${this.baseUrl}/checkout/${paymentId}`);
    
    // Add session ID
    url.searchParams.append('session', sessionId);
    
    // Add API key hash for validation
    const keyHash = this.hashApiKey();
    url.searchParams.append('key_hash', keyHash);
    
    // Add options as query parameters
    if (options.theme) {
      url.searchParams.append('theme', options.theme);
    }
    
    if (options.preferredCurrency) {
      url.searchParams.append('preferred_currency', options.preferredCurrency);
    }
    
    // Add timestamp for request validation
    url.searchParams.append('ts', Date.now().toString());
    
    return url.toString();
  }
  
  private generateSessionId(): string {
    // Implementation of secure session ID generation
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }
  
  private hashApiKey(): string {
    // Implementation of API key hashing
    // In a real implementation, use a secure hashing algorithm
    return btoa(this.apiKey.substring(0, 8));
  }
  
  private async generateDeviceFingerprint(): Promise<string> {
    // Implementation of device fingerprinting
    // In a real implementation, collect browser/device properties securely
    return 'fingerprint_placeholder';
  }
  
  private sanitizeMetadata(metadata: Record<string, any>): Record<string, any> {
    // Implementation of metadata sanitization
    const sanitized: Record<string, any> = {};
    
    for (const [key, value] of Object.entries(metadata)) {
      // Sanitize keys
      const safeKey = String(key).replace(/[^\w]/g, '_').substring(0, 64);
      
      // Sanitize values based on type
      if (typeof value === 'string') {
        sanitized[safeKey] = String(value).substring(0, 1024);
      } else if (typeof value === 'number') {
        sanitized[safeKey] = value;
      } else if (typeof value === 'boolean') {
        sanitized[safeKey] = value;
      } else if (value === null) {
        sanitized[safeKey] = null;
      } else if (Array.isArray(value)) {
        sanitized[safeKey] = value.slice(0, 100).map(item => {
          if (typeof item === 'string') {
            return String(item).substring(0, 1024);
          }
          return item;
        });
      } else if (typeof value === 'object') {
        sanitized[safeKey] = this.sanitizeMetadata(value);
      }
    }
    
    return sanitized;
  }
}
```

### E-commerce Plugins
Pre-built plugins for popular e-commerce platforms:
- **Shopify**: App in Shopify App Store
- **WooCommerce**: WordPress plugin
- **Magento**: Extension in Magento Marketplace
- **BigCommerce**: App in BigCommerce App Store

Each plugin includes:
- Strong input validation
- XSS protection
- CSRF protection
- Configurable security settings
- Regular security updates

## 10. Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Smart contract vulnerabilities | Medium | Critical | Implement comprehensive security measures: re-entrancy guards, access controls, input validation, formal verification, multiple audits, bug bounty program |
| Perena API limitations | Medium | High | Build fallback pathways for critical functions, implement circuit breakers, develop API monitoring system |
| Regulatory challenges | Medium | High | Implement robust compliance framework, engage legal counsel, build configurable compliance controls |
| Merchant adoption barriers | Medium | High | Focus on seamless onboarding and UX, provide comprehensive integration resources, offer direct support |
| Competition from established players | Medium | Medium | Emphasize unique Perena integration and benefits, develop proprietary features, build strong partnerships |
| Solana network congestion | Low | Medium | Implement off-chain components where appropriate, develop retry mechanisms with exponential backoff |
| Stablecoin volatility | Low | High | Diversify supported stablecoins, implement price impact monitoring, develop circuit breakers for extreme volatility |
| Oracle manipulation attacks | Low | High | Use multiple decentralized oracles, implement anomaly detection, set slippage limits |
| Front-running attacks | Medium | Medium | Implement slippage protection, use private order submission when available |
| Liquidity risks | Medium | High | Monitor liquidity pools, implement failover to alternative pools, develop contingency plans |

## 11. Differentiators & Competitive Advantages

### vs. Traditional Payment Processors
- 70-80% lower fees
- Instant settlement vs. 2-3 day delays
- No chargebacks or payment disputes
- Yield generation on idle funds
- Programmable payment flows
- Enhanced security with blockchain transparency

### vs. Existing Crypto Payment Solutions
- Direct Perena integration for optimal liquidity
- Enterprise-grade merchant tools
- Multi-stablecoin support with preferred settlement
- Treasury management and yield optimization
- Comprehensive analytics and reporting
- Advanced security features and audit trail

### vs. Solana Pay
- Built for businesses rather than just protocol level
- Complete merchant dashboard and tools
- Advanced analytics and reporting
- Multi-stablecoin optimization through Perena
- Yield generation capabilities
- Enhanced security features

## 12. Post-Hackathon Vision

### Q2 2025 (Post-Hackathon)
- Launch MVP with core functionality
- Onboard first 50 merchants
- Implement basic subscription features
- Expand stablecoin support
- Complete initial security audit

### Q3 2025
- Release enhanced treasury management
- Add e-commerce plugins
- Implement advanced analytics
- Expand developer ecosystem
- Launch bug bounty program
- Complete comprehensive security audit

### Q4 2025
- Launch enterprise tier features
- Add multi-user access and roles
- Implement enhanced security features
- Expand to additional blockchain networks
- Obtain security certifications
- Implement formal verification for critical components

### Q1 2026
- Add fiat on/off ramps
- Implement AI-driven insights
- Launch mobile applications
- Expand global merchant base
- Establish security operations center
- Implement continuous security monitoring


## 14. Hackathon Success Strategy

### Key Success Factors:
1. **Perena Integration Excellence**: Showcase deep integration with Perena's infrastructure
2. **Technical Implementation Quality**: Focus on robust, working code with strong security features
3. **Real-World Utility Demonstration**: Prepare compelling use cases
4. **Presentation Strategy**: Create a narrative that emphasizes market need
5. **Differentiation Points**: Highlight unique advantages over existing solutions
6. **Security Approach**: Demonstrate comprehensive security design and implementation
7. **Developer Experience**: Show how easy it is for merchants to integrate PerenaPay