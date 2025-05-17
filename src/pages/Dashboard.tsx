import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DashboardDemo from '@/components/DashboardDemo';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">Dashboard</h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Welcome to the StablePay merchant dashboard demo.
              </p>
            </div>
            
            <DashboardDemo />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
