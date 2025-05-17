import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 bg-opacity-80 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <div className="text-primary-600 dark:text-primary-400 font-bold text-xl mr-1">Stable</div>
            <div className="text-accent-500 font-bold text-xl">Pay</div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium hover:text-primary-600 transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-sm font-medium hover:text-primary-600 transition-colors">
            Pricing
          </a>
          <a href="#integrations" className="text-sm font-medium hover:text-primary-600 transition-colors">
            Integrations
          </a>
          <a href="#documentation" className="text-sm font-medium hover:text-primary-600 transition-colors">
            Documentation
          </a>
          
          {/* Dashboard Dropdown */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium hover:text-primary-600 transition-colors bg-transparent p-0 h-auto">
                  Dashboard
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[180px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="/dashboard"
                          className="block select-none space-y-1 rounded-md p-3 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <div className="text-sm font-medium">Dashboard</div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            View your merchant dashboard
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="/flows"
                          className="block select-none space-y-1 rounded-md p-3 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <div className="text-sm font-medium">Flows</div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            View workflow demonstrations
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
          <a href="/dashboard">
            <Button size="sm">Get Started</Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 animate-fade-in">
          <div className="container px-4 py-4 flex flex-col gap-4">
            <a 
              href="#features" 
              className="text-sm font-medium hover:text-primary-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#pricing" 
              className="text-sm font-medium hover:text-primary-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <a 
              href="#integrations" 
              className="text-sm font-medium hover:text-primary-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Integrations
            </a>
            <a 
              href="#documentation" 
              className="text-sm font-medium hover:text-primary-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Documentation
            </a>
            
            {/* Dashboard Section with Dropdown */}
            <div className="py-2">
              <div 
                className="flex items-center justify-between text-sm font-medium hover:text-primary-600 transition-colors cursor-pointer"
                onClick={() => setIsDashboardOpen(!isDashboardOpen)}
              >
                <span>Dashboard</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isDashboardOpen ? 'rotate-180' : ''}`} />
              </div>
              
              {isDashboardOpen && (
                <div className="ml-4 mt-2 space-y-2 border-l-2 border-slate-200 dark:border-slate-700 pl-4">
                  <a 
                    href="/dashboard" 
                    className="block text-sm font-medium hover:text-primary-600 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </a>
                  <a 
                    href="/flows" 
                    className="block text-sm font-medium hover:text-primary-600 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Flows
                  </a>
                </div>
              )}
            </div>
            
            <div className="flex flex-col gap-2 mt-2">
              <Button variant="outline" size="sm" className="w-full">
                Sign In
              </Button>
              <a href="/dashboard" className="w-full">
                <Button size="sm" className="w-full">Get Started</Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
