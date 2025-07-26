import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  message?: string;
  phoneNumber?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'floating';
  size?: 'sm' | 'default' | 'lg' | 'icon';
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  message = "Hi! I'm interested in your products.",
  phoneNumber = "+96176123456", // Default Lebanon number
  children,
  className = '',
  variant = 'default',
  size = 'default'
}) => {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (variant === 'floating') {
    return (
      <Button
        onClick={handleWhatsAppClick}
        className={`fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">WhatsApp Support</span>
      </Button>
    );
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      variant={variant}
      size={size}
      className={`bg-green-500 hover:bg-green-600 text-white ${className}`}
    >
      <MessageCircle className="h-4 w-4 mr-2" />
      {children || 'WhatsApp'}
    </Button>
  );
};

export default WhatsAppButton;