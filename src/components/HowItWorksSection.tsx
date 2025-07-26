import React from 'react';
import { Search, UserPlus, Truck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const HowItWorksSection = () => {
  const { t, isRTL } = useLanguage();

  const steps = [
    {
      icon: Search,
      titleKey: 'howItWorks.step1.title',
      descKey: 'howItWorks.step1.desc',
      color: 'bg-highlight',
    },
    {
      icon: UserPlus,
      titleKey: 'howItWorks.step2.title',
      descKey: 'howItWorks.step2.desc',
      color: 'bg-gold',
    },
    {
      icon: Truck,
      titleKey: 'howItWorks.step3.title',
      descKey: 'howItWorks.step3.desc',
      color: 'bg-success',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-left'} max-w-3xl mx-auto`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            {t('howItWorks.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            Simple steps to get your favorite fashion brands delivered to your door
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border transform -translate-y-1/2 hidden md:block"></div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div
                key={step.titleKey}
                className="relative text-center group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold z-10">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`${step.color} rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-medium group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="h-10 w-10 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold text-primary">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(step.descKey)}
                  </p>
                </div>

                {/* Connector Arrow - Mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center mt-8 mb-4">
                    <div className={`w-0.5 h-8 bg-border ${isRTL ? 'rotate-180' : ''}`}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-accent rounded-xl shadow-soft">
            <div className="text-4xl mb-4">🚀</div>
            <h4 className="text-lg font-semibold text-accent-foreground mb-2">Fast Delivery</h4>
            <p className="text-sm text-muted-foreground">Get your orders within 2-5 business days</p>
          </div>
          
          <div className="text-center p-6 bg-accent rounded-xl shadow-soft">
            <div className="text-4xl mb-4">💰</div>
            <h4 className="text-lg font-semibold text-accent-foreground mb-2">No Hidden Fees</h4>
            <p className="text-sm text-muted-foreground">Transparent pricing with clear service fees</p>
          </div>
          
          <div className="text-center p-6 bg-accent rounded-xl shadow-soft">
            <div className="text-4xl mb-4">🛡️</div>
            <h4 className="text-lg font-semibold text-accent-foreground mb-2">Secure Shopping</h4>
            <p className="text-sm text-muted-foreground">Safe and secure payment on delivery</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;