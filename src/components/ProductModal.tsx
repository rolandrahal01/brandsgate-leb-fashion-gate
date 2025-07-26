import React, { useState } from 'react';
import { Product } from '@/contexts/CartContext';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Minus, Plus, Heart, Share2 } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  React.useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0] || '');
      setSelectedSize(product.sizes[0] || '');
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast({
        title: "Please select options",
        description: "Please select both color and size before adding to cart.",
        variant: "destructive"
      });
      return;
    }

    addToCart(product, selectedColor, selectedSize, quantity);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            {product.isExclusive && (
              <Badge className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                {t('products.exclusives')}
              </Badge>
            )}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">{product.brand}</p>
              <h1 className="text-2xl font-bold mt-1">{product.name}</h1>
              <p className="text-sm text-muted-foreground mt-2">{product.category}</p>
            </div>

            {/* Pricing */}
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t('products.originalPrice')}</span>
                    <span className="font-semibold">${product.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('products.serviceFee')}</span>
                    <span className="font-semibold">${product.serviceFee}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold">
                    <span>{t('products.finalPrice')}</span>
                    <span>${(product.price + product.serviceFee).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold mb-3">Color</h3>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                    className="capitalize"
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-3">Size</h3>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className="uppercase"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3">
              <Button 
                onClick={handleAddToCart}
                className="w-full" 
                size="lg"
                disabled={!selectedColor || !selectedSize}
              >
                {t('products.addToCart')} • ${((product.price + product.serviceFee) * quantity).toFixed(2)}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Free delivery on orders over $100 • Pay on delivery available
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;