
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MerchantOnboarding from './flows/MerchantOnboarding';
import CustomerPaymentFlow from './flows/CustomerPaymentFlow';
import TransactionMonitoringFlow from './flows/TransactionMonitoringFlow';
import TreasuryManagementFlow from './flows/TreasuryManagementFlow';

const FlowsDemo = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <Tabs defaultValue="onboarding" className="w-full">
        <TabsList className="mb-8 w-full justify-start overflow-x-auto">
          <TabsTrigger value="onboarding">Merchant Onboarding</TabsTrigger>
          <TabsTrigger value="payment">Customer Payment</TabsTrigger>
          <TabsTrigger value="transactions">Transaction Monitoring</TabsTrigger>
          <TabsTrigger value="treasury">Treasury Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="onboarding">
          <MerchantOnboarding />
        </TabsContent>
        
        <TabsContent value="payment">
          <CustomerPaymentFlow />
        </TabsContent>
        
        <TabsContent value="transactions">
          <TransactionMonitoringFlow />
        </TabsContent>
        
        <TabsContent value="treasury">
          <TreasuryManagementFlow />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FlowsDemo;
