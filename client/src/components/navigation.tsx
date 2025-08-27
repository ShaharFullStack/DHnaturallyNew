import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LanguageToggle } from './language-toggle';
import { ShoppingCartSidebar } from './shopping-cart';
import { useLanguage } from '@/contexts/language-context';
import { useCart } from '@/hooks/use-cart';
import { t } from '@/lib/i18n';
import logoImage from '@assets/android-chrome-512x512_1756223879006.png';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [location] = useLocation();
  const { language, isRTL } = useLanguage();
  const { totalItems } = useCart();

  const navItems = [
    { path: '/', label: t('nav.home', language), testId: 'nav-home' },
    { path: '/store', label: t('nav.store', language), testId: 'nav-store' },
    { path: '/articles', label: t('nav.articles', language), testId: 'nav-articles' },
    { path: '/about', label: t('nav.about', language), testId: 'nav-about' },
    { path: '/contact', label: t('nav.contact', language), testId: 'nav-contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveLink = (path: string) => {
    return location === path;
  };

  return (
    <>
      <nav className="bg-dh-pale/60 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-0">
            {/* Logo */}
            <Link href="/" data-testid="logo-link">
              <div className="flex items-center rtl:space-between">
                  <img src={logoImage} alt="DHnaturally Logo" className="logo-image" />
                <span className="text-2xl font-bold text-dh-ocean">DHnaturally</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  data-testid={item.testId}
                  className={`nav-link ${isActiveLink(item.path) ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
              
              <LanguageToggle />
              
              {/* Cart Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCartOpen(true)}
                className="relative text-dh-pale"
                data-testid="cart-button"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2 rtl:space-x-reverse">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCartOpen(true)}
                className="relative"
                data-testid="cart-button-mobile"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                data-testid="mobile-menu-button"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-dh-navy" />
                ) : (
                  <Menu className="h-6 w-6 text-dh-navy" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4" data-testid="mobile-menu">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    data-testid={`${item.testId}-mobile`}
                    className={`block px-4 py-2 rounded-md nav-link ${isActiveLink(item.path) ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="px-4 py-2">
                  <LanguageToggle />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <ShoppingCartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
