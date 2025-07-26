import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    // Header & Navigation
    'nav.home': 'Home',
    'nav.brands': 'Brands',
    'nav.women': 'Women',
    'nav.men': 'Men', 
    'nav.kids': 'Kids',
    'nav.sale': 'Sale',
    'nav.cart': 'Cart',
    'nav.orders': 'My Orders',
    
    // Hero Section
    'hero.title': 'Your Gateway to Global Fashion',
    'hero.subtitle': 'Delivered Locally.',
    'hero.cta': 'Start Shopping',
    'hero.trustBadge1': 'Pay on Delivery',
    'hero.trustBadge2': 'No Credit Card Needed',
    'hero.trustBadge3': 'Genuine Brands',
    'hero.trustBadge4': 'Local Support',
    
    // Brands Section
    'brands.title': 'Shop Global Brands',
    'brands.subtitle': 'Access the world\'s most loved fashion brands',
    
    // How It Works
    'howItWorks.title': 'How It Works',
    'howItWorks.step1.title': 'Browse & Select',
    'howItWorks.step1.desc': 'Explore brands and add items to cart',
    'howItWorks.step2.title': 'Easy Registration',
    'howItWorks.step2.desc': 'Simple details, no credit card required',
    'howItWorks.step3.title': 'Cash on Delivery',
    'howItWorks.step3.desc': 'Pay when you receive your order',
    
    // Products
    'products.newArrivals': 'New Arrivals',
    'products.trending': 'Trending Now',
    'products.exclusives': 'Local Exclusives',
    'products.addToCart': 'Add to Cart',
    'products.serviceFee': 'Service Fee',
    'products.originalPrice': 'Original Price',
    'products.finalPrice': 'Final Price',
    
    // Cart & Checkout
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.continueShopping': 'Continue Shopping',
    'cart.checkout': 'Checkout',
    'cart.total': 'Total',
    'cart.subtotal': 'Subtotal',
    'cart.serviceFee': 'Service Fee',
    
    // Checkout Form
    'checkout.title': 'Checkout',
    'checkout.deliveryInfo': 'Delivery Information',
    'checkout.firstName': 'First Name',
    'checkout.lastName': 'Last Name',
    'checkout.phone': 'Phone Number',
    'checkout.city': 'City',
    'checkout.address': 'Address',
    'checkout.notes': 'Delivery Notes (Optional)',
    'checkout.paymentMethod': 'Payment Method',
    'checkout.cashOnDelivery': 'Cash on Delivery',
    'checkout.placeOrder': 'Place Order',
    'checkout.whatsappOrder': 'Order via WhatsApp',
    
    // Order Tracking
    'orders.title': 'My Orders',
    'orders.orderNumber': 'Order #',
    'orders.status': 'Status',
    'orders.total': 'Total',
    'orders.date': 'Date',
    'orders.reorder': 'Reorder',
    'orders.viewDetails': 'View Details',
    
    // Order Status
    'status.received': 'Received',
    'status.verified': 'Verified',
    'status.processing': 'Processing',
    'status.outForDelivery': 'Out for Delivery',
    'status.delivered': 'Delivered',
    'status.paid': 'Paid',
    'status.cancelled': 'Cancelled',
    
    // Footer
    'footer.contact': 'Contact Us',
    'footer.whatsapp': 'WhatsApp Support',
    'footer.phone': 'Phone Support',
    'footer.followUs': 'Follow Us',
    'footer.terms': 'Terms & Conditions',
    'footer.privacy': 'Privacy Policy',
    'footer.faq': 'FAQ',
    'footer.poweredBy': 'Powered by BrandsGate',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.retry': 'Try Again',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.search': 'Search...',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.viewAll': 'View All',
  },
  ar: {
    // Header & Navigation
    'nav.home': 'الرئيسية',
    'nav.brands': 'الماركات',
    'nav.women': 'نساء',
    'nav.men': 'رجال',
    'nav.kids': 'أطفال',
    'nav.sale': 'تخفيضات',
    'nav.cart': 'السلة',
    'nav.orders': 'طلباتي',
    
    // Hero Section
    'hero.title': 'بوابتك إلى الموضة العالمية',
    'hero.subtitle': 'التوصيل لبابك',
    'hero.cta': 'ابدأ التسوق',
    'hero.trustBadge1': 'الدفع عند التوصيل',
    'hero.trustBadge2': 'لا حاجة لبطاقة ائتمان',
    'hero.trustBadge3': 'ماركات أصلية',
    'hero.trustBadge4': 'دعم محلي',
    
    // Brands Section
    'brands.title': 'تسوق الماركات العالمية',
    'brands.subtitle': 'احصل على أشهر ماركات الموضة في العالم',
    
    // How It Works
    'howItWorks.title': 'كيف يعمل',
    'howItWorks.step1.title': 'تصفح واختر',
    'howItWorks.step1.desc': 'استكشف الماركات وأضف العناصر للسلة',
    'howItWorks.step2.title': 'تسجيل سهل',
    'howItWorks.step2.desc': 'معلومات بسيطة، لا حاجة لبطاقة ائتمان',
    'howItWorks.step3.title': 'الدفع عند التوصيل',
    'howItWorks.step3.desc': 'ادفع عند استلام طلبك',
    
    // Products
    'products.newArrivals': 'وصولات جديدة',
    'products.trending': 'رائج الآن',
    'products.exclusives': 'حصريات محلية',
    'products.addToCart': 'أضف للسلة',
    'products.serviceFee': 'رسوم الخدمة',
    'products.originalPrice': 'السعر الأصلي',
    'products.finalPrice': 'السعر النهائي',
    
    // Cart & Checkout
    'cart.title': 'سلة التسوق',
    'cart.empty': 'سلتك فارغة',
    'cart.continueShopping': 'متابعة التسوق',
    'cart.checkout': 'إتمام الطلب',
    'cart.total': 'الإجمالي',
    'cart.subtotal': 'المجموع الجزئي',
    'cart.serviceFee': 'رسوم الخدمة',
    
    // Checkout Form
    'checkout.title': 'إتمام الطلب',
    'checkout.deliveryInfo': 'معلومات التوصيل',
    'checkout.firstName': 'الاسم الأول',
    'checkout.lastName': 'اسم العائلة',
    'checkout.phone': 'رقم الهاتف',
    'checkout.city': 'المدينة',
    'checkout.address': 'العنوان',
    'checkout.notes': 'ملاحظات التوصيل (اختياري)',
    'checkout.paymentMethod': 'طريقة الدفع',
    'checkout.cashOnDelivery': 'الدفع عند التوصيل',
    'checkout.placeOrder': 'تأكيد الطلب',
    'checkout.whatsappOrder': 'اطلب عبر واتساب',
    
    // Order Tracking
    'orders.title': 'طلباتي',
    'orders.orderNumber': 'رقم الطلب',
    'orders.status': 'الحالة',
    'orders.total': 'الإجمالي',
    'orders.date': 'التاريخ',
    'orders.reorder': 'إعادة الطلب',
    'orders.viewDetails': 'عرض التفاصيل',
    
    // Order Status
    'status.received': 'مستلم',
    'status.verified': 'مؤكد',
    'status.processing': 'قيد التحضير',
    'status.outForDelivery': 'في الطريق',
    'status.delivered': 'تم التوصيل',
    'status.paid': 'مدفوع',
    'status.cancelled': 'ملغي',
    
    // Footer
    'footer.contact': 'اتصل بنا',
    'footer.whatsapp': 'دعم واتساب',
    'footer.phone': 'دعم هاتفي',
    'footer.followUs': 'تابعنا',
    'footer.terms': 'الشروط والأحكام',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.faq': 'الأسئلة الشائعة',
    'footer.poweredBy': 'مدعوم من برانز غيت',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ ما',
    'common.retry': 'حاول مرة أخرى',
    'common.close': 'إغلاق',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.search': 'بحث...',
    'common.filter': 'تصفية',
    'common.sort': 'ترتيب',
    'common.viewAll': 'عرض الكل',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};