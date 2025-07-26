import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, X, Filter } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  placeholder?: string;
  className?: string;
}

interface SearchFilters {
  brands: string[];
  categories: string[];
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder, className = '' }) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    brands: [],
    categories: [],
    colors: [],
    sizes: [],
    priceRange: [0, 1000]
  });

  const availableFilters = {
    brands: ['Zara', 'Mango', 'H&M', 'Stradivarius', 'Bershka', 'Pull & Bear'],
    categories: ['Women', 'Men', 'Kids', 'Shoes', 'Accessories', 'New Arrivals', 'Sale'],
    colors: ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  };

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      onSearch(query, filters);
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query, filters, onSearch]);

  const handleFilterToggle = (filterType: keyof SearchFilters, value: string) => {
    if (filterType === 'priceRange') return;
    
    setFilters(prev => ({
      ...prev,
      [filterType]: (prev[filterType] as string[]).includes(value)
        ? (prev[filterType] as string[]).filter(item => item !== value)
        : [...(prev[filterType] as string[]), value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      brands: [],
      categories: [],
      colors: [],
      sizes: [],
      priceRange: [0, 1000]
    });
  };

  const activeFiltersCount = filters.brands.length + filters.categories.length + filters.colors.length + filters.sizes.length;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder || t('common.search')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-12"
        />
        <Button
          variant="ghost"
          size="icon"
          className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 ${activeFiltersCount > 0 ? 'text-primary' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
          {activeFiltersCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          {[...filters.brands, ...filters.categories, ...filters.colors, ...filters.sizes].map((filter, index) => (
            <Badge key={index} variant="secondary" className="cursor-pointer">
              {filter}
              <X 
                className="h-3 w-3 ml-1" 
                onClick={() => {
                  // Find which filter type this belongs to and remove it
                  Object.keys(availableFilters).forEach(filterType => {
                    if (availableFilters[filterType as keyof typeof availableFilters].includes(filter)) {
                      handleFilterToggle(filterType as keyof SearchFilters, filter);
                    }
                  });
                }}
              />
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}

      {/* Filters Panel */}
      {showFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Object.entries(availableFilters).map(([filterType, options]) => (
                <div key={filterType}>
                  <h4 className="font-semibold mb-2 capitalize">{filterType}</h4>
                  <div className="space-y-1">
                    {options.map((option) => (
                      <label key={option} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={(filters[filterType as keyof SearchFilters] as string[]).includes(option)}
                          onChange={() => handleFilterToggle(filterType as keyof SearchFilters, option)}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchBar;