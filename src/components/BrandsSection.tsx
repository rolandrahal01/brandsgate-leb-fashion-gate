import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import brandLogos from '@/assets/brand-logos.jpg';

const BrandsSection = () => {
  const { t, isRTL } = useLanguage();

  // Mock brand data - in real app this would come from API
  const brands = [
    { name: 'Zara', logo: '🏷️' },
    { name: 'Mango', logo: '🥭' },
    { name: 'Stradivarius', logo: '⭐' },
    { name: 'Bershka', logo: '🎨' },
    { name: 'Pull & Bear', logo: '🐻' },
    { name: 'Massimo Dutti', logo: '👔' },
    { name: 'H&M', logo: '🏠' },
    { name: 'COS', logo: '🎯' },
  ];

  return (
    <section id="brands" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-left'} max-w-3xl mx-auto`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            {t('brands.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('brands.subtitle')}
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-12">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105 cursor-pointer group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {brand.logo}
                </div>
                <p className="font-semibold text-sm text-primary">{brand.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Brands Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-strong">
          <img
            src={brandLogos}
            alt="Featured Brands"
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end">
            <div className="p-8 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Global Fashion Brands
              </h3>
              <p className="text-lg opacity-90">
                Discover the world's most loved fashion brands, delivered to your doorstep
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { number: '50+', label: 'Global Brands' },
            { number: '10K+', label: 'Happy Customers' },
            { number: '24/7', label: 'Support' },
            { number: '100%', label: 'Authentic' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-white rounded-xl shadow-soft"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;