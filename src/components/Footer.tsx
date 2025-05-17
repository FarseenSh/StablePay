import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="text-primary-600 dark:text-primary-400 font-bold text-xl mr-1">Stable</div>
              <div className="text-accent-500 font-bold text-xl">Pay</div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Enterprise-grade stablecoin payment processor built on Solana that leverages Stable's stablecoin infrastructure.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">
                <span className="sr-only">Twitter</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">
                <span className="sr-only">GitHub</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </a>
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">
                <span className="sr-only">Discord</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M8.5 12a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"></path>
                  <path d="M15.5 12a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"></path>
                  <path d="M4.583 6.013a.5.5 0 0 1 .558-.417 21.67 21.67 0 0 1 4.417.455.5.5 0 0 0 .992.129A12 12 0 0 1 12 6a12 12 0 0 1 1.45.18.5.5 0 0 0 .992-.13 21.54 21.54 0 0 1 4.417-.454.5.5 0 0 1 .558.417c.022.123.117.791.151 1.165C19.78 8.357 20 10.253 20 12c0 1.231-.145 2.497-.5 3.5-.725 2.05-2.4 2.55-4.055 2.66a.497.497 0 0 0-.345.138.5.5 0 0 0-.143.34c.02.102.066.291.097.401.022.077.044.173.044.254a.5.5 0 0 1-.599.49 16.807 16.807 0 0 1-4.75-1.196 1.482 1.482 0 0 0-.308-.073.5.5 0 0 0-.17.033A18.75 18.75 0 0 1 6.43 19.5a.5.5 0 0 1-.574-.486c0-.082.022-.177.044-.254.03-.11.076-.3.097-.401a.5.5 0 0 0-.143-.341.497.497 0 0 0-.345-.137c-1.655-.11-3.33-.611-4.055-2.66A11.367 11.367 0 0 1 4 12c0-1.747.22-3.643.432-4.822.034-.374.13-1.042.15-1.165Z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-50 mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">Features</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">Pricing</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">Integrations</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-50 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">About</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">Blog</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">Careers</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-50 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">Privacy</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">Terms</a></li>
              <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} StablePay. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-xs text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">Terms of Service</a>
            <a href="#" className="text-xs text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
