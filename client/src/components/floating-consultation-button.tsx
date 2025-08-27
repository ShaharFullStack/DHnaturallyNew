import { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';
import { t } from '@/lib/i18n';

export function FloatingConsultationButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { language } = useLanguage();
  const { buttonPress, success } = useHapticFeedback();

  const consultationOptions = [
    {
      id: 'whatsapp',
      label: t('consultation.whatsapp', language) || 'WhatsApp Consultation',
      icon: MessageCircle,
      action: () => {
        success(); // Haptic feedback for successful action
        // WhatsApp link with pre-filled message
        const message = encodeURIComponent(t('consultation.whatsappMessage', language) || 'Hello, I would like to schedule a consultation about natural remedies.');
        window.open(`https://wa.me/972123456789?text=${message}`, '_blank');
      },
      bgColor: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
    },
    {
      id: 'phone',
      label: t('consultation.phone', language) || 'Phone Consultation',
      icon: Phone,
      action: () => {
        success(); // Haptic feedback for successful action
        window.open('tel:+972123456789', '_self');
      },
      bgColor: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
    },
  ];

  const toggleExpanded = () => {
    buttonPress(); // Haptic feedback for button press
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      {/* Consultation Options */}
      {isExpanded && (
        <div className="flex flex-col space-y-2 animate-in slide-in-from-bottom-2 duration-200">
          {consultationOptions.map((option) => (
            <Button
              key={option.id}
              onClick={option.action}
              className={`
                ${option.bgColor} ${option.hoverColor}
                text-white shadow-lg
                min-h-[48px] px-4 py-3
                rounded-full flex items-center space-x-2
                transition-all duration-200
                hover:scale-105 active:scale-95
                whitespace-nowrap
              `}
            >
              <option.icon className="h-5 w-5" />
              <span className="font-medium">{option.label}</span>
            </Button>
          ))}
        </div>
      )}

      {/* Main Toggle Button */}
      <Button
        onClick={toggleExpanded}
        className={`
          bg-dh-sage hover:bg-dh-sage/90
          text-white shadow-xl
          min-w-[56px] min-h-[56px] 
          rounded-full p-4
          transition-all duration-300
          hover:scale-110 active:scale-95
          ${isExpanded ? 'rotate-45' : 'rotate-0'}
        `}
        aria-label={isExpanded ? 'Close consultation menu' : 'Open consultation menu'}
      >
        {isExpanded ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>

      {/* Pulsing Animation Ring */}
      {!isExpanded && (
        <div className="
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-14 h-14 rounded-full
          bg-dh-sage/30 animate-ping
          pointer-events-none
        " />
      )}
    </div>
  );
}