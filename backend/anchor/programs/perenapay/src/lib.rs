use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};
use std::collections::HashMap;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod perenapay {
    use super::*;

    /// Initialize the payment processor with admin settings
    pub fn initialize(
        ctx: Context<Initialize>, 
        fee_basis_points: u16,
        fee_recipient: Pubkey,
    ) -> Result<()> {
        // Input validation
        if fee_basis_points > 10000 {
            return Err(ErrorCode::InvalidFeeAmount.into());
        }
        
        let payment_processor = &mut ctx.accounts.payment_processor;
        payment_processor.admin = ctx.accounts.authority.key();
        payment_processor.fee_recipient = fee_recipient;
        payment_processor.fee_basis_points = fee_basis_points;
        payment_processor.paused = false;
        payment_processor.version = 1;
        payment_processor.bump = *ctx.bumps.get("payment_processor").unwrap();
        
        // Initialize roles
        payment_processor.roles = HashMap::new();
        payment_processor.grant_role(Role::Admin, ctx.accounts.authority.key())?;
        payment_processor.grant_role(Role::FeeManager, ctx.accounts.authority.key())?;
        payment_processor.grant_role(Role::EmergencyAdmin, ctx.accounts.authority.key())?;
        
        // Emit initialization event
        emit!(InitializedEvent {
            admin: ctx.accounts.authority.key(),
            fee_recipient,
            fee_basis_points,
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        Ok(())
    }

    /// Process a payment from customer to merchant
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
        
        // Input validation
        if amount == 0 {
            return Err(ErrorCode::InvalidAmount.into());
        }
        
        // Calculate fee amount with safe math
        let fee_amount = amount
            .checked_mul(payment_processor.fee_basis_points.into())
            .ok_or(ErrorCode::MathOverflow)?
            .checked_div(10000)
            .ok_or(ErrorCode::MathOverflow)?;
            
        let merchant_amount = amount
            .checked_sub(fee_amount)
            .ok_or(ErrorCode::MathOverflow)?;
        
        // Record payment (in a real implementation, this would update state)
        // For now, we'll just emit an event
        emit!(PaymentStarted {
            customer: ctx.accounts.customer.key(),
            merchant: ctx.accounts.merchant.key(),
            amount,
            fee: fee_amount,
            reference,
            timestamp: Clock::get()?.unix_timestamp,
        });

        // Transfer full amount from customer to payment processor
        let transfer_to_processor_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.customer_token_account.to_account_info(),
                to: ctx.accounts.payment_processor_token_account.to_account_info(),
                authority: ctx.accounts.customer.to_account_info(),
            },
        );
        
        token::transfer(transfer_to_processor_ctx, amount)?;

        // Transfer fee to fee recipient
        let seeds = &[
            b"payment_processor".as_ref(),
            &[payment_processor.bump],
        ];
        let signer = &[&seeds[..]];
        let fee_transfer_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.payment_processor_token_account.to_account_info(),
                to: ctx.accounts.fee_recipient_token_account.to_account_info(),
                authority: ctx.accounts.payment_processor.to_account_info(),
            },
            signer,
        );
        
        token::transfer(fee_transfer_ctx, fee_amount)?;

        // Transfer remaining amount to merchant
        let merchant_transfer_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.payment_processor_token_account.to_account_info(),
                to: ctx.accounts.merchant_token_account.to_account_info(),
                authority: ctx.accounts.payment_processor.to_account_info(),
            },
            signer,
        );
        
        token::transfer(merchant_transfer_ctx, merchant_amount)?;

        // Emit payment processed event
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
    
    /// Update fee settings
    pub fn update_fee(
        ctx: Context<UpdateFee>,
        new_fee_basis_points: u16,
    ) -> Result<()> {
        // Check access control
        let payment_processor = &mut ctx.accounts.payment_processor;
        if !payment_processor.has_role(Role::FeeManager, ctx.accounts.authority.key()) {
            return Err(ErrorCode::UnauthorizedAccess.into());
        }
        
        // Input validation
        if new_fee_basis_points > 10000 {
            return Err(ErrorCode::InvalidFeeAmount.into());
        }
        
        // Update fee
        payment_processor.fee_basis_points = new_fee_basis_points;
        
        // Emit event
        emit!(FeeUpdated {
            admin: ctx.accounts.authority.key(),
            new_fee_basis_points,
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        Ok(())
    }
    
    /// Update fee recipient
    pub fn update_fee_recipient(
        ctx: Context<UpdateFeeRecipient>,
        new_fee_recipient: Pubkey,
    ) -> Result<()> {
        // Check access control
        let payment_processor = &mut ctx.accounts.payment_processor;
        if !payment_processor.has_role(Role::Admin, ctx.accounts.authority.key()) {
            return Err(ErrorCode::UnauthorizedAccess.into());
        }
        
        // Update fee recipient
        payment_processor.fee_recipient = new_fee_recipient;
        
        // Emit event
        emit!(FeeRecipientUpdated {
            admin: ctx.accounts.authority.key(),
            new_fee_recipient,
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        Ok(())
    }
    
    /// Emergency pause function
    pub fn pause(ctx: Context<EmergencyAction>) -> Result<()> {
        // Check access control
        let payment_processor = &mut ctx.accounts.payment_processor;
        if !payment_processor.has_role(Role::EmergencyAdmin, ctx.accounts.authority.key()) {
            return Err(ErrorCode::UnauthorizedAccess.into());
        }
        
        // Set paused state
        payment_processor.paused = true;
        
        // Emit event
        emit!(ContractPaused {
            admin: ctx.accounts.authority.key(),
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        Ok(())
    }
    
    /// Emergency unpause function
    pub fn unpause(ctx: Context<EmergencyAction>) -> Result<()> {
        // Check access control
        let payment_processor = &mut ctx.accounts.payment_processor;
        if !payment_processor.has_role(Role::EmergencyAdmin, ctx.accounts.authority.key()) {
            return Err(ErrorCode::UnauthorizedAccess.into());
        }
        
        // Set paused state
        payment_processor.paused = false;
        
        // Emit event
        emit!(ContractUnpaused {
            admin: ctx.accounts.authority.key(),
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        Ok(())
    }
    
    /// Grant a role to an account
    pub fn grant_role(ctx: Context<RoleManagement>, role: u8, account: Pubkey) -> Result<()> {
        // Check access control
        let payment_processor = &mut ctx.accounts.payment_processor;
        if !payment_processor.has_role(Role::Admin, ctx.accounts.authority.key()) {
            return Err(ErrorCode::UnauthorizedAccess.into());
        }
        
        // Grant role
        payment_processor.grant_role(Role::from_u8(role)?, account)?;
        
        // Emit event
        emit!(RoleGranted {
            role,
            account,
            admin: ctx.accounts.authority.key(),
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        Ok(())
    }
    
    /// Revoke a role from an account
    pub fn revoke_role(ctx: Context<RoleManagement>, role: u8, account: Pubkey) -> Result<()> {
        // Check access control
        let payment_processor = &mut ctx.accounts.payment_processor;
        if !payment_processor.has_role(Role::Admin, ctx.accounts.authority.key()) {
            return Err(ErrorCode::UnauthorizedAccess.into());
        }
        
        // Revoke role
        payment_processor.revoke_role(Role::from_u8(role)?, account)?;
        
        // Emit event
        emit!(RoleRevoked {
            role,
            account,
            admin: ctx.accounts.authority.key(),
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    
    #[account(
        init,
        payer = authority,
        space = 8 + PaymentProcessor::SPACE,
        seeds = [b"payment_processor"],
        bump
    )]
    pub payment_processor: Account<'info, PaymentProcessor>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ProcessPayment<'info> {
    pub customer: Signer<'info>,
    pub merchant: AccountInfo<'info>,
    
    #[account(
        mut,
        constraint = customer_token_account.owner == customer.key() @ ErrorCode::InvalidTokenOwner,
    )]
    pub customer_token_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        constraint = payment_processor_token_account.mint == customer_token_account.mint @ ErrorCode::InvalidTokenMint,
        constraint = payment_processor_token_account.owner == payment_processor.key() @ ErrorCode::InvalidTokenOwner,
    )]
    pub payment_processor_token_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        constraint = merchant_token_account.mint == customer_token_account.mint @ ErrorCode::InvalidTokenMint,
        constraint = merchant_token_account.owner == merchant.key() @ ErrorCode::InvalidTokenOwner,
    )]
    pub merchant_token_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        constraint = fee_recipient_token_account.mint == customer_token_account.mint @ ErrorCode::InvalidTokenMint,
        constraint = fee_recipient_token_account.owner == payment_processor.fee_recipient @ ErrorCode::InvalidTokenOwner,
    )]
    pub fee_recipient_token_account: Account<'info, TokenAccount>,
    
    #[account(
        seeds = [b"payment_processor"],
        bump = payment_processor.bump,
    )]
    pub payment_processor: Account<'info, PaymentProcessor>,
    
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct UpdateFee<'info> {
    pub authority: Signer<'info>,
    
    #[account(
        mut,
        seeds = [b"payment_processor"],
        bump = payment_processor.bump,
    )]
    pub payment_processor: Account<'info, PaymentProcessor>,
}

#[derive(Accounts)]
pub struct UpdateFeeRecipient<'info> {
    pub authority: Signer<'info>,
    
    #[account(
        mut,
        seeds = [b"payment_processor"],
        bump = payment_processor.bump,
    )]
    pub payment_processor: Account<'info, PaymentProcessor>,
}

#[derive(Accounts)]
pub struct EmergencyAction<'info> {
    pub authority: Signer<'info>,
    
    #[account(
        mut,
        seeds = [b"payment_processor"],
        bump = payment_processor.bump,
    )]
    pub payment_processor: Account<'info, PaymentProcessor>,
}

#[derive(Accounts)]
pub struct RoleManagement<'info> {
    pub authority: Signer<'info>,
    
    #[account(
        mut,
        seeds = [b"payment_processor"],
        bump = payment_processor.bump,
    )]
    pub payment_processor: Account<'info, PaymentProcessor>,
}

#[account]
pub struct PaymentProcessor {
    pub admin: Pubkey,
    pub fee_recipient: Pubkey,
    pub fee_basis_points: u16,
    pub paused: bool,
    pub version: u8,
    pub bump: u8,
    pub roles: HashMap<Role, Vec<Pubkey>>,
}

impl PaymentProcessor {
    pub const SPACE: usize = 32 + // admin
                             32 + // fee_recipient
                             2 +  // fee_basis_points
                             1 +  // paused
                             1 +  // version
                             1 +  // bump
                             200; // roles (approximate)
    
    pub fn grant_role(&mut self, role: Role, account: Pubkey) -> Result<()> {
        match self.roles.get_mut(&role) {
            Some(accounts) => {
                if !accounts.contains(&account) {
                    accounts.push(account);
                }
            },
            None => {
                self.roles.insert(role, vec![account]);
            }
        }
        
        Ok(())
    }
    
    pub fn revoke_role(&mut self, role: Role, account: Pubkey) -> Result<()> {
        if let Some(accounts) = self.roles.get_mut(&role) {
            accounts.retain(|a| a != &account);
        }
        
        Ok(())
    }
    
    pub fn has_role(&self, role: Role, account: Pubkey) -> bool {
        match self.roles.get(&role) {
            Some(accounts) => accounts.contains(&account),
            None => false,
        }
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq, Hash)]
pub enum Role {
    Admin,
    FeeManager,
    EmergencyAdmin,
}

impl Role {
    pub fn from_u8(value: u8) -> Result<Self> {
        match value {
            0 => Ok(Role::Admin),
            1 => Ok(Role::FeeManager),
            2 => Ok(Role::EmergencyAdmin),
            _ => Err(ErrorCode::InvalidRole.into()),
        }
    }
}

// Events
#[event]
pub struct InitializedEvent {
    pub admin: Pubkey,
    pub fee_recipient: Pubkey,
    pub fee_basis_points: u16,
    pub timestamp: i64,
}

#[event]
pub struct PaymentStarted {
    pub customer: Pubkey,
    pub merchant: Pubkey,
    pub amount: u64,
    pub fee: u64,
    pub reference: Pubkey,
    pub timestamp: i64,
}

#[event]
pub struct PaymentProcessed {
    pub customer: Pubkey,
    pub merchant: Pubkey,
    pub amount: u64,
    pub fee: u64,
    pub reference: Pubkey,
    pub timestamp: i64,
}

#[event]
pub struct FeeUpdated {
    pub admin: Pubkey,
    pub new_fee_basis_points: u16,
    pub timestamp: i64,
}

#[event]
pub struct FeeRecipientUpdated {
    pub admin: Pubkey,
    pub new_fee_recipient: Pubkey,
    pub timestamp: i64,
}

#[event]
pub struct ContractPaused {
    pub admin: Pubkey,
    pub timestamp: i64,
}

#[event]
pub struct ContractUnpaused {
    pub admin: Pubkey,
    pub timestamp: i64,
}

#[event]
pub struct RoleGranted {
    pub role: u8,
    pub account: Pubkey,
    pub admin: Pubkey,
    pub timestamp: i64,
}

#[event]
pub struct RoleRevoked {
    pub role: u8,
    pub account: Pubkey,
    pub admin: Pubkey,
    pub timestamp: i64,
}

// Error codes
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
    #[msg("Math overflow or underflow")]
    MathOverflow,
    #[msg("Invalid role")]
    InvalidRole,
    #[msg("Invalid token owner")]
    InvalidTokenOwner,
    #[msg("Invalid token mint")]
    InvalidTokenMint,
} 