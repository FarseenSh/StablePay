
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const tiers = [
  {
    name: 'Free',
    description: 'Essential features to get started',
    price: {
      monthly: '$0',
      yearly: '$0',
    },
    features: [
      'Up to $20,000 processing/month',
      'Basic analytics dashboard',
      '2% settlement fee',
      'Standard support',
      '1 user account',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'Perfect for growing businesses',
    price: {
      monthly: '$49',
      yearly: '$39',
    },
    features: [
      'Up to $100,000 processing/month',
      'Advanced analytics & reporting',
      '1% settlement fee',
      'Priority support',
      'Multi-user accounts',
      'Custom checkout branding',
      'Webhooks & advanced API access',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For high-volume businesses',
    price: {
      monthly: 'Custom',
      yearly: 'Custom',
    },
    features: [
      'Unlimited processing volume',
      'Custom analytics solutions',
      'Customizable settlement fee',
      'Dedicated account manager',
      'Unlimited user accounts',
      'White-labeled checkout',
      'Custom integrations',
      'SLA & premium support',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const PricingSection: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = React.useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="py-12 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Choose the plan that's right for your business, with no hidden fees or surprises.
        </p>
        
        <div className="flex items-center justify-center mt-8 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg max-w-xs mx-auto">
          <button
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              billingPeriod === 'monthly'
                ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600 dark:text-primary-400'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            onClick={() => setBillingPeriod('monthly')}
          >
            Monthly
          </button>
          <button
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              billingPeriod === 'yearly'
                ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600 dark:text-primary-400'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            onClick={() => setBillingPeriod('yearly')}
          >
            Yearly <span className="text-xs text-accent-500">Save 20%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={`flex flex-col ${
              tier.popular
                ? 'border-primary-600/30 dark:border-primary-400/30 shadow-lg relative'
                : ''
            }`}
          >
            {tier.popular && (
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Popular
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {billingPeriod === 'monthly' ? tier.price.monthly : tier.price.yearly}
                </span>
                {tier.price.monthly !== 'Custom' && (
                  <span className="text-slate-500 dark:text-slate-400 ml-2">/month</span>
                )}
              </div>

              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-success-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${
                  tier.popular
                    ? 'bg-primary-600 hover:bg-primary-700'
                    : tier.name === 'Enterprise'
                    ? 'bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50'
                    : ''
                }`}
                variant={tier.name === 'Enterprise' ? 'outline' : 'default'}
              >
                {tier.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
