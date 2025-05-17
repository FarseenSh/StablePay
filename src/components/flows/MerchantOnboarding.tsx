import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wallet, ChevronRight, Check, Database, CreditCard } from 'lucide-react';

const steps = [
  "Account Creation",
  "Business Information",
  "Wallet Connection",
  "Settlement Options",
  "Integration Setup",
  "Complete"
];

const MerchantOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    businessName: '',
    businessType: '',
    website: '',
    walletConnected: false,
    settlementCurrency: '',
    integrationMethod: ''
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const connectWallet = () => {
    // Simulate wallet connection
    setTimeout(() => {
      updateFormData('walletConnected', true);
    }, 1500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Create a secure password" 
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                />
              </div>
            </div>
          </>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input 
                id="businessName" 
                placeholder="Your Business Name" 
                value={formData.businessName}
                onChange={(e) => updateFormData('businessName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Select 
                value={formData.businessType} 
                onValueChange={(value) => updateFormData('businessType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="saas">SaaS</SelectItem>
                  <SelectItem value="marketplace">Marketplace</SelectItem>
                  <SelectItem value="nft">NFT Project</SelectItem>
                  <SelectItem value="defi">DeFi Platform</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input 
                id="website" 
                placeholder="https://your-website.com" 
                value={formData.website}
                onChange={(e) => updateFormData('website', e.target.value)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <Wallet className="h-12 w-12 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Connect a wallet to receive payments from your customers.
              </p>
            </div>
            {!formData.walletConnected ? (
              <div className="space-y-3">
                <Button 
                  className="w-full justify-start"
                  onClick={connectWallet}
                >
                  <img
                    src="https://phantom.app/favicon.ico"
                    alt="Phantom"
                    className="w-5 h-5 mr-2"
                  />
                  Phantom Wallet
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={connectWallet}
                >
                  <img
                    src="https://solflare.com/assets/favicon/favicon-32x32.png"
                    alt="Solflare"
                    className="w-5 h-5 mr-2"
                  />
                  Solflare
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={connectWallet}
                >
                  <img
                    src="https://backpack.app/favicon.ico"
                    alt="Backpack"
                    className="w-5 h-5 mr-2"
                  />
                  Backpack
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={connectWallet}
                >
                  <img
                    src="https://glow.app/favicon.ico"
                    alt="Glow"
                    className="w-5 h-5 mr-2"
                  />
                  Glow Wallet
                </Button>
                <div className="pt-2 mt-2 border-t border-slate-200 dark:border-slate-700">
                  <Button 
                    className="w-full" 
                    variant="ghost"
                    onClick={() => handleNext()}
                  >
                    Continue without wallet
                  </Button>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    You can connect your wallet later from the dashboard
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 border border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-900/20 rounded-lg">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                  <span className="text-green-700 dark:text-green-300 font-medium">Wallet Connected</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                  Your wallet has been successfully connected to your account.
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Settlement Currency</Label>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                Choose which currency you'd like to receive payments in
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="usdc" 
                    name="settlement" 
                    className="h-4 w-4 text-primary-600"
                    onChange={() => updateFormData('settlementCurrency', 'usdc')}
                    checked={formData.settlementCurrency === 'usdc'} 
                  />
                  <Label htmlFor="usdc" className="cursor-pointer">
                    <span className="mr-2">💲</span>
                    USDC - USD Coin
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="usdt" 
                    name="settlement" 
                    className="h-4 w-4 text-primary-600"
                    onChange={() => updateFormData('settlementCurrency', 'usdt')}
                    checked={formData.settlementCurrency === 'usdt'} 
                  />
                  <Label htmlFor="usdt" className="cursor-pointer">
                    <span className="mr-2">💵</span>
                    USDT - Tether
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="pyusd" 
                    name="settlement" 
                    className="h-4 w-4 text-primary-600"
                    onChange={() => updateFormData('settlementCurrency', 'pyusd')}
                    checked={formData.settlementCurrency === 'pyusd'} 
                  />
                  <Label htmlFor="pyusd" className="cursor-pointer">
                    <span className="mr-2">🔵</span>
                    PYUSD - PayPal USD
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="usdstar" 
                    name="settlement" 
                    className="h-4 w-4 text-primary-600"
                    onChange={() => updateFormData('settlementCurrency', 'usdstar')}
                    checked={formData.settlementCurrency === 'usdstar'} 
                  />
                  <Label htmlFor="usdstar" className="cursor-pointer">
                    <span className="mr-2">⭐</span>
                    USD* - USD Star
                  </Label>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Integration Method</Label>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                How would you like to integrate StablePay?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.integrationMethod === 'api' 
                      ? 'bg-primary-50 border-primary-200 dark:bg-primary-900/20 dark:border-primary-700'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                  onClick={() => updateFormData('integrationMethod', 'api')}
                >
                  <div className="flex flex-col items-center text-center">
                    <Database className="h-8 w-8 mb-2 text-primary-600" />
                    <h4 className="font-medium">API Integration</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      Full control with our RESTful API
                    </p>
                  </div>
                </div>
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.integrationMethod === 'plugin' 
                      ? 'bg-primary-50 border-primary-200 dark:bg-primary-900/20 dark:border-primary-700'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                  onClick={() => updateFormData('integrationMethod', 'plugin')}
                >
                  <div className="flex flex-col items-center text-center">
                    <CreditCard className="h-8 w-8 mb-2 text-primary-600" />
                    <h4 className="font-medium">Payment Plugin</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      Quick setup with no coding required
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center py-6">
            <div className="inline-block p-4 rounded-full bg-success-100 dark:bg-success-900/20 mb-4">
              <Check className="h-8 w-8 text-success-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Setup Complete!</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Your StablePay merchant account is ready to use.
            </p>
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg mb-6 text-left">
              <div className="flex justify-between mb-2">
                <span className="text-slate-600 dark:text-slate-300">Account Email</span>
                <span className="font-medium">{formData.email || 'your@email.com'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-600 dark:text-slate-300">Business</span>
                <span className="font-medium">{formData.businessName || 'Your Business'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-300">Integration</span>
                <span className="font-medium">{
                  formData.integrationMethod === 'api' 
                    ? 'API Integration' 
                    : formData.integrationMethod === 'plugin' 
                      ? 'Payment Plugin' 
                      : 'Not selected'
                }</span>
              </div>
            </div>
            <a href="/dashboard" className="w-full">
              <Button className="w-full">Go to Dashboard</Button>
            </a>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Merchant Onboarding</CardTitle>
        <CardDescription>
          Set up your StablePay account in just a few steps
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center relative" style={{ top: 0 }}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index < currentStep
                        ? 'bg-primary-600 text-white'
                        : index === currentStep
                        ? 'bg-primary-200 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-medium'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
                  </div>
                  <span className="text-xs mt-1 hidden md:block">
                    {step}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div 
                    className={`flex-grow h-0.5 mx-1 ${
                      index < currentStep ? 'bg-primary-600' : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        {renderStepContent()}
      </CardContent>
      <CardFooter className={`flex ${
        currentStep === 0 ? 'justify-end' : 'justify-between'
      }`}>
        {currentStep > 0 && currentStep < steps.length - 1 && (
          <Button variant="outline" onClick={handlePrevious}>
            Back
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button onClick={handleNext}>
            {currentStep === steps.length - 2 ? 'Finish' : 'Next'}
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MerchantOnboarding;
