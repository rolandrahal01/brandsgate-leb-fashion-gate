import React, { useState } from 'react';
import { Heart, ShoppingBag, Star, Filter, Eye, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart, Product } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import ProductModal from '@/components/ProductModal';
import SearchBar from '@/components/SearchBar';
import productsShowcase from '@/assets/products-showcase.jpg';

const ProductsSection = () => {
  const { t, isRTL } = useLanguage();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState<any>({
    brands: [],
    categories: [],
    colors: [],
    sizes: [],
    priceRange: [0, 1000]
  });

  // Mock products data - in real app this would come from API
  const products: Product[] = [
    {
      id: '1',
      name: 'Premium Cotton T-Shirt',
      brand: 'Zara',
      price: 29.99,
      serviceFee: 5.00,
      image: productsShowcase,
      category: 'women',
      colors: ['Black', 'White', 'Navy'],
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: '2',
      name: 'Designer Jeans',
      brand: 'Mango',
      price: 79.99,
      serviceFee: 10.00,
      image: productsShowcase,
      category: 'women',
      colors: ['Blue', 'Black'],
      sizes: ['28', '30', '32', '34'],
    },
    {
      id: '3',
      name: 'Leather Jacket',
      brand: 'Stradivarius',
      price: 149.99,
      serviceFee: 20.00,
      image: productsShowcase,
      category: 'men',
      colors: ['Black', 'Brown'],
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: '4',
      name: 'Summer Dress',
      brand: 'Bershka',
      price: 49.99,
      serviceFee: 8.00,
      image: productsShowcase,
      category: 'women',
      colors: ['Floral', 'Solid'],
      sizes: ['XS', 'S', 'M', 'L'],
    },
    {
      id: '5',
      name: 'Kids Hoodie',
      brand: 'Zara',
      price: 24.99,
      serviceFee: 4.00,
      image: productsShowcase,
      category: 'kids',
      colors: ['Red', 'Blue', 'Green'],
      sizes: ['4Y', '6Y', '8Y', '10Y'],
    },
    {
      id: '6',
      name: 'Lebanese Designer Scarf',
      brand: 'Local Exclusive',
      price: 39.99,
      serviceFee: 6.00,
      image: productsShowcase,
      category: 'accessories',
      colors: ['Cedar Green', 'Gold'],
      sizes: ['One Size'],
      isExclusive: true,
    },
  ];

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'women', label: t('nav.women') },
    { id: 'men', label: t('nav.men') },
    { id: 'kids', label: t('nav.kids') },
    { id: 'accessories', label: 'Accessories' },
  ];

  const filteredProducts = products.filter(product => {
    // Filter by tab
    if (activeTab !== 'all' && product.category.toLowerCase() !== activeTab.toLowerCase()) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !product.brand.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by brands
    if (searchFilters.brands.length > 0 && !searchFilters.brands.includes(product.brand)) {
      return false;
    }
    
    // Filter by categories
    if (searchFilters.categories.length > 0 && !searchFilters.categories.includes(product.category)) {
      return false;
    }
    
    // Filter by colors
    if (searchFilters.colors.length > 0 && !product.colors.some(color => searchFilters.colors.includes(color))) {
      return false;
    }
    
    // Filter by sizes
    if (searchFilters.sizes.length > 0 && !product.sizes.some(size => searchFilters.sizes.includes(size))) {
      return false;
    }
    
    // Filter by price range
    const totalPrice = product.price + product.serviceFee;
    if (totalPrice < searchFilters.priceRange[0] || totalPrice > searchFilters.priceRange[1]) {
      return false;
    }
    
    return true;
  });

  const handleAddToCart = (product: Product) => {
    // For demo, we'll use the first available color and size
    addToCart(product, product.colors[0], product.sizes[0]);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <section id="products" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-left'} max-w-3xl mx-auto`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            {t('products.trending')}
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover the latest fashion trends from your favorite global brands
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar 
          onSearch={(query, filters) => {
            setSearchQuery(query);
            setSearchFilters(filters);
          }}
          className="mb-8"
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id)}
              className="rounded-full px-6"
            >
              {tab.label}
            </Button>
          ))}
          <Button variant="outline" className="rounded-full px-4">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105 group overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isExclusive && (
                    <Badge className="bg-gold text-gold-foreground">
                      {t('products.exclusives')}
                    </Badge>
                  )}
                  <Badge variant="secondary" className="bg-white/90 text-primary">
                    {product.brand}
                  </Badge>
                </div>

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="secondary" className="rounded-full p-2 bg-white/90">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                {/* Rating */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 rounded-full px-2 py-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">4.8</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-primary group-hover:text-highlight transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                </div>

                {/* Colors */}
                <div className="flex gap-1">
                  {product.colors.slice(0, 3).map((color, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full border border-border bg-gradient-to-br from-primary to-accent"
                      title={color}
                    />
                  ))}
                  {product.colors.length > 3 && (
                    <span className="text-xs text-muted-foreground self-center ml-1">
                      +{product.colors.length - 3}
                    </span>
                  )}
                </div>

                {/* Pricing */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      ${(product.price + product.serviceFee).toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t('products.serviceFee')}: ${product.serviceFee.toFixed(2)}
                  </p>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-highlight hover:bg-highlight/90 text-highlight-foreground"
                  size="sm"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  {t('products.addToCart')}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Section */}
        <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold">
                {t('products.exclusives')}
              </h3>
              <p className="text-lg text-gray-200">
                Discover unique fashion pieces from Lebanese designers and exclusive international collections
              </p>
              <Button variant="secondary" size="lg" className="rounded-full">
                {t('common.viewAll')}
              </Button>
            </div>
            <div className="relative">
              <img
                src={productsShowcase}
                alt="Exclusive Products"
                className="rounded-xl shadow-strong"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};

export default ProductsSection;