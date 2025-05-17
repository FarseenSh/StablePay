import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Wallet } from "lucide-react";

type StablecoinOption = {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  rate: number;
};

const stablecoinOptions: StablecoinOption[] = [
  { id: 'usdc', name: 'USD Coin', symbol: 'USDC', icon: '💲', rate: 1 },
  { id: 'usdt', name: 'Tether', symbol: 'USDT', icon: '💵', rate: 0.9998 },
  { id: 'pyusd', name: 'PayPal USD', symbol: 'PYUSD', icon: '🔵', rate: 0.9997 },
  { id: 'usd*', name: 'USD*', symbol: 'USD*', icon: '⭐', rate: 1.0003 },
];

const CheckoutDemo = () => {
  const [selectedCoin, setSelectedCoin] = useState(stablecoinOptions[0]);
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);

  const handleSelectCoin = (coin: StablecoinOption) => {
    setSelectedCoin(coin);
  };

  const handleSubmit = () => {
    setStep(2);
  };

  const handleConnect = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setComplete(true);
    }, 2000);
  };

  const totalAmount = 49.99;
  const payAmount = (totalAmount / selectedCoin.rate).toFixed(2);

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
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
        {!complete ? (
          step === 1 ? (
            <div className="animate-fade-in">
              <h3 className="text-lg font-semibold mb-4">Select stablecoin</h3>
              <div className="space-y-2">
                {stablecoinOptions.map((coin) => (
                  <div
                    key={coin.id}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border transition-colors ${
                      selectedCoin.id === coin.id
                        ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-700'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                    }`}
                    onClick={() => handleSelectCoin(coin)}
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-2">{coin.icon}</span>
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
                <Button className="w-full" onClick={handleSubmit}>
                  Continue
                </Button>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              <h3 className="text-lg font-semibold mb-4">Connect your wallet</h3>
              <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-600 dark:text-slate-300">Amount</span>
                  <span className="font-medium font-mono">{payAmount} {selectedCoin.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">Network</span>
                  <span className="font-medium">Solana</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button 
                  className="w-full justify-start"
                  onClick={handleConnect}
                  disabled={processing}
                >
                  <img
                    src="https://phantom.app/favicon.ico"
                    alt="Phantom"
                    className="w-5 h-5 mr-2"
                  />
                  Phantom Wallet
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleConnect}
                  disabled={processing}
                >
                  <img
                    src="https://solflare.com/assets/favicon/favicon-32x32.png"
                    alt="Solflare"
                    className="w-5 h-5 mr-2"
                  />
                  Solflare
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleConnect}
                  disabled={processing}
                >
                  <img
                    src="https://backpack.app/favicon.ico"
                    alt="Backpack"
                    className="w-5 h-5 mr-2"
                  />
                  Backpack
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleConnect}
                  disabled={processing}
                >
                  <img
                    src="https://glow.app/favicon.ico"
                    alt="Glow"
                    className="w-5 h-5 mr-2"
                  />
                  Glow Wallet
                </Button>
              </div>
              
              {processing && (
                <div className="mt-6 text-center animate-pulse-slow">
                  <div className="inline-block p-3 rounded-full bg-primary-50 dark:bg-primary-900/20">
                    <Wallet className="h-6 w-6 text-primary-600 dark:text-primary-400 animate-pulse" />
                  </div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    Waiting for wallet connection...
                  </p>
                </div>
              )}
              
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setStep(1)}
                  disabled={processing}
                >
                  Back
                </Button>
              </div>
            </div>
          )
        ) : (
          <div className="text-center py-6 animate-fade-in">
            <div className="inline-block p-3 rounded-full bg-success-50 dark:bg-success-900/20 mb-4">
              <Check className="h-6 w-6 text-success-500" />
            </div>
            <h3 className="text-xl font-semibold mb-1">Payment Complete!</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              You've successfully paid {payAmount} {selectedCoin.symbol}
            </p>
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-slate-600 dark:text-slate-300">Transaction ID</span>
                <span className="font-mono text-xs">5Gn...8fA3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-300">Status</span>
                <span className="text-success-500 font-medium">Confirmed</span>
              </div>
            </div>
            <Button className="w-full">Return to Merchant</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CheckoutDemo;
