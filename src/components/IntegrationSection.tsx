import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const IntegrationSection = () => {
  const codeExamples = {
    reactJs: `// Install our SDK
npm install @stablepay/react

// Import the StablePay component
import { StablePayButton } from '@stablepay/react';

// Add it to your checkout
const Checkout = () => (
  <div>
    <h2>Complete your purchase</h2>
    <StablePayButton 
      amount={99.99}
      merchantId="your_merchant_id"
      onSuccess={(txId) => console.log(txId)}
    />
  </div>
);`,
    javascript: `// Add our script to your HTML
<script src="https://js.stablepay.com/v1"></script>

// Initialize StablePay in your code
const checkout = new StablePay({
  merchantId: 'your_merchant_id'
});

// Create a payment request
document.getElementById('pay-button').addEventListener('click', async () => {
  const result = await checkout.requestPayment({
    amount: 99.99,
    currency: 'USD',
    orderId: 'order_12345'
  });
  
  if (result.success) {
    console.log('Payment successful!', result.transactionId);
  }
});`,
    nodejs: `// Install our server SDK
npm install @stablepay/node

// Set up in your backend
const express = require('express');
const { StablePay } = require('@stablepay/node');

const app = express();
const stablePay = new StablePay({
  apiKey: process.env.STABLE_API_KEY,
  secretKey: process.env.STABLE_SECRET_KEY
});

// Create payment intent endpoint
app.post('/create-payment', async (req, res) => {
  try {
    const { amount, metadata } = req.body;
    
    const intent = await stablePay.createPaymentIntent({
      amount,
      currency: 'USD',
      metadata
    });
    
    res.json({ clientSecret: intent.clientSecret });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});`,
    shopify: `// Our Shopify app allows you to:
// 1. Install directly from the Shopify App Store
// 2. Configure your StablePay account
// 3. Add crypto payment options to your checkout

// No coding required! Just follow these simple steps:
// 1. Search for "StablePay" in the Shopify App Store
// 2. Click "Add app" and follow the installation flow
// 3. Connect your StablePay account
// 4. Configure your preferred stablecoins
// 5. Start accepting crypto payments!`,
  };

  return (
    <div className="py-12 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Easy Integration</h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Integrate StablePay with just a few lines of code across various platforms.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Start accepting payments in minutes</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="reactJs" className="w-full">
              <TabsList className="mb-4 w-full grid grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="reactJs">React.js</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="nodejs">Node.js</TabsTrigger>
                <TabsTrigger value="shopify">Shopify</TabsTrigger>
              </TabsList>
              
              {Object.entries(codeExamples).map(([key, code]) => (
                <TabsContent key={key} value={key}>
                  <div className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm font-mono">
                      <code>{code}</code>
                    </pre>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-6">Trusted by innovative platforms</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Shopify', 'WooCommerce', 'Magento', 'BigCommerce'].map((platform) => (
              <div 
                key={platform} 
                className="flex items-center justify-center h-16 opacity-60 hover:opacity-100 transition-opacity"
              >
                <div className="text-xl font-semibold text-slate-600 dark:text-slate-300">
                  {platform}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationSection;
