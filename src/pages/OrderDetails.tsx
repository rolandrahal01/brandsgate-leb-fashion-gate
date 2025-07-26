import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Order {
  id: string;
  items: any[];
  total: number;
  customerInfo: any;
  status: string;
  createdAt: string;
}

const statusSteps = [
  { key: 'received', icon: Package, label: 'Received' },
  { key: 'verified', icon: CheckCircle, label: 'Verified' },
  { key: 'processing', icon: Clock, label: 'Processing' },
  { key: 'outForDelivery', icon: Truck, label: 'Out for Delivery' },
  { key: 'delivered', icon: CheckCircle, label: 'Delivered' },
  { key: 'paid', icon: CheckCircle, label: 'Paid' }
];

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const savedOrders = localStorage.getItem('brandsgate-orders');
    if (savedOrders) {
      const orders = JSON.parse(savedOrders);
      const foundOrder = orders.find((o: Order) => o.id === orderId);
      setOrder(foundOrder || null);
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">Order not found</h2>
            <Button onClick={() => navigate('/orders')}>
              Back to Orders
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentStatusIndex = statusSteps.findIndex(step => step.key === order.status);
  const progress = currentStatusIndex >= 0 ? ((currentStatusIndex + 1) / statusSteps.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/orders')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Button>
          <h1 className="text-3xl font-bold">Order #{order.id}</h1>
          <p className="text-muted-foreground">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={progress} className="h-2" />
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {statusSteps.map((step, index) => {
                      const Icon = step.icon;
                      const isCompleted = index <= currentStatusIndex;
                      const isCurrent = index === currentStatusIndex;
                      
                      return (
                        <div key={step.key} className="text-center">
                          <div className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                            isCompleted 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted text-muted-foreground'
                          } ${isCurrent ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className={`text-xs ${isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>
                            {t(`status.${step.key}`)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-4 p-4 border rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>Color: {item.selectedColor}</span>
                          <span>Size: {item.selectedSize}</span>
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          ${((item.price + item.serviceFee) * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ${item.price} + ${item.serviceFee} service fee
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span>${order.items.reduce((sum, item) => sum + (item.serviceFee * item.quantity), 0).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Name:</span> {order.customerInfo.firstName} {order.customerInfo.lastName}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span> {order.customerInfo.phone}
                  </div>
                  <div>
                    <span className="font-medium">City:</span> {order.customerInfo.city}
                  </div>
                  <div>
                    <span className="font-medium">Address:</span> {order.customerInfo.address}
                  </div>
                  {order.customerInfo.notes && (
                    <div>
                      <span className="font-medium">Notes:</span> {order.customerInfo.notes}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderDetails;