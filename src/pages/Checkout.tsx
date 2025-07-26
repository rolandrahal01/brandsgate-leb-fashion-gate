import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

interface CheckoutForm {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [form, setForm] = useState<CheckoutForm>({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    address: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = form.firstName && form.lastName && form.phone && form.city && form.address;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    
    // Simulate order submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Store order in localStorage (will be replaced with backend)
    const order = {
      id: orderId,
      items,
      total: getCartTotal(),
      customerInfo: form,
      status: 'received',
      createdAt: new Date().toISOString()
    };
    
    const existingOrders = JSON.parse(localStorage.getItem('brandsgate-orders') || '[]');
    localStorage.setItem('brandsgate-orders', JSON.stringify([order, ...existingOrders]));
    
    clearCart();
    
    toast({
      title: "Order Placed Successfully!",
      description: `Order #${orderId} has been placed. You'll receive a confirmation message shortly.`,
    });
    
    navigate(`/orders/${orderId}`);
  };

  const generateWhatsAppMessage = () => {
    const orderDetails = items.map(item => 
      `${item.name} (${item.brand}) - ${item.selectedColor}, ${item.selectedSize} x${item.quantity}`
    ).join('\n');
    
    return `Hi! I'd like to place an order:\n\n${orderDetails}\n\nTotal: $${getCartTotal().toFixed(2)}\n\nCustomer Info:\n${form.firstName} ${form.lastName}\n${form.phone}\n${form.address}, ${form.city}\n\nNotes: ${form.notes}`;
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('checkout.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">{t('checkout.deliveryInfo')}</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="firstName">{t('checkout.firstName')}</Label>
                        <Input
                          id="firstName"
                          value={form.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">{t('checkout.lastName')}</Label>
                        <Input
                          id="lastName"
                          value={form.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      <div>
                        <Label htmlFor="phone">{t('checkout.phone')}</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">{t('checkout.city')}</Label>
                        <Input
                          id="city"
                          value={form.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Label htmlFor="address">{t('checkout.address')}</Label>
                      <Textarea
                        id="address"
                        value={form.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="mt-4">
                      <Label htmlFor="notes">{t('checkout.notes')}</Label>
                      <Textarea
                        id="notes"
                        value={form.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">{t('checkout.paymentMethod')}</h3>
                    <Card className="border-primary bg-primary/5">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full bg-primary"></div>
                          <span className="font-medium">{t('checkout.cashOnDelivery')}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Pay when you receive your order. No credit card needed.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={!isFormValid || isSubmitting}
                    >
                      {isSubmitting ? 'Processing...' : t('checkout.placeOrder')}
                    </Button>
                    <WhatsAppButton 
                      message={generateWhatsAppMessage()}
                      className="flex-1"
                    >
                      {t('checkout.whatsappOrder')}
                    </WhatsAppButton>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex justify-between text-sm">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-muted-foreground">{item.selectedColor}, {item.selectedSize} x{item.quantity}</div>
                      </div>
                      <div>${((item.price + item.serviceFee) * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;