import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Calendar, DollarSign } from 'lucide-react';
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

const statusColors = {
  received: 'bg-blue-100 text-blue-800',
  verified: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-purple-100 text-purple-800',
  outForDelivery: 'bg-orange-100 text-orange-800',
  delivered: 'bg-green-100 text-green-800',
  paid: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-red-100 text-red-800'
};

const Orders = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('brandsgate-orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <Package className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-4">Start shopping to see your orders here</p>
            <Button onClick={() => navigate('/')}>
              Start Shopping
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
        <h1 className="text-3xl font-bold mb-6">{t('orders.title')}</h1>
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/orders/${order.id}`)}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{t('orders.orderNumber')}{order.id}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={statusColors[order.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}>
                      {t(`status.${order.status}`)}
                    </Badge>
                    <div className="flex items-center gap-1 text-lg font-semibold mt-2">
                      <DollarSign className="w-4 h-4" />
                      {order.total.toFixed(2)}
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-2 text-sm">
                  <div className="text-muted-foreground">
                    {order.items.length} items • {order.customerInfo.firstName} {order.customerInfo.lastName}
                  </div>
                  <div className="flex gap-2">
                    {order.items.slice(0, 3).map((item, index) => (
                      <img 
                        key={index}
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded border"
                      />
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-12 h-12 bg-muted rounded border flex items-center justify-center text-xs">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/orders/${order.id}`);
                  }}>
                    {t('orders.viewDetails')}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    // Reorder functionality
                  }}>
                    {t('orders.reorder')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;