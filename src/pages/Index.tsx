
import React from 'react';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeatureCard from '@/components/FeatureCard';
import TestimonialCard from '@/components/TestimonialCard';
import PricingSection from '@/components/PricingSection';
import IntegrationSection from '@/components/IntegrationSection';
import CheckoutDemo from '@/components/CheckoutDemo';
import DashboardDemo from '@/components/DashboardDemo';
import { CreditCard, BarChart3, Lock, Zap, ArrowRight, Globe, Coins } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="gradient-text">Enterprise-grade</span> stablecoin payments on Solana
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-lg mx-auto lg:mx-0">
                  Accept multiple stablecoins, generate yield on your treasury, and build better financial experiences for your customers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="gap-2">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Book a Demo
                  </Button>
                </div>
                <div className="mt-8 text-sm text-slate-500 dark:text-slate-400">
                  Trusted by 500+ merchants & developers worldwide
                </div>
              </div>
              
              <div className="lg:w-1/2 lg:pl-12">
                <div className="relative">
                  <div className="bg-gradient-to-r from-primary-100/40 to-secondary-100/40 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg p-1">
                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden">
                      <CheckoutDemo />
                    </div>
                  </div>
                  <div className="absolute -z-10 top-1/2 -left-4 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl" />
                  <div className="absolute -z-10 bottom-1/2 -right-4 w-32 h-32 bg-secondary-500/10 rounded-full blur-2xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-slate-50 dark:bg-slate-900/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Payment Features</h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Everything you need to accept crypto payments and manage your treasury effectively.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                title="Multi-Stablecoin Support"
                description="Accept payments in USDC, USDT, DAI, and more - all automatically settled at the best available rates."
                icon={<Coins className="h-6 w-6" />}
              />
              <FeatureCard
                title="Yield Generation"
                description="Automatically generate yield on your stablecoin balance through Perena's integrated yield strategies."
                icon={<BarChart3 className="h-6 w-6" />}
              />
              <FeatureCard
                title="Enterprise Security"
                description="Bank-grade security standards with fully audited smart contracts and comprehensive risk management."
                icon={<Lock className="h-6 w-6" />}
              />
              <FeatureCard
                title="Lightning Fast"
                description="Instant transactions on Solana's high-performance blockchain with sub-second confirmation times."
                icon={<Zap className="h-6 w-6" />}
              />
              <FeatureCard
                title="Global Coverage"
                description="Accept payments from customers worldwide without geographic restrictions or cross-border fees."
                icon={<Globe className="h-6 w-6" />}
              />
              <FeatureCard
                title="Seamless Checkouts"
                description="Beautiful, customizable payment flows that integrate seamlessly into your existing website or app."
                icon={<CreditCard className="h-6 w-6" />}
              />
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Merchant Dashboard</h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Complete visibility into your payments, balances, and yield generation.
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary-100/40 to-secondary-100/40 dark:from-primary-900/20 dark:to-secondary-900/20 p-2 rounded-lg">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-lg overflow-x-auto">
                <DashboardDemo />
              </div>
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section id="integrations" className="bg-slate-50 dark:bg-slate-900/50">
          <div className="container px-4 md:px-6">
            <IntegrationSection />
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Trusted by businesses and developers worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TestimonialCard
                quote="PerenaPay transformed our checkout experience. We've seen a 30% increase in international sales now that we can accept stablecoins globally."
                author="Sarah Johnson"
                role="CEO"
                company="NeoMarket"
              />
              <TestimonialCard
                quote="The yield generation feature is a game-changer. Our treasury is working for us, generating returns without any extra effort on our part."
                author="Alex Rodriguez"
                role="CFO"
                company="Digital Frontiers"
              />
              <TestimonialCard
                quote="Integration was shockingly easy. We had stablecoin payments up and running on our platform in less than a day. The documentation is excellent."
                author="Michelle Lee"
                role="CTO"
                company="TechWave Solutions"
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="bg-slate-50 dark:bg-slate-900/50">
          <div className="container px-4 md:px-6">
            <PricingSection />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
              Join the future of payments today and start accepting stablecoins on your platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                Create Free Account
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
        
        {/* Documentation Preview Section */}
        <section id="documentation" className="bg-slate-50 dark:bg-slate-900/50 py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Documentation</h2>
                <p className="text-xl text-slate-600 dark:text-slate-300">
                  Everything you need to integrate and customize PerenaPay for your platform.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">Quick Start Guides</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Get up and running in minutes with our step-by-step tutorials.
                  </p>
                  <Button variant="link" className="pl-0 text-primary-600 dark:text-primary-400">
                    View Guides <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">API Reference</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Detailed documentation for our REST API and SDKs.
                  </p>
                  <Button variant="link" className="pl-0 text-primary-600 dark:text-primary-400">
                    Explore API <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">Example Projects</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Sample implementations across different frameworks and platforms.
                  </p>
                  <Button variant="link" className="pl-0 text-primary-600 dark:text-primary-400">
                    View Examples <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
