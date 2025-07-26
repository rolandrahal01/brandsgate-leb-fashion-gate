import React from 'react';
import { ArrowRight, Shield, CreditCard, Award, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import heroFashion from '@/assets/hero-fashion.jpg';

const HeroSection = () => {
  const { t, isRTL } = useLanguage();

  const trustBadges = [
    { icon: CreditCard, key: 'hero.trustBadge1' },
    { icon: Shield, key: 'hero.trustBadge2' },
    { icon: Award, key: 'hero.trustBadge3' },
    { icon: Headphones, key: 'hero.trustBadge4' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroFashion}
          alt="Fashion Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={`${isRTL ? 'lg:order-2 text-right' : 'text-left'} animate-fade-in`}>
            <div className="space-y-6">
              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  <span className="block">{t('hero.title')}</span>
                  <span className="block text-gold">{t('hero.subtitle')}</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-200 max-w-2xl">
                  {t('brands.subtitle')}
                </p>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Button 
                  size="lg" 
                  className="bg-highlight hover:bg-highlight/90 text-highlight-foreground text-lg px-8 py-6 rounded-full shadow-strong hover:shadow-xl transition-all duration-300 group"
                >
                  {t('hero.cta')}
                  <ArrowRight className={`h-5 w-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'} group-hover:translate-x-1 transition-transform`} />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="pt-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {trustBadges.map((badge, index) => (
                    <div
                      key={badge.key}
                      className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white hover:bg-white/20 transition-colors"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <badge.icon className="h-5 w-5 text-gold" />
                      <span className="text-sm font-medium">{t(badge.key)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className={`${isRTL ? 'lg:order-1' : ''} flex justify-center lg:justify-end`}>
            <div className="relative">
              {/* Floating Elements */}
              <div className="animate-float">
                <Badge className="absolute -top-4 -left-4 bg-gold text-gold-foreground font-semibold px-4 py-2 shadow-medium">
                  {t('products.newArrivals')}
                </Badge>
              </div>
              
              <div className="animate-float" style={{ animationDelay: '1s' }}>
                <Badge className="absolute -bottom-4 -right-4 bg-success text-success-foreground font-semibold px-4 py-2 shadow-medium">
                  {t('hero.trustBadge1')}
                </Badge>
              </div>

              {/* Decorative Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-3xl"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;