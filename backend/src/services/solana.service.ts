import { 
  Connection, 
  Keypair, 
  PublicKey, 
  Transaction,
  SystemProgram, 
  TransactionInstruction,
  sendAndConfirmTransaction,
  TransactionSignature
} from '@solana/web3.js';
import { 
  TOKEN_PROGRAM_ID, 
  createTransferInstruction,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction
} from '@solana/spl-token';
import * as anchor from '@project-serum/anchor';
import * as fs from 'fs';
import * as path from 'path';
import { Buffer } from 'buffer';
import config from '../config';
import logger from '../utils/logger';

/**
 * Service for interacting with the Solana blockchain
 */
export class SolanaService {
  private connection: Connection;
  private paymentProcessorProgramId: PublicKey;
  private paymentProcessorPda!: PublicKey;
  private paymentProcessorBump!: number;
  private payer!: Keypair;

  constructor() {
    // Initialize Solana connection
    this.connection = new Connection(config.solana.rpcUrl, 'confirmed');
    
    // Set program ID from config or use default
    this.paymentProcessorProgramId = new PublicKey(
      config.solana.programId
    );
    
    // Load or create keypair for sending transactions
    this.initializeKeypair();
    
    // Derive payment processor PDA
    this.deriveProgramAddresses();
  }

  /**
   * Initialize the keypair for sending transactions
   */
  private initializeKeypair() {
    try {
      // Check if private key is provided in env
      if (config.solana.privateKey) {
        const secretKey = Buffer.from(config.solana.privateKey, 'hex');
        this.payer = Keypair.fromSecretKey(secretKey);
        logger.info('Loaded keypair from environment variable');
        return;
      }

      // Check if keypair file exists in default location
      const keypairPath = path.resolve(
        process.env.HOME || process.env.USERPROFILE || '.',
        '.config',
        'solana',
        'id.json'
      );
      
      if (fs.existsSync(keypairPath)) {
        const keypairData = fs.readFileSync(keypairPath, 'utf-8');
        const secretKey = Uint8Array.from(JSON.parse(keypairData));
        this.payer = Keypair.fromSecretKey(secretKey);
        logger.info('Loaded keypair from Solana config');
        return;
      }

      // Generate a new keypair as fallback
      this.payer = Keypair.generate();
      logger.warn('Generated new keypair. This should be replaced in production!');
    } catch (error: any) {
      logger.error(`Failed to initialize keypair: ${error.message}`);
      // Generate a fallback keypair for development
      this.payer = Keypair.generate();
    }
  }

  /**
   * Derive program addresses
   */
  private deriveProgramAddresses() {
    // Derive payment processor PDA
    const [pda, bump] = PublicKey.findProgramAddressSync(
      [Buffer.from('payment_processor')],
      this.paymentProcessorProgramId
    );
    
    this.paymentProcessorPda = pda;
    this.paymentProcessorBump = bump;
    
    logger.info(`Payment processor PDA: ${pda.toBase58()}`);
  }

  /**
   * Get wallet balance
   */
  async getBalance(publicKey: string): Promise<number> {
    try {
      const balance = await this.connection.getBalance(new PublicKey(publicKey));
      return balance / 10 ** 9; // Convert lamports to SOL
    } catch (error: any) {
      logger.error(`Failed to get balance: ${error.message}`);
      throw new Error(`Failed to get balance: ${error.message}`);
    }
  }

  /**
   * Get token balance for a wallet
   */
  async getTokenBalance(wallet: string, tokenMint: string): Promise<number> {
    try {
      const walletPubkey = new PublicKey(wallet);
      const tokenMintPubkey = new PublicKey(tokenMint);
      
      // Get associated token account
      const tokenAccount = await getAssociatedTokenAddress(
        tokenMintPubkey,
        walletPubkey
      );
      
      // Check if token account exists
      const accountInfo = await this.connection.getAccountInfo(tokenAccount);
      if (!accountInfo) {
        return 0;
      }
      
      // Get token balance
      const balance = await this.connection.getTokenAccountBalance(tokenAccount);
      return Number(balance.value.uiAmount);
    } catch (error: any) {
      logger.error(`Failed to get token balance: ${error.message}`);
      throw new Error(`Failed to get token balance: ${error.message}`);
    }
  }

  /**
   * Process a payment using the payment processor contract
   */
  async processPayment(
    customerWallet: string,
    merchantWallet: string,
    tokenMint: string,
    amount: number,
    reference: string
  ): Promise<TransactionSignature> {
    try {
      // Make sure amount is positive
      if (amount <= 0) {
        throw new Error('Amount must be greater than zero');
      }
      
      // Parse public keys
      const customerPubkey = new PublicKey(customerWallet);
      const merchantPubkey = new PublicKey(merchantWallet);
      const tokenMintPubkey = new PublicKey(tokenMint);
      const referencePubkey = new PublicKey(reference);
      
      // Get associated token accounts
      const customerTokenAccount = await getAssociatedTokenAddress(
        tokenMintPubkey,
        customerPubkey
      );
      
      const merchantTokenAccount = await getAssociatedTokenAddress(
        tokenMintPubkey,
        merchantPubkey
      );
      
      const paymentProcessorTokenAccount = await getAssociatedTokenAddress(
        tokenMintPubkey,
        this.paymentProcessorPda,
        true // Allow PDA as owner
      );
      
      // Get fee recipient pubkey from the program
      const program = await this.loadPaymentProcessorProgram();
      const paymentProcessor = await program.account.paymentProcessor.fetch(this.paymentProcessorPda);
      const feeRecipientPubkey = paymentProcessor.feeRecipient;
      
      // Get fee recipient token account
      const feeRecipientTokenAccount = await getAssociatedTokenAddress(
        tokenMintPubkey,
        feeRecipientPubkey
      );
      
      // Check if merchant token account exists and create if needed
      const merchantTokenAccountInfo = await this.connection.getAccountInfo(merchantTokenAccount);
      let transaction = new Transaction();
      
      if (!merchantTokenAccountInfo) {
        // Create associated token account for merchant
        transaction.add(
          createAssociatedTokenAccountInstruction(
            this.payer.publicKey,
            merchantTokenAccount,
            merchantPubkey,
            tokenMintPubkey
          )
        );
      }
      
      // Convert amount to raw value (multiply by 10^decimals)
      // Assuming 6 decimals (like USDC)
      const rawAmount = Math.floor(amount * 10 ** 6);
      
      // Add payment processing instruction
      transaction.add(
        program.instruction.processPayment(
          new anchor.BN(rawAmount),
          referencePubkey,
          null, // no memo
          {
            accounts: {
              customer: customerPubkey,
              merchant: merchantPubkey,
              customerTokenAccount,
              paymentProcessorTokenAccount,
              merchantTokenAccount,
              feeRecipientTokenAccount,
              paymentProcessor: this.paymentProcessorPda,
              tokenProgram: TOKEN_PROGRAM_ID,
            },
          }
        )
      );
      
      // Send transaction
      const { blockhash } = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = this.payer.publicKey;
      
      // Note: In production, the customer's wallet would sign this transaction client-side
      // For our backend service, we're providing this method for reference and testing
      
      const signature = await sendAndConfirmTransaction(
        this.connection,
        transaction,
        [this.payer] // In a real app, the customer would sign
      );
      
      logger.info(`Payment processed: ${signature}`);
      return signature;
    } catch (error: any) {
      logger.error(`Failed to process payment: ${error.message}`);
      throw new Error(`Failed to process payment: ${error.message}`);
    }
  }

  /**
   * Verify payment by reference
   */
  async verifyPaymentByReference(reference: string): Promise<boolean> {
    try {
      const referencePubkey = new PublicKey(reference);
      
      // Find signatures for address
      const signatureInfo = await this.connection.getSignaturesForAddress(referencePubkey);
      
      if (signatureInfo.length === 0) {
        return false;
      }
      
      // Get the most recent signature
      const signature = signatureInfo[0].signature;
      
      // Get transaction
      const transaction = await this.connection.getTransaction(signature, {
        commitment: 'confirmed',
      });
      
      if (!transaction) {
        return false;
      }
      
      // Check if transaction was successful
      return transaction.meta && !transaction.meta.err;
    } catch (error: any) {
      logger.error(`Failed to verify payment: ${error.message}`);
      return false;
    }
  }

  /**
   * Load the payment processor program
   */
  private async loadPaymentProcessorProgram() {
    try {
      // Initialize provider
      const provider = new anchor.AnchorProvider(
        this.connection,
        new anchor.Wallet(this.payer),
        { commitment: 'confirmed' }
      );
      
      // Load IDL from file
      const idlPath = path.resolve(__dirname, '../../anchor/target/idl/perenapay.json');
      
      let idl;
      if (fs.existsSync(idlPath)) {
        const idlFile = fs.readFileSync(idlPath, 'utf-8');
        idl = JSON.parse(idlFile);
      } else {
        // Fetch IDL from chain as fallback
        idl = await anchor.Program.fetchIdl(this.paymentProcessorProgramId, provider);
        
        if (!idl) {
          throw new Error('Failed to load IDL');
        }
      }
      
      // Initialize program
      return new anchor.Program(idl, this.paymentProcessorProgramId, provider);
    } catch (error: any) {
      logger.error(`Failed to load payment processor program: ${error.message}`);
      throw new Error(`Failed to load payment processor program: ${error.message}`);
    }
  }

  /**
   * Get connection info
   */
  getConnectionInfo() {
    return {
      endpoint: this.connection.rpcEndpoint,
      programId: this.paymentProcessorProgramId.toBase58(),
      paymentProcessorPda: this.paymentProcessorPda.toBase58(),
    };
  }

  /**
   * Get signatures for address
   */
  async getSignaturesForAddress(pubkey: PublicKey) {
    try {
      return await this.connection.getSignaturesForAddress(pubkey);
    } catch (error: any) {
      logger.error(`Failed to get signatures for address: ${error.message}`);
      throw new Error(`Failed to get signatures for address: ${error.message}`);
    }
  }
}

export const solanaService = new SolanaService(); 