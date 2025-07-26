import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, getCartSubtotal, getTotalServiceFee, getCartTotal } = useCart();
  const { t, isRTL } = useLanguage();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">{t('cart.empty')}</h2>
            <Button onClick={() => navigate('/')} className="mt-4">
              {t('cart.continueShopping')}
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6">{t('cart.title')}</h1>
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                        <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                          <span>Color: {item.selectedColor}</span>
                          <span>Size: {item.selectedSize}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive ml-auto"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          ${item.price} + ${item.serviceFee}
                        </div>
                        <div className="font-semibold">
                          ${((item.price + item.serviceFee) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t('cart.subtotal')}</span>
                    <span>${getCartSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('cart.serviceFee')}</span>
                    <span>${getTotalServiceFee().toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>{t('cart.total')}</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-6" 
                  size="lg"
                  onClick={() => navigate('/checkout')}
                >
                  {t('cart.checkout')}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => navigate('/')}
                >
                  {t('cart.continueShopping')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;