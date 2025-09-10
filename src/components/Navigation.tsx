import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";
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
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="material-icons text-white text-lg">build</span>
            </div>
            <span className="text-xl font-bold text-primary">Fix it Right</span>
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

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>{PHONE.display}</span>
            </div>
            <LanguageSwitcher />
            <a href="/signin">
              <Button className="btn-primary">
                Sign In
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2 ml-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {t(`nav_${item.name.toLowerCase()}`) || item.name}
              </a>
            ))}
            <div className="pt-4 border-t border-border">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                <Phone className="w-4 h-4" />
                <span>{PHONE.display}</span>
              </div>
              <a href="/signin">
                <Button className="btn-primary w-full">
                  Sign In
                </Button>
              </a>
            </div>
          </div>
        </div>
        {/* Mobile bottom nav and floating contact CTA */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 md:hidden z-50 w-[92%]">
          <div className="bg-background/95 border border-border rounded-xl p-2 flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3">
              <a href="#home" className="text-sm text-foreground">{t('nav_home')}</a>
              <a href="#services" className="text-sm text-foreground">{t('nav_services')}</a>
              <a href="#contact" className="text-sm text-foreground">{t('nav_contact')}</a>
            </div>
            <div>
              <Button size="sm" className="btn-secondary" onClick={() => window.open(`tel:${PHONE.tel}`)}>
                <Phone className="w-4 h-4 mr-2" />{PHONE.display}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;