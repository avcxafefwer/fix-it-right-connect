import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from '@/i18n';
import { PHONE } from "@/config/site";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ];

  const { t } = useI18n();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-material-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="material-icons text-white text-lg">build</span>
            </div>
            <span className="text-lg font-bold text-primary whitespace-nowrap">Fix it Right</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {t(`nav_${item.name.toLowerCase()}`) || item.name}
              </a>
            ))}
          </div>

          {/* Right controls: phone (lg), language, mobile menu */}
          <div className="flex items-center space-x-3">
            {/* phone removed from header to avoid clutter; phone remains inside mobile panel */}

            {/* language globe is compact and visible on all sizes */}
            <div>
              <LanguageSwitcher />
            </div>

            {/* Mobile icons: user (login) only */}
            <div className="flex items-center md:hidden space-x-2">
              <a href="/signin">
                <Button variant="ghost" size="sm" aria-label="Sign in">
                  <User className="w-5 h-5" />
                </Button>
              </a>
            </div>

            {/* Sign In visible on medium+ screens */}
            <div className="hidden md:inline-flex">
              <a href="/signin">
                <Button className="btn-primary">Sign In</Button>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2"
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {/* Mobile slide-down panel (full width overlay) */}
        {isOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-background/95 border-t border-border shadow-md p-4">
                <div className="flex flex-col space-y-3">

                  {/* removed primary nav links from mobile panel per design — keep settings only */}

                  <div className="pt-2 border-t border-border">
                    <div className="py-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">📞</span>
                          <div className="text-sm">{PHONE.display}</div>
                        </div>
                        <Button size="sm" className="btn-secondary" onClick={() => window.open(`tel:${PHONE.tel}`)}>
                          Call
                        </Button>
                      </div>

                      <div className="mt-2">
                        <div className="text-sm text-muted-foreground mb-2">{t('settings') || 'Settings'}</div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm">{t('language') || 'Language'}</div>
                          <div>
                            {/* show small language switcher in mobile panel */}
                            <LanguageSwitcher />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <a href="/signin">
                        <Button className="btn-primary w-full">Sign In</Button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
  {/* removed bottom mobile nav — header now contains compact controls */}
      </div>
    </nav>
  );
};

export default Navigation;