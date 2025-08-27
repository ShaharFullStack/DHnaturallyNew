import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { buttonPress } = useHapticFeedback();

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user scrolls down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    buttonPress(); // Haptic feedback
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2 pointer-events-none'
    }`}>
      <Button
        onClick={scrollToTop}
        size="lg"
        className="w-14 h-14 rounded-full bg-dh-ocean hover:bg-dh-navy text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        aria-label="חזור לראש הדף"
        data-testid="scroll-to-top-button"
      >
        <ChevronUp className="h-6 w-6 group-hover:animate-bounce" />
      </Button>
      
      {/* Subtle backdrop glow effect */}
      <div className="absolute inset-0 bg-dh-ocean/20 rounded-full blur-xl scale-150 -z-10 opacity-50"></div>
    </div>
  );
}
