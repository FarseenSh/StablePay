import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Keypair, PublicKey, Connection, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, Token } from '@solana/spl-token';
import { assert } from 'chai';
import { Perenapay } from '../target/types/perenapay';

describe('perenapay', () => {
  // Configure the client to use the local cluster
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Perenapay as Program<Perenapay>;
  
  // Test wallets
  const admin = Keypair.generate();
  const customer = Keypair.generate();
  const merchant = Keypair.generate();
  const unauthorizedUser = Keypair.generate();
  
  // Test tokens
  let mint: Token;
  let customerTokenAccount: PublicKey;
  let merchantTokenAccount: PublicKey;
  let feeRecipientTokenAccount: PublicKey;
  let paymentProcessorTokenAccount: PublicKey;
  
  // PDAs
  let paymentProcessorPDA: PublicKey;
  let paymentProcessorBump: number;
  
  // Constants
  const feeBasisPoints = 250; // 2.5%
  const feeRecipient = Keypair.generate().publicKey;
  
  before(async () => {
    // Airdrop SOL to test wallets
    const connection = provider.connection;
    
    await connection.confirmTransaction(
      await connection.requestAirdrop(admin.publicKey, 10 * LAMPORTS_PER_SOL)
    );
    
    await connection.confirmTransaction(
      await connection.requestAirdrop(customer.publicKey, 10 * LAMPORTS_PER_SOL)
    );
    
    await connection.confirmTransaction(
      await connection.requestAirdrop(merchant.publicKey, LAMPORTS_PER_SOL)
    );
    
    // Create test token
    mint = await Token.createMint(
      connection,
      admin,
      admin.publicKey,
      null,
      6, // 6 decimals like USDC
      TOKEN_PROGRAM_ID
    );
    
    // Create token accounts
    customerTokenAccount = await mint.createAccount(customer.publicKey);
    merchantTokenAccount = await mint.createAccount(merchant.publicKey);
    feeRecipientTokenAccount = await mint.createAccount(feeRecipient);
    
    // Mint some tokens to customer for testing
    await mint.mintTo(
      customerTokenAccount,
      admin,
      [],
      1000_000_000 // 1000 tokens with 6 decimal places
    );
    
    // Find payment processor PDA
    [paymentProcessorPDA, paymentProcessorBump] = await PublicKey.findProgramAddress(
      [Buffer.from("payment_processor")],
      program.programId
    );
    
    // Create token account for payment processor
    paymentProcessorTokenAccount = await mint.createAccount(paymentProcessorPDA);
  });
  
  it('Initializes the payment processor', async () => {
    // Initialize payment processor
    await program.methods
      .initialize(feeBasisPoints, feeRecipient)
      .accounts({
        authority: admin.publicKey,
        paymentProcessor: paymentProcessorPDA,
        systemProgram: SystemProgram.programId,
      })
      .signers([admin])
      .rpc();
    
    // Fetch the payment processor account
    const paymentProcessor = await program.account.paymentProcessor.fetch(paymentProcessorPDA);
    
    // Verify initialization
    assert.equal(paymentProcessor.admin.toString(), admin.publicKey.toString());
    assert.equal(paymentProcessor.feeRecipient.toString(), feeRecipient.toString());
    assert.equal(paymentProcessor.feeBasisPoints, feeBasisPoints);
    assert.equal(paymentProcessor.paused, false);
    assert.equal(paymentProcessor.version, 1);
    assert.equal(paymentProcessor.bump, paymentProcessorBump);
  });

  it('Processes a payment correctly', async () => {
    const paymentAmount = 100_000_000; // 100 tokens
    const reference = Keypair.generate().publicKey;
    
    // Check balances before payment
    const customerBalanceBefore = (await mint.getAccountInfo(customerTokenAccount)).amount.toNumber();
    const merchantBalanceBefore = (await mint.getAccountInfo(merchantTokenAccount)).amount.toNumber();
    const feeRecipientBalanceBefore = (await mint.getAccountInfo(feeRecipientTokenAccount)).amount.toNumber();
    
    // Calculate expected fee and merchant amount
    const expectedFee = Math.floor(paymentAmount * feeBasisPoints / 10000);
    const expectedMerchantAmount = paymentAmount - expectedFee;
    
    // Process payment
    await program.methods
      .processPayment(
        new anchor.BN(paymentAmount),
        reference,
        null // no memo
      )
      .accounts({
        customer: customer.publicKey,
        merchant: merchant.publicKey,
        customerTokenAccount: customerTokenAccount,
        paymentProcessorTokenAccount: paymentProcessorTokenAccount,
        merchantTokenAccount: merchantTokenAccount,
        feeRecipientTokenAccount: feeRecipientTokenAccount,
        paymentProcessor: paymentProcessorPDA,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .signers([customer])
      .rpc();
    
    // Check balances after payment
    const customerBalanceAfter = (await mint.getAccountInfo(customerTokenAccount)).amount.toNumber();
    const merchantBalanceAfter = (await mint.getAccountInfo(merchantTokenAccount)).amount.toNumber();
    const feeRecipientBalanceAfter = (await mint.getAccountInfo(feeRecipientTokenAccount)).amount.toNumber();
    
    // Verify correct token transfers
    assert.equal(customerBalanceBefore - customerBalanceAfter, paymentAmount);
    assert.equal(merchantBalanceAfter - merchantBalanceBefore, expectedMerchantAmount);
    assert.equal(feeRecipientBalanceAfter - feeRecipientBalanceBefore, expectedFee);
  });

  it('Updates fee basis points', async () => {
    const newFeeBasisPoints = 300; // 3%
    
    // Update fee
    await program.methods
      .updateFee(newFeeBasisPoints)
      .accounts({
        authority: admin.publicKey,
        paymentProcessor: paymentProcessorPDA,
      })
      .signers([admin])
      .rpc();
    
    // Fetch the updated payment processor account
    const paymentProcessor = await program.account.paymentProcessor.fetch(paymentProcessorPDA);
    
    // Verify fee update
    assert.equal(paymentProcessor.feeBasisPoints, newFeeBasisPoints);
  });

  it('Updates fee recipient', async () => {
    const newFeeRecipient = Keypair.generate().publicKey;
    
    // Update fee recipient
    await program.methods
      .updateFeeRecipient(newFeeRecipient)
      .accounts({
        authority: admin.publicKey,
        paymentProcessor: paymentProcessorPDA,
      })
      .signers([admin])
      .rpc();
    
    // Fetch the updated payment processor account
    const paymentProcessor = await program.account.paymentProcessor.fetch(paymentProcessorPDA);
    
    // Verify fee recipient update
    assert.equal(paymentProcessor.feeRecipient.toString(), newFeeRecipient.toString());
  });

  it('Pauses and unpauses the contract', async () => {
    // Pause the contract
    await program.methods
      .pause()
      .accounts({
        authority: admin.publicKey,
        paymentProcessor: paymentProcessorPDA,
      })
      .signers([admin])
      .rpc();
    
    // Verify paused state
    let paymentProcessor = await program.account.paymentProcessor.fetch(paymentProcessorPDA);
    assert.equal(paymentProcessor.paused, true);
    
    // Try to process a payment while paused (should fail)
    const paymentAmount = 10_000_000;
    const reference = Keypair.generate().publicKey;
    
    try {
      await program.methods
        .processPayment(
          new anchor.BN(paymentAmount),
          reference,
          null // no memo
        )
        .accounts({
          customer: customer.publicKey,
          merchant: merchant.publicKey,
          customerTokenAccount: customerTokenAccount,
          paymentProcessorTokenAccount: paymentProcessorTokenAccount,
          merchantTokenAccount: merchantTokenAccount,
          feeRecipientTokenAccount: feeRecipientTokenAccount,
          paymentProcessor: paymentProcessorPDA,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .signers([customer])
        .rpc();
      
      assert.fail("Expected transaction to fail when contract is paused");
    } catch (error) {
      // Expected to fail
      assert.include(error.toString(), "ContractPaused");
    }
    
    // Unpause the contract
    await program.methods
      .unpause()
      .accounts({
        authority: admin.publicKey,
        paymentProcessor: paymentProcessorPDA,
      })
      .signers([admin])
      .rpc();
    
    // Verify unpaused state
    paymentProcessor = await program.account.paymentProcessor.fetch(paymentProcessorPDA);
    assert.equal(paymentProcessor.paused, false);
  });

  it('Grants and revokes roles correctly', async () => {
    const newFeeManager = Keypair.generate().publicKey;
    const roleId = 1; // FeeManager role
    
    // Grant role
    await program.methods
      .grantRole(roleId, newFeeManager)
      .accounts({
        authority: admin.publicKey,
        paymentProcessor: paymentProcessorPDA,
      })
      .signers([admin])
      .rpc();
    
    // Verify role was granted (indirectly by testing functionality)
    // Create a new keypair that has the FeeManager role
    const feeManagerKeypair = Keypair.generate();
    
    // Airdrop SOL to fee manager
    await provider.connection.confirmTransaction(
      await provider.connection.requestAirdrop(feeManagerKeypair.publicKey, LAMPORTS_PER_SOL)
    );
    
    // Grant fee manager role to the new keypair
    await program.methods
      .grantRole(roleId, feeManagerKeypair.publicKey)
      .accounts({
        authority: admin.publicKey,
        paymentProcessor: paymentProcessorPDA,
      })
      .signers([admin])
      .rpc();
    
    // Test that the fee manager can update fees
    const testFeeBasisPoints = 350; // 3.5%
    
    await program.methods
      .updateFee(testFeeBasisPoints)
      .accounts({
        authority: feeManagerKeypair.publicKey,
        paymentProcessor: paymentProcessorPDA,
      })
      .signers([feeManagerKeypair])
      .rpc();
    
    // Verify fee update
    let paymentProcessor = await program.account.paymentProcessor.fetch(paymentProcessorPDA);
    assert.equal(paymentProcessor.feeBasisPoints, testFeeBasisPoints);
    
    // Revoke role
    await program.methods
      .revokeRole(roleId, feeManagerKeypair.publicKey)
      .accounts({
        authority: admin.publicKey,
        paymentProcessor: paymentProcessorPDA,
      })
      .signers([admin])
      .rpc();
    
    // Verify role was revoked (should fail to update fee)
    try {
      await program.methods
        .updateFee(400)
        .accounts({
          authority: feeManagerKeypair.publicKey,
          paymentProcessor: paymentProcessorPDA,
        })
        .signers([feeManagerKeypair])
        .rpc();
      
      assert.fail("Expected transaction to fail after role revocation");
    } catch (error) {
      // Expected to fail
      assert.include(error.toString(), "UnauthorizedAccess");
    }
  });

  it('Enforces access control', async () => {
    // Try to update fee with unauthorized user
    try {
      await program.methods
        .updateFee(500)
        .accounts({
          authority: unauthorizedUser.publicKey,
          paymentProcessor: paymentProcessorPDA,
        })
        .signers([unauthorizedUser])
        .rpc();
      
      assert.fail("Expected transaction to fail with unauthorized user");
    } catch (error) {
      // Expected to fail
      assert.include(error.toString(), "UnauthorizedAccess");
    }
    
    // Try to pause with unauthorized user
    try {
      await program.methods
        .pause()
        .accounts({
          authority: unauthorizedUser.publicKey,
          paymentProcessor: paymentProcessorPDA,
        })
        .signers([unauthorizedUser])
        .rpc();
      
      assert.fail("Expected transaction to fail with unauthorized user");
    } catch (error) {
      // Expected to fail
      assert.include(error.toString(), "UnauthorizedAccess");
    }
  });

  it('Validates fee basis points', async () => {
    // Try to set fee basis points above max (10000)
    try {
      await program.methods
        .updateFee(11000)
        .accounts({
          authority: admin.publicKey,
          paymentProcessor: paymentProcessorPDA,
        })
        .signers([admin])
        .rpc();
      
      assert.fail("Expected transaction to fail with invalid fee amount");
    } catch (error) {
      // Expected to fail
      assert.include(error.toString(), "InvalidFeeAmount");
    }
  });
}); 