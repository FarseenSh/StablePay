import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FlowsDemo from '@/components/FlowsDemo';

const Flows = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 md:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">Workflow Demos</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              View interactive demonstrations of key StablePay workflows.
            </p>
          </div>
          
          <FlowsDemo />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Flows;
