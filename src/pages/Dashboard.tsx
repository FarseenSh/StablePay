
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-300">
              Welcome to the PerenaPay merchant dashboard demo.
            </p>
          </div>
          
          <DashboardDemo />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
