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
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
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
            
            <div className="flex flex-col gap-2 mt-2">
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
