import React from 'react';
import { Instagram, MessageCircle, Phone, Facebook, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import brandsgateLogo from '@/assets/brandsgate-logo.jpg';

const Footer = () => {
  const { t, isRTL } = useLanguage();

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/brandsgatelb', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/brandsgatelb', label: 'Facebook' },
    { icon: MessageCircle, href: 'https://wa.me/9611234567', label: 'WhatsApp' },
  ];

  const quickLinks = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.brands', href: '#brands' },
    { key: 'nav.women', href: '#women' },
    { key: 'nav.men', href: '#men' },
    { key: 'nav.kids', href: '#kids' },
    { key: 'nav.sale', href: '#sale' },
  ];

  const supportLinks = [
    { key: 'footer.terms', href: '#terms' },
    { key: 'footer.privacy', href: '#privacy' },
    { key: 'footer.faq', href: '#faq' },
    { key: 'footer.contact', href: '#contact' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src={brandsgateLogo} 
                alt="BrandsGate" 
                className="h-10 w-10 object-contain rounded-lg"
              />
              <div>
                <h3 className="text-xl font-bold">BrandsGate</h3>
                <p className="text-sm text-primary-foreground/80">{t('hero.subtitle')}</p>
              </div>
            </div>
            
            <p className="text-primary-foreground/80 leading-relaxed">
              Your gateway to global fashion brands with local delivery and support. 
              No credit card needed, pay on delivery.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="secondary"
                  size="sm"
                  className="rounded-full p-2 bg-white/10 hover:bg-white/20 border-0"
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">{t('footer.contact')}</h4>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold" />
                <div>
                  <p className="font-medium">+961 1 234 567</p>
                  <p className="text-sm text-primary-foreground/80">{t('footer.phone')}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-green-400" />
                <div>
                  <p className="font-medium">+961 70 123 456</p>
                  <p className="text-sm text-primary-foreground/80">{t('footer.whatsapp')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold mt-1" />
                <div>
                  <p className="font-medium">Beirut, Lebanon</p>
                  <p className="text-sm text-primary-foreground/80">Delivery across Lebanon</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold" />
                <div>
                  <p className="font-medium">hello@brandsgate.lb</p>
                  <p className="text-sm text-primary-foreground/80">24/7 Email Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/20">
          <div className="bg-white/10 rounded-xl p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h4 className="text-xl font-bold mb-2">Stay Updated</h4>
                <p className="text-primary-foreground/80">
                  Get the latest fashion updates and exclusive offers delivered to your inbox
                </p>
              </div>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <Button className="bg-gold hover:bg-gold/90 text-gold-foreground px-6">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/80 text-sm">
              © 2024 {t('footer.poweredBy')}. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-sm">
              <span className="text-primary-foreground/80">Made with ❤️ in Lebanon</span>
              <div className="flex gap-4">
                <a href="#terms" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Terms
                </a>
                <a href="#privacy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Privacy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;