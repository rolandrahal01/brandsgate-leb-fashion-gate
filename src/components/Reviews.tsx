import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  location?: string;
}

interface ReviewsProps {
  className?: string;
}

const Reviews: React.FC<ReviewsProps> = ({ className = '' }) => {
  const { t, language } = useLanguage();

  const reviews: Review[] = [
    {
      id: '1',
      name: language === 'ar' ? 'سارة أحمد' : 'Sarah Ahmed',
      rating: 5,
      comment: language === 'ar' 
        ? 'خدمة ممتازة والمنتجات أصلية 100%. التوصيل سريع والدفع عند الاستلام مريح جداً'
        : 'Excellent service and 100% authentic products. Fast delivery and cash on delivery is very convenient',
      date: '2024-01-15',
      verified: true,
      location: language === 'ar' ? 'بيروت' : 'Beirut'
    },
    {
      id: '2',
      name: language === 'ar' ? 'محمد حسن' : 'Mohammad Hassan',
      rating: 5,
      comment: language === 'ar'
        ? 'أول مرة أطلب من الموقع وكانت التجربة رائعة. المنتجات بجودة عالية'
        : 'First time ordering and the experience was amazing. High quality products',
      date: '2024-01-12',
      verified: true,
      location: language === 'ar' ? 'طرابلس' : 'Tripoli'
    },
    {
      id: '3',
      name: language === 'ar' ? 'نور خليل' : 'Nour Khalil',
      rating: 4,
      comment: language === 'ar'
        ? 'الماركات العالمية بأسعار معقولة. خدمة العملاء ممتازة عبر الواتساب'
        : 'International brands at reasonable prices. Excellent customer service via WhatsApp',
      date: '2024-01-10',
      verified: true,
      location: language === 'ar' ? 'صيدا' : 'Sidon'
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'ar' ? 'آراء عملائنا' : 'What Our Customers Say'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'ar' 
              ? 'تجارب حقيقية من عملاء راضين عن خدماتنا'
              : 'Real experiences from satisfied customers'
            }
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <Card key={review.id} className="h-full">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src={review.avatar} />
                    <AvatarFallback>
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{review.name}</h4>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          {language === 'ar' ? 'مؤكد' : 'Verified'}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {renderStars(review.rating)}
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    {review.location && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {review.location}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-sm leading-relaxed">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
            <div className="flex">
              {renderStars(5)}
            </div>
            <span className="text-sm font-medium">
              {language === 'ar' ? '4.9/5 من 500+ تقييم' : '4.9/5 from 500+ reviews'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;