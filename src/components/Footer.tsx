import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter,
  Star
} from "lucide-react";
import EmailLink from "@/components/ui/email-link";
import { PHONE, EMAIL } from "@/config/site";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    "General Repairs",
    "Furniture Assembly", 
    "TV Mounting",
    "Drywall Patching",
    "Painting",
    "Plumbing Repairs",
    "Light Electrical",
    "Emergency Service"
  ];

  const quickLinks = [
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
  { name: "Book Service", href: "#book" },
  { name: "Emergency", href: `tel:${PHONE.tel}` }
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="material-icons text-white text-lg">build</span>
              </div>
              <span className="text-xl font-bold">Fix it Right</span>
            </div>
            <p className="text-background/80 leading-relaxed">
              Your trusted handyman service for over 10 years. We fix it right the first time, every time.
            </p>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
              ))}
              <span className="text-sm text-background/80 ml-2">5.0 Stars • 500+ Reviews</span>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-background hover:text-primary hover:bg-background/10">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-background hover:text-primary hover:bg-background/10">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-background hover:text-primary hover:bg-background/10">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href="#services" 
                    className="text-background/80 hover:text-secondary transition-colors duration-200"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-background/80 hover:text-secondary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <div>
                  <p className="text-background font-medium">{PHONE.display}</p>
                  <p className="text-background/70 text-sm">Main Line</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <div>
                  <p className="text-background font-medium">{PHONE.display}</p>
                  <p className="text-background/70 text-sm">Emergency 24/7</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <div>
                  <p className="text-background font-medium">
                    <EmailLink user={EMAIL.user} domain={EMAIL.domain} className="text-background font-medium" />
                  </p>
                  <p className="text-background/70 text-sm">General Inquiries</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0" />
                <div>
                  <p className="text-background font-medium">Greater Metro Area</p>
                  <p className="text-background/70 text-sm">Service Area</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-background/80 text-sm">
                © {currentYear} Fix it Right. All rights reserved.
              </p>
              <p className="text-background/70 text-xs mt-1">
                Licensed • Insured • Bonded
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <a href="#" className="text-background/80 hover:text-secondary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-background/80 hover:text-secondary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-background/80 hover:text-secondary transition-colors">
                Licensing
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;