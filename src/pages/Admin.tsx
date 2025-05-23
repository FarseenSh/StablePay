
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminPortal from '@/components/AdminPortal';

const Admin = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Portal</h1>
            <p className="text-slate-600 dark:text-slate-300">
              Manage users, merchants, and system settings.
            </p>
          </div>
          
          <AdminPortal />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
