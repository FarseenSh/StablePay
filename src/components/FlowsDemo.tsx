import React, { useState, lazy, Suspense, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader } from "lucide-react";

// Lazy load components to improve initial loading performance
const MerchantOnboarding = lazy(() => import('./flows/MerchantOnboarding'));
const CustomerPaymentFlow = lazy(() => import('./flows/CustomerPaymentFlow'));
const TransactionMonitoringFlow = lazy(() => import('./flows/TransactionMonitoringFlow'));

// Loading component to display while lazy-loaded components are being fetched
const LoadingComponent = () => (
  <div className="w-full flex justify-center items-center py-16">
    <div className="flex flex-col items-center">
      <Loader className="h-8 w-8 text-primary-500 animate-spin mb-4" />
      <p className="text-slate-600 dark:text-slate-300">Loading flow demonstration...</p>
    </div>
  </div>
);

// Add CSS for smooth transitions
const tabContentStyle = "transition-opacity duration-300 animate-in fade-in-0";

const FlowsDemo = () => {
  const [activeTab, setActiveTab] = useState('onboarding');
  const [isChangingTab, setIsChangingTab] = useState(false);
  
  // Preload components based on user interaction
  const preloadComponent = (componentName: string) => {
    switch(componentName) {
      case 'onboarding':
        import('./flows/MerchantOnboarding');
        break;
      case 'payment':
        import('./flows/CustomerPaymentFlow');
        break;
      case 'transactions':
        import('./flows/TransactionMonitoringFlow');
        break;
    }
  };

  const handleTabChange = (value: string) => {
    // Preload the component for the selected tab
    preloadComponent(value);
    
    // Add a slight delay before changing tabs for smoother transitions
    setIsChangingTab(true);
    setTimeout(() => {
      setActiveTab(value);
      setIsChangingTab(false);
    }, 50);
  };

  // Preload all components after initial render
  useEffect(() => {
    // Preload the initial component immediately
    preloadComponent(activeTab);
    
    // Preload other components with a delay to not block the main thread
    const timer = setTimeout(() => {
      ['onboarding', 'payment', 'transactions'].forEach(tab => {
        if (tab !== activeTab) {
          preloadComponent(tab);
        }
      });
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Tabs 
        defaultValue="onboarding" 
        value={activeTab}
        className="w-full"
        onValueChange={handleTabChange}
      >
        <TabsList className="mb-8 w-full justify-start overflow-x-auto">
          <TabsTrigger 
            value="onboarding"
            onMouseEnter={() => preloadComponent('onboarding')}
          >
            Merchant Onboarding
          </TabsTrigger>
          <TabsTrigger 
            value="payment"
            onMouseEnter={() => preloadComponent('payment')}
          >
            Customer Payment
          </TabsTrigger>
          <TabsTrigger 
            value="transactions"
            onMouseEnter={() => preloadComponent('transactions')}
          >
            Transaction Monitoring
          </TabsTrigger>
        </TabsList>
        
        {/* Individual tab content with separate Suspense boundaries */}
        <TabsContent value="onboarding" className={tabContentStyle}>
          <Suspense fallback={<LoadingComponent />}>
            <MerchantOnboarding />
          </Suspense>
        </TabsContent>
        
        <TabsContent value="payment" className={tabContentStyle}>
          <Suspense fallback={<LoadingComponent />}>
            <CustomerPaymentFlow />
          </Suspense>
        </TabsContent>
        
        <TabsContent value="transactions" className={tabContentStyle}>
          <Suspense fallback={<LoadingComponent />}>
            <TransactionMonitoringFlow />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FlowsDemo;
