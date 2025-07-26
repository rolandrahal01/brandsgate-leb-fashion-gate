import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import BrandsSection from '@/components/BrandsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import ProductsSection from '@/components/ProductsSection';
import Reviews from '@/components/Reviews';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <BrandsSection />
        <HowItWorksSection />
        <ProductsSection />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
};

export default Index;