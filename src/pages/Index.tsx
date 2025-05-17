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
import { 
  CreditCard, 
  BarChart3, 
  Lock, 
  Zap, 
  ArrowRight, 
  Globe, 
  Coins, 
  Calendar, 
  ChevronRight, 
  Receipt, 
  ExternalLink, 
  Activity, 
  Wallet, 
  Accessibility, 
  CheckCircle, 
  ArrowUpDown, 
  Shield,
  QrCode,
  Smartphone,
  CheckSquare,
  Send,
  CircleCheck,
  FileText
} from 'lucide-react';

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
                  <a href="/dashboard">
                    <Button size="lg" className="gap-2">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                  <Button size="lg" variant="outline">
                    Book a Demo
                  </Button>
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

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How StablePay Works</h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Experience the simplicity of crypto payments with our seamless checkout flow.
              </p>
            </div>

            {/* Payment Flow Steps - Desktop */}
            <div className="hidden md:flex justify-between items-start mb-12 relative">
              {/* Connecting line */}
              <div className="absolute top-12 left-0 right-0 h-1 bg-primary-100 dark:bg-primary-800/40 z-0"></div>
              
              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center w-1/6">
                <div className="bg-primary-500 dark:bg-primary-400 w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-md">
                  <CreditCard className="h-6 w-6 text-white dark:text-primary-950" />
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center shadow-md border border-primary-100 dark:border-primary-800 w-full">
                  <div className="font-bold text-lg mb-1">1. Select StablePay</div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Customer chooses StablePay at checkout.</p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center w-1/6">
                <div className="bg-primary-500 dark:bg-primary-400 w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-md">
                  <QrCode className="h-6 w-6 text-white dark:text-primary-950" />
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center shadow-md border border-primary-100 dark:border-primary-800 w-full">
                  <div className="font-bold text-lg mb-1">2. QR Code</div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Payment QR code is displayed.</p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center w-1/6">
                <div className="bg-primary-500 dark:bg-primary-400 w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-md">
                  <Smartphone className="h-6 w-6 text-white dark:text-primary-950" />
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center shadow-md border border-primary-100 dark:border-primary-800 w-full">
                  <div className="font-bold text-lg mb-1">3. Scan QR</div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Customer scans with their Solana wallet.</p>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="relative z-10 flex flex-col items-center w-1/6">
                <div className="bg-primary-500 dark:bg-primary-400 w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-md">
                  <CheckSquare className="h-6 w-6 text-white dark:text-primary-950" />
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center shadow-md border border-primary-100 dark:border-primary-800 w-full">
                  <div className="font-bold text-lg mb-1">4. Sign Transaction</div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Customer confirms and signs securely.</p>
                </div>
              </div>
              
              {/* Step 5 */}
              <div className="relative z-10 flex flex-col items-center w-1/6">
                <div className="bg-primary-500 dark:bg-primary-400 w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-md">
                  <CircleCheck className="h-6 w-6 text-white dark:text-primary-950" />
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center shadow-md border border-primary-100 dark:border-primary-800 w-full">
                  <div className="font-bold text-lg mb-1">5. Confirmation</div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Payment confirmed instantly on-chain.</p>
                </div>
              </div>
              
              {/* Step 6 */}
              <div className="relative z-10 flex flex-col items-center w-1/6">
                <div className="bg-primary-500 dark:bg-primary-400 w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-md">
                  <FileText className="h-6 w-6 text-white dark:text-primary-950" />
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center shadow-md border border-primary-100 dark:border-primary-800 w-full">
                  <div className="font-bold text-lg mb-1">6. Digital Receipt</div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Downloadable and shareable receipt.</p>
                </div>
              </div>
            </div>
            
            {/* Payment Flow Steps - Mobile */}
            <div className="md:hidden">
              <div className="space-y-8 relative">
                {/* Vertical connecting line */}
                <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-primary-100 dark:bg-primary-800/40 z-0"></div>
                
                {/* Step 1 */}
                <div className="flex items-start relative z-10">
                  <div className="bg-primary-500 dark:bg-primary-400 w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-md flex-shrink-0">
                    <CreditCard className="h-6 w-6 text-white dark:text-primary-950" />
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-md border border-primary-100 dark:border-primary-800 flex-grow">
                    <div className="font-bold text-lg mb-1">1. Select StablePay</div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Customer chooses StablePay at checkout.</p>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="flex items-start relative z-10">
                  <div className="bg-primary-500 dark:bg-primary-400 w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-md flex-shrink-0">
                    <QrCode className="h-6 w-6 text-white dark:text-primary-950" />
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-md border border-primary-100 dark:border-primary-800 flex-grow">
                    <div className="font-bold text-lg mb-1">2. QR Code</div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Payment QR code is displayed.</p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="flex items-start relative z-10">
                  <div className="bg-primary-500 dark:bg-primary-400 w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-md flex-shrink-0">
                    <Smartphone className="h-6 w-6 text-white dark:text-primary-950" />
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-md border border-primary-100 dark:border-primary-800 flex-grow">
                    <div className="font-bold text-lg mb-1">3. Scan QR</div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Customer scans with their Solana wallet.</p>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="flex items-start relative z-10">
                  <div className="bg-primary-500 dark:bg-primary-400 w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-md flex-shrink-0">
                    <CheckSquare className="h-6 w-6 text-white dark:text-primary-950" />
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-md border border-primary-100 dark:border-primary-800 flex-grow">
                    <div className="font-bold text-lg mb-1">4. Sign Transaction</div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Customer confirms and signs securely.</p>
                  </div>
                </div>
                
                {/* Step 5 */}
                <div className="flex items-start relative z-10">
                  <div className="bg-primary-500 dark:bg-primary-400 w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-md flex-shrink-0">
                    <CircleCheck className="h-6 w-6 text-white dark:text-primary-950" />
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-md border border-primary-100 dark:border-primary-800 flex-grow">
                    <div className="font-bold text-lg mb-1">5. Confirmation</div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Payment confirmed instantly on-chain.</p>
                  </div>
                </div>
                
                {/* Step 6 */}
                <div className="flex items-start relative z-10">
                  <div className="bg-primary-500 dark:bg-primary-400 w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-md flex-shrink-0">
                    <FileText className="h-6 w-6 text-white dark:text-primary-950" />
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-md border border-primary-100 dark:border-primary-800 flex-grow">
                    <div className="font-bold text-lg mb-1">6. Digital Receipt</div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Downloadable and shareable receipt.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <a href="/flows">
                <Button size="lg">
                  Try StablePay Demo
                </Button>
              </a>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Experience the process for yourself with our interactive checkout demo.
              </p>
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
                title="Digital Receipts"
                description="Offer customers downloadable, shareable and emailable receipts for all transactions with complete details."
                icon={<Receipt className="h-6 w-6" />}
              />
              <FeatureCard
                title="Enterprise Security"
                description="Bank-grade security standards with fully audited smart contracts and comprehensive risk management."
                icon={<Lock className="h-6 w-6" />}
              />
              <FeatureCard
                title="Real-time Status Updates"
                description="Visual progress indicators and instant notifications keep customers informed throughout the payment process."
                icon={<Activity className="h-6 w-6" />}
              />
              <FeatureCard
                title="Transaction Transparency"
                description="Direct Solana Explorer links for all transactions, giving customers full verification capabilities."
                icon={<ExternalLink className="h-6 w-6" />}
              />
              <FeatureCard
                title="Enhanced Wallet Experience"
                description="Smart browser detection with guided connection process for multiple Solana wallet options."
                icon={<Wallet className="h-6 w-6" />}
              />
              <FeatureCard
                title="Yield Generation"
                description="Automatically generate yield on your stablecoin balance through integrated treasury management."
                icon={<BarChart3 className="h-6 w-6" />}
              />
              <FeatureCard
                title="Lightning Fast"
                description="Instant transactions on Solana's high-performance blockchain with sub-second confirmation times."
                icon={<Zap className="h-6 w-6" />}
              />
              <FeatureCard
                title="Accessibility First"
                description="Comprehensive ARIA attributes, keyboard navigation, and screen reader support for all users."
                icon={<Accessibility className="h-6 w-6" />}
              />
            </div>
          </div>
        </section>

        {/* Why Choose StablePay - Competitive Advantages */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose StablePay</h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                See how we compare to traditional solutions and other crypto payment processors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* vs Traditional Payment Processors */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-primary-100 dark:border-primary-800">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-4 border-b border-primary-100 dark:border-primary-800">
                  <h3 className="text-xl font-semibold text-center">vs. Traditional Payment Processors</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">70-80% lower transaction fees</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">Instant settlement vs. 2-3 day delays</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">No chargebacks or payment disputes</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">Yield generation on idle funds</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">Programmable payment flows</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">Enhanced security with blockchain transparency</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* vs Existing Crypto Payment Solutions */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-primary-100 dark:border-primary-800">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-4 border-b border-primary-100 dark:border-primary-800">
                  <h3 className="text-xl font-semibold text-center">vs. Existing Crypto Payment Solutions</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">Direct Perena integration for optimal liquidity</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">Enterprise-grade merchant tools</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">Multi-stablecoin support with preferred settlement</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">Treasury management and yield optimization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">Comprehensive analytics and reporting</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">Advanced security features and audit trail</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* vs Solana Pay */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-primary-100 dark:border-primary-800">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-4 border-b border-primary-100 dark:border-primary-800">
                  <h3 className="text-xl font-semibold text-center">vs. Solana Pay</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">Built for businesses rather than just protocol level</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">Complete merchant dashboard and tools</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">Advanced analytics and reporting</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">Multi-stablecoin optimization through Perena</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">Yield generation capabilities</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">Enhanced security features</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50">
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
        <section id="integrations">
          <div className="container px-4 md:px-6">
            <IntegrationSection />
          </div>
        </section>

        {/* What's Next for StablePay Section */}
        <section id="roadmap" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Next for StablePay</h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Our vision for building the future of stablecoin payments on Solana.
              </p>
            </div>

            <div className="relative">
              {/* Vertical line for timeline */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800 z-0 ml-4 md:ml-0"></div>
              
              <div className="space-y-12 relative z-10">
                {/* Q2 2025 */}
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0 md:order-1 order-2">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-primary-100 dark:border-primary-800">
                      <h3 className="text-xl font-semibold mb-2">Q2 2025</h3>
                      <ul className="text-slate-600 dark:text-slate-300 space-y-2">
                        <li className="flex items-center justify-end"><span>Launch MVP with core functionality</span><ChevronRight className="ml-2 h-4 w-4 text-primary-500" /></li>
                        <li className="flex items-center justify-end"><span>Onboard first 50 merchants</span><ChevronRight className="ml-2 h-4 w-4 text-primary-500" /></li>
                        <li className="flex items-center justify-end"><span>Implement basic subscription features</span><ChevronRight className="ml-2 h-4 w-4 text-primary-500" /></li>
                        <li className="flex items-center justify-end"><span>Expand stablecoin support</span><ChevronRight className="ml-2 h-4 w-4 text-primary-500" /></li>
                        <li className="flex items-center justify-end"><span>Complete initial security audit</span><ChevronRight className="ml-2 h-4 w-4 text-primary-500" /></li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-center md:w-0 order-1 md:order-2">
                    <div className="bg-primary-500 dark:bg-primary-400 rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-10 md:mx-0 ml-4">
                      <Calendar className="h-5 w-5 text-white dark:text-primary-950" />
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:order-3 order-3 hidden md:block"></div>
                </div>

                {/* Q3 2025 */}
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0 hidden md:block"></div>
                  <div className="flex justify-center md:w-0">
                    <div className="bg-primary-500 dark:bg-primary-400 rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-10 md:mx-0 ml-4">
                      <Calendar className="h-5 w-5 text-white dark:text-primary-950" />
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-primary-100 dark:border-primary-800">
                      <h3 className="text-xl font-semibold mb-2">Q3 2025</h3>
                      <ul className="text-slate-600 dark:text-slate-300 space-y-2">
                        <li className="flex items-center"><ChevronRight className="mr-2 h-4 w-4 text-primary-500" /><span>Release enhanced treasury management</span></li>
                        <li className="flex items-center"><ChevronRight className="mr-2 h-4 w-4 text-primary-500" /><span>Add e-commerce plugins</span></li>
                        <li className="flex items-center"><ChevronRight className="mr-2 h-4 w-4 text-primary-500" /><span>Implement advanced analytics</span></li>
                        <li className="flex items-center"><ChevronRight className="mr-2 h-4 w-4 text-primary-500" /><span>Expand developer ecosystem</span></li>
                        <li className="flex items-center"><ChevronRight className="mr-2 h-4 w-4 text-primary-500" /><span>Launch bug bounty program</span></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Q4 2025 */}
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0 md:order-1 order-2">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-primary-100 dark:border-primary-800">
                      <h3 className="text-xl font-semibold mb-2">Q4 2025</h3>
                      <ul className="text-slate-600 dark:text-slate-300 space-y-2">
                        <li className="flex items-center justify-end"><span>Launch enterprise tier features</span><ChevronRight className="ml-2 h-4 w-4 text-primary-500" /></li>
                        <li className="flex items-center justify-end"><span>Add multi-user access and roles</span><ChevronRight className="ml-2 h-4 w-4 text-primary-500" /></li>
                        <li className="flex items-center justify-end"><span>Implement enhanced security features</span><ChevronRight className="ml-2 h-4 w-4 text-primary-500" /></li>
                        <li className="flex items-center justify-end"><span>Expand to additional blockchain networks</span><ChevronRight className="ml-2 h-4 w-4 text-primary-500" /></li>
                        <li className="flex items-center justify-end"><span>Obtain security certifications</span><ChevronRight className="ml-2 h-4 w-4 text-primary-500" /></li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-center md:w-0 order-1 md:order-2">
                    <div className="bg-primary-500 dark:bg-primary-400 rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-10 md:mx-0 ml-4">
                      <Calendar className="h-5 w-5 text-white dark:text-primary-950" />
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:order-3 order-3 hidden md:block"></div>
                </div>

                {/* Q1 2026 */}
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0 hidden md:block"></div>
                  <div className="flex justify-center md:w-0">
                    <div className="bg-primary-500 dark:bg-primary-400 rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-10 md:mx-0 ml-4">
                      <Calendar className="h-5 w-5 text-white dark:text-primary-950" />
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-primary-100 dark:border-primary-800">
                      <h3 className="text-xl font-semibold mb-2">Q1 2026</h3>
                      <ul className="text-slate-600 dark:text-slate-300 space-y-2">
                        <li className="flex items-center"><ChevronRight className="mr-2 h-4 w-4 text-primary-500" /><span>Add fiat on/off ramps</span></li>
                        <li className="flex items-center"><ChevronRight className="mr-2 h-4 w-4 text-primary-500" /><span>Implement AI-driven insights</span></li>
                        <li className="flex items-center"><ChevronRight className="mr-2 h-4 w-4 text-primary-500" /><span>Launch mobile applications</span></li>
                        <li className="flex items-center"><ChevronRight className="mr-2 h-4 w-4 text-primary-500" /><span>Expand global merchant base</span></li>
                        <li className="flex items-center"><ChevronRight className="mr-2 h-4 w-4 text-primary-500" /><span>Implement continuous security monitoring</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section Placeholder */}

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
              <a href="/dashboard">
                <Button size="lg" className="gap-2">
                  Create Free Account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
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
                  Everything you need to integrate and customize StablePay for your platform.
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
