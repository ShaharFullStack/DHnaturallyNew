import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl = "https://wa.me/972586572451";

  return (
    <div 
      className="whatsapp-bubble fixed bottom-6 left-6 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid="whatsapp-button"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Send WhatsApp message"
      >
        <MessageCircle className="h-8 w-8" />
      </a>
      
      <div className={`tooltip absolute bottom-20 left-0 bg-white p-3 rounded-lg shadow-lg min-w-max transition-all duration-300 ${
        isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
      }`}>
        <p className="text-sm text-gray-700 whitespace-nowrap">
          שלחו לנו הודעה בווטסאפ!
        </p>
        <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
      </div>
    </div>
  );
}
