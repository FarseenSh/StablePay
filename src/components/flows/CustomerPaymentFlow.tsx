import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Wallet, Loader, ExternalLink, Clock, AlertCircle, Info, ChevronRight, Download, Receipt } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, clusterApiUrl } from '@solana/web3.js';
import { createTransferInstruction } from '@solana/spl-token';
import { pollPaymentStatus } from '@/lib/backend-api';
import { PaymentStatus, PaymentVerificationResult } from '@/types/payment';
import DigitalReceipt from '@/components/DigitalReceipt';

type StablecoinOption = {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  rate: number;
  tokenMintAddress?: string;
};

// For demo purposes, include real token mint addresses on devnet
const stablecoinOptions: StablecoinOption[] = [
  { 
    id: 'usdc', 
    name: 'USD Coin', 
    symbol: 'USDC', 
    icon: '💲', 
    rate: 1,
    // This is the Devnet USDC mint address - would be replaced by real mainnet address in production
    tokenMintAddress: 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr'
  },
  { 
    id: 'usdt', 
    name: 'Tether', 
    symbol: 'USDT', 
    icon: '💵', 
    rate: 0.9998,
    // This is the Devnet USDT mint address - would be replaced by real mainnet address in production
    tokenMintAddress: 'BQcdHdAQW1hczDbBi9hiegXAR7A98Q9jx3X3iBBBDiq4'
  },
  { id: 'pyusd', name: 'PayPal USD', symbol: 'PYUSD', icon: '🔵', rate: 0.9997 },
  { id: 'usd*', name: 'USD*', symbol: 'USD*', icon: '⭐', rate: 1.0003 },
];

// Information about popular wallets for guidance
const walletInfo = [
  {
    name: 'Phantom',
    icon: '/assets/wallets/phantom.ico',
    installUrl: 'https://phantom.app/download',
    description: 'Most popular Solana wallet with browser extension and mobile apps',
    platforms: ['chrome', 'firefox', 'edge', 'ios', 'android']
  },
  {
    name: 'Solflare',
    icon: '/assets/wallets/solflare.png',
    installUrl: 'https://solflare.com/download',
    description: 'Full-featured Solana wallet with staking and NFT support',
    platforms: ['chrome', 'firefox', 'edge', 'ios', 'android']
  },
  {
    name: 'Backpack',
    icon: '/assets/wallets/backpack.png',
    installUrl: 'https://www.backpack.app/download',
    description: 'Multi-chain wallet with xNFT support',
    platforms: ['chrome', 'ios', 'android']
  }
];

// Get recommended wallet based on user's browser/device
const getRecommendedWallet = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const browser = navigator.userAgent.indexOf('Chrome') > -1 ? 'chrome' : 
                 navigator.userAgent.indexOf('Firefox') > -1 ? 'firefox' :
                 navigator.userAgent.indexOf('Edge') > -1 ? 'edge' : 'other';
  
  if (isMobile) {
    return walletInfo.filter(wallet => 
      wallet.platforms.includes('ios') || wallet.platforms.includes('android')
    )[0];
  }
  
  return walletInfo.filter(wallet => wallet.platforms.includes(browser))[0] || walletInfo[0];
};

// Helper component for Blockchain Term tooltips
const InfoTooltip = ({ term, children }: { term: string, children: React.ReactNode }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex items-center cursor-help border-b border-dotted border-slate-400">
          {term}
          <Info className="h-3 w-3 ml-0.5 text-slate-500" />
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs text-xs">
        {children}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

// Pre-load wallet images to prevent loading delays
const preloadImages = () => {
  const images = [
    '/assets/wallets/phantom.ico',
    '/assets/wallets/solflare.png'
  ];
  
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

// Step labels for tooltips
const stepLabels = [
  "Select payment method",
  "Connect wallet",
  "Payment complete"
];

// The merchant wallet address to receive payments - would come from API in real implementation
const MERCHANT_WALLET = 'DcS1dCvnMjzYY3BVQZ7PJnsnTHdkHRVgbBDSgkM1FQLC';

// Helper function to generate Solana Explorer URL
const getSolanaExplorerUrl = (signature: string, cluster: 'devnet' | 'testnet' | 'mainnet-beta' = 'devnet') => {
  const baseUrl = 'https://explorer.solana.com/tx/';
  return `${baseUrl}${signature}${cluster !== 'mainnet-beta' ? `?cluster=${cluster}` : ''}`;
};

const CustomerPaymentFlow = () => {
  const [step, setStep] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState(stablecoinOptions[0]);
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [transactionSignature, setTransactionSignature] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [invalidStepAttempt, setInvalidStepAttempt] = useState<number | null>(null);
  
  // New state for transaction progress tracking
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<PaymentVerificationResult | null>(null);
  const [confirmationProgress, setConfirmationProgress] = useState(0);
  const [isPolling, setIsPolling] = useState(false);
  const [confirmationTimeEstimate, setConfirmationTimeEstimate] = useState<number | null>(null);

  // Solana wallet adapter
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected, wallet } = useWallet();

  const totalAmount = 49.99;
  const payAmount = (totalAmount / selectedCoin.rate).toFixed(2);

  // New state for wallet guidance
  const [showWalletHelp, setShowWalletHelp] = useState(false);
  const [browserWalletDetected, setBrowserWalletDetected] = useState(false);
  const recommendedWallet = getRecommendedWallet();

  // New state for digital receipt
  const [showReceipt, setShowReceipt] = useState(false);

  // Initial load effect
  useEffect(() => {
    // Preload images in parallel with other initialization
    preloadImages();
    setImagesLoaded(true);
    
    // Longer initial loading to ensure smooth first render
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
      setAnimateIn(true);
    }, 300);
    
    return () => clearTimeout(loadTimer);
  }, []);

  // Handle wallet connection status changes
  useEffect(() => {
    // If wallet is connected and we're on the connect step, move to processing
    if (connected && step === 1 && !processing && !complete) {
      handlePayment();
    }
  }, [connected, step]);

  // Animation effect for step transitions - no longer automatically turning off animateIn
  useEffect(() => {
    if (!isLoading) {
      setAnimateIn(true);
    }
  }, [step, isLoading]);

  // Clear invalid step attempt feedback after a delay
  useEffect(() => {
    if (invalidStepAttempt !== null) {
      const timeout = setTimeout(() => {
        setInvalidStepAttempt(null);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [invalidStepAttempt]);

  // Check if wallet extension is already installed
  useEffect(() => {
    const checkForInstalledWallets = () => {
      // Check for Phantom
      const hasPhantom = window.solana && window.solana.isPhantom;
      // Check for Solflare - using optional chaining and checking if property exists
      const hasSolflare = 'solflare' in window && window.solflare !== undefined;
      
      setBrowserWalletDetected(hasPhantom || hasSolflare);
    };
    
    checkForInstalledWallets();
  }, []);

  const handleSelectCoin = (coin: StablecoinOption) => {
    setSelectedCoin(coin);
  };

  // Handle step navigation when dots are clicked
  const handleStepChange = (newStep: number) => {
    // Prevent navigation during processing
    if (processing) return;
    
    // Allow navigation to steps 0 and 1 anytime
    if (newStep <= 1) {
      setAnimateIn(false);
      setTimeout(() => {
        setStep(newStep);
        setAnimateIn(true);
      }, 400);
      return;
    }
    
    // Only allow navigation to step 2 if payment is complete
    if (newStep === 2 && complete) {
      setAnimateIn(false);
      setTimeout(() => {
        setStep(newStep);
        setAnimateIn(true);
      }, 400);
      return;
    }
    
    // If trying to go to step 2 but payment not complete, show feedback
    setInvalidStepAttempt(newStep);
  };

  const handleSubmit = () => {
    setAnimateIn(false);
    setTimeout(() => {
      setStep(1);
      setAnimateIn(true);
    }, 400);
  };

  // New function to handle payment status updates
  const handlePaymentStatusChange = useCallback((status: PaymentVerificationResult) => {
    setVerificationStatus(status);
    
    switch (status.status) {
      case PaymentStatus.COMPLETED:
        setConfirmationProgress(100);
        setProcessing(false);
        setComplete(true);
        setAnimateIn(false);
        setTimeout(() => {
          setStep(2);
          setAnimateIn(true);
        }, 400);
        break;
        
      case PaymentStatus.PENDING:
        // Increment progress by a small amount to show activity
        setConfirmationProgress(prev => Math.min(prev + 10, 90));
        break;
        
      case PaymentStatus.FAILED:
        setProcessing(false);
        setError(status.message || 'Payment failed');
        setConfirmationProgress(0);
        break;
        
      case PaymentStatus.EXPIRED:
        setProcessing(false);
        setError('Payment request expired. Please try again.');
        setConfirmationProgress(0);
        break;
        
      default:
        break;
    }
  }, []);

  // Handle an actual Solana payment
  const handlePayment = useCallback(async () => {
    if (!publicKey || !selectedCoin.tokenMintAddress) {
      setError('Wallet not connected or token not supported');
      return;
    }

    try {
      setProcessing(true);
      setError(null);
      setConfirmationProgress(10);
      setConfirmationTimeEstimate(30); // Estimated seconds for confirmation

      // In a real implementation, this would call your backend to get payment details
      // and create a transaction with proper reference for tracking
      const merchantWallet = new PublicKey(MERCHANT_WALLET);
      
      // For simplicity, we're just transferring SOL here
      // In a real app, you would handle SPL tokens properly based on the selected stablecoin
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: merchantWallet,
          lamports: LAMPORTS_PER_SOL / 100, // 0.01 SOL for testing
        })
      );

      // Add a reference key to the transaction to track this payment
      const reference = new PublicKey(PublicKey.unique());
      const references = [reference];

      // Add reference to transaction
      references.forEach(reference => {
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: reference,
            lamports: 0,
          })
        );
      });

      // Send the transaction
      const signature = await sendTransaction(transaction, connection);
      setTransactionSignature(signature);
      setConfirmationProgress(30);
      
      // Wait for confirmation
      const confirmation = await connection.confirmTransaction(signature, 'confirmed');
      
      if (confirmation.value.err) {
        throw new Error('Transaction failed to confirm');
      }
      
      setConfirmationProgress(60);
      
      // In a real implementation, we would create a payment on the backend and then poll for status
      // For now, we'll simulate this with a timeout
      // Normally, this would be:
      // const payment = await createPaymentRequest({...});
      // setPaymentId(payment.id);
      // Start polling for status updates
      setIsPolling(true);
      
      // Simulate polling with a timeout for this demo
      setTimeout(() => {
        setConfirmationProgress(100);
        setProcessing(false);
        setComplete(true);
        setAnimateIn(false);
        setTimeout(() => {
          setStep(2);
          setAnimateIn(true);
        }, 400);
      }, 2000);
      
      // In a real implementation, we would use the actual pollPaymentStatus function:
      // await pollPaymentStatus(payment.id, handlePaymentStatusChange);
      
    } catch (err: any) {
      setProcessing(false);
      setError(err.message || 'Failed to process payment');
      setConfirmationProgress(0);
      console.error('Payment error:', err);
    }
  }, [publicKey, connection, sendTransaction, selectedCoin, handlePaymentStatusChange]);

  const renderStepIndicator = () => (
    <TooltipProvider>
      <div className="flex justify-center mb-6">
        {[0, 1, 2].map((i) => {
          const isCurrentStep = i === step;
          const isStepAccessible = i <= 1 || (i === 2 && complete);
          const isInvalidAttempt = i === invalidStepAttempt;
          
          return (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <div
                  className={`w-3 h-3 rounded-full mx-2 transition-all duration-500 
                    ${isCurrentStep 
                      ? 'bg-primary-500 scale-110' 
                      : isStepAccessible 
                        ? 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600' 
                        : 'bg-slate-200 dark:bg-slate-700 opacity-60'
                    }
                    ${isInvalidAttempt ? 'animate-pulse bg-red-400 dark:bg-red-600' : ''}
                    ${isStepAccessible ? 'cursor-pointer' : 'cursor-not-allowed'}
                  `}
                  onClick={() => handleStepChange(i)}
                  aria-label={stepLabels[i]}
                  role="button"
                  tabIndex={0}
                  style={{ transform: isCurrentStep ? 'scale(1.2)' : 'scale(1)' }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{stepLabels[i]}</p>
                {i === 2 && !complete && (
                  <p className="text-xs text-red-500">Complete payment first</p>
                )}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );

  // Enhanced loading component with progress indicator for payments in process
  const renderProcessingIndicator = () => {
    if (!processing) return null;
    
    return (
      <div className="mt-4 w-full">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-slate-500 dark:text-slate-400">Transaction progress</span>
          <span className="text-sm font-medium">{confirmationProgress}%</span>
        </div>
        <Progress value={confirmationProgress} className="h-2 mb-2" />
        <div className="flex items-center justify-center text-sm text-slate-500 dark:text-slate-400">
          <Clock className="h-3 w-3 mr-1" />
          <span>
            {confirmationProgress < 100 
              ? 'Confirming on Solana blockchain...' 
              : 'Transaction confirmed!'}
          </span>
        </div>
      </div>
    );
  };

  // Render wallet help guidance
  const renderWalletHelp = () => {
    if (!showWalletHelp) return null;
    
    return (
      <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <h4 className="text-sm font-medium mb-2">Don't have a wallet?</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
          You need a Solana wallet to make crypto payments. We recommend:
        </p>
        
        <div className="space-y-2">
          {walletInfo.map(wallet => (
            <div key={wallet.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src={wallet.icon} 
                  alt={wallet.name} 
                  className="w-5 h-5 mr-2" 
                  onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/20x20?text=W'}
                />
                <div>
                  <p className="text-sm font-medium">{wallet.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{wallet.description.substring(0, 30)}...</p>
                </div>
              </div>
              <a 
                href={wallet.installUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400"
              >
                <Download className="h-3 w-3 mr-1" />
                Install
              </a>
            </div>
          ))}
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full mt-3 text-xs"
          onClick={() => setShowWalletHelp(false)}
        >
          Hide wallet info
        </Button>
      </div>
    );
  };

  // Render the success step with enhanced accessibility
  const renderSuccessStep = () => {
    const now = new Date();
    
    return (
      <div className={`transition-all duration-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex flex-col items-center justify-center py-6">
          <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 mb-4" role="img" aria-label="Success checkmark">
            <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Payment Complete</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-4 text-center">
            Your payment of {payAmount} {selectedCoin.symbol} has been successfully processed.
          </p>
          
          {transactionSignature && (
            <div className="w-full bg-slate-50 dark:bg-slate-800 rounded-lg p-3 mb-4">
              <div className="flex flex-col space-y-3">
                <div>
                  <span className="text-sm text-slate-500 dark:text-slate-400 mb-1">Transaction ID</span>
                  <span className="font-mono text-xs break-all block">{transactionSignature}</span>
                </div>
                
                <a 
                  href={getSolanaExplorerUrl(transactionSignature)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors text-sm font-medium py-2 px-4 rounded-md border border-primary-200 dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                  aria-label="View transaction on Solana Explorer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Solana Explorer
                </a>
              </div>
            </div>
          )}
          
          {/* Digital receipt button */}
          <div className="w-full flex flex-col space-y-2">
            <Button 
              variant="secondary" 
              className="w-full flex items-center justify-center gap-2"
              onClick={() => setShowReceipt(true)}
              aria-label="View payment receipt"
            >
              <Receipt className="h-4 w-4" />
              View Receipt
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.location.reload()}
              aria-label="Make another payment"
            >
              Make Another Payment
            </Button>
          </div>
          
          {/* Digital receipt dialog */}
          <DigitalReceipt 
            open={showReceipt}
            onOpenChange={setShowReceipt}
            paymentData={{
              id: new Date().getTime().toString(), // In a real app, we would use the actual payment ID
              amount: parseFloat(payAmount),
              currency: selectedCoin.symbol,
              status: PaymentStatus.COMPLETED,
              transactionSignature: transactionSignature || undefined,
              merchantName: "Acme Enterprises", // In a real app, this would come from the API
              date: new Date()
            }}
          />
        </div>
      </div>
    );
  };

  // Loading state with longer duration animation
  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto overflow-hidden animate-in fade-in-0 duration-500">
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-90">Payment to</p>
              <p className="font-semibold">Acme Enterprises</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Amount</p>
              <p className="font-semibold">${totalAmount} USD</p>
            </div>
          </div>
        </div>
        <CardContent className="p-5 flex flex-col items-center justify-center py-10">
          <Loader className="h-8 w-8 text-primary-500 animate-spin mb-4" />
          <p className="text-slate-600 dark:text-slate-300">Loading payment options...</p>
        </CardContent>
      </Card>
    );
  }

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className={`transition-all duration-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} 
                role="region"
                aria-label="Select payment method">
            <h3 className="text-lg font-semibold mb-4" id="step-heading-0">Select stablecoin</h3>
            <div className="space-y-2">
              {stablecoinOptions.map((coin) => (
                <div
                  key={coin.id}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border transition-colors duration-300 ${
                    selectedCoin.id === coin.id
                      ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-700'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                  onClick={() => handleSelectCoin(coin)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSelectCoin(coin);
                      e.preventDefault();
                    }
                  }}
                  tabIndex={0}
                  role="radio"
                  aria-checked={selectedCoin.id === coin.id}
                  aria-label={`Select ${coin.name}`}
                >
                  <div className="flex items-center">
                    <span className="text-xl mr-2" role="img" aria-hidden="true">{coin.icon}</span>
                    <div>
                      <p className="font-medium">{coin.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{coin.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono">{(totalAmount / coin.rate).toFixed(2)}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      1 {coin.symbol} ≈ ${coin.rate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button 
                className="w-full" 
                onClick={handleSubmit}
                aria-label="Continue to wallet connection"
              >
                Continue
              </Button>
            </div>
          </div>
        );
      case 1:
        return (
          <div className={`transition-all duration-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h3 className="text-lg font-semibold mb-4">Connect your wallet</h3>
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-500 dark:text-slate-400">Amount</span>
                <span className="font-medium">{payAmount} {selectedCoin.symbol}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Reference</span>
                <span className="font-mono text-xs text-slate-600 dark:text-slate-300">
                  {publicKey ? publicKey.toString().slice(0, 10) + '...' : 'Connect wallet'}
                </span>
              </div>
              
              {/* Add explanation about the process */}
              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  You're paying with <InfoTooltip term="Solana">A high-performance blockchain with fast transactions and low fees.</InfoTooltip> using <InfoTooltip term={selectedCoin.name}>{`${selectedCoin.name} (${selectedCoin.symbol}) is a stablecoin pegged to the US Dollar on the Solana blockchain.`}</InfoTooltip>
                </p>
              </div>
            </div>
            
            <div className="text-center mb-5">
              <div className="flex flex-col items-center justify-center space-y-4">
                {/* Show context-aware wallet connection button */}
                {!connected && (
                  <div className="flex flex-col items-center w-full">
                    <p className="text-sm mb-2">Connect your Solana wallet to continue</p>
                    <WalletMultiButton className="wallet-adapter-button-custom" />
                    
                    {!browserWalletDetected && !showWalletHelp && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-2 text-xs"
                        onClick={() => setShowWalletHelp(true)}
                      >
                        Need a wallet?
                      </Button>
                    )}
                    
                    {renderWalletHelp()}
                  </div>
                )}
                
                {connected && (
                  <div className="flex items-center text-green-600 dark:text-green-500 mb-2">
                    <Check className="h-4 w-4 mr-1" />
                    <span>Wallet connected</span>
                  </div>
                )}
                
                {error && (
                  <div className="text-red-500 text-sm mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
            
                {processing && (
                  <div className="flex items-center justify-center mt-4">
                    <Loader className="h-5 w-5 text-primary-500 animate-spin mr-2" />
                    <span>Processing payment...</span>
                  </div>
                )}
                
                {renderProcessingIndicator()}
              </div>
            </div>
            
            <div className="text-xs text-slate-500 dark:text-slate-400 text-center border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
              <p className="mb-2">Need help? Here's what happens next:</p>
              <ol className="text-left list-decimal list-inside space-y-1">
                <li>Your wallet will ask you to approve this transaction</li>
                <li>The payment will be processed on the Solana blockchain</li>
                <li>You'll receive confirmation once the payment is complete</li>
              </ol>
            </div>
          </div>
        );
      case 2:
        return renderSuccessStep();
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden" role="application" aria-label="Payment flow">
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-4 text-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90">Payment to</p>
            <p className="font-semibold">Acme Enterprises</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Amount</p>
            <p className="font-semibold">${totalAmount} USD</p>
          </div>
        </div>
      </div>
      <CardContent className="p-5">
        {renderStepIndicator()}
        {renderStepContent()}
      </CardContent>
    </Card>
  );
};

export default CustomerPaymentFlow;
