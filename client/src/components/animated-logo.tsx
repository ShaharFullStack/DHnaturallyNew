import { cn } from '@/lib/utils';

interface AnimatedLogoProps {
  variant?: 'header' | 'hero';
  className?: string;
  blendMode?: 'screen' | 'multiply' | 'overlay' | 'soft-light' | 'normal';
}

export function AnimatedLogo({ 
  variant = 'header', 
  className, 
  blendMode = 'screen' 
}: AnimatedLogoProps) {
  const videoSrc = variant === 'header' ? '/assets/animatedLogo2.mp4' : '/assets/animatedLogo.mp4';
  const size = variant === 'header' ? 'w-12 h-12' : 'w-24 h-24 lg:w-60 lg:h-60';
  
  // Enhanced blend classes based on variant
  const blendClass = variant === 'hero' ? 'logo-hero-blend' : 'logo-screen-blend';
  
  return (
    <video 
      src={videoSrc}
      autoPlay 
      loop 
      muted 
      playsInline
      className={cn(size, 'rounded-lg', blendClass, className)}
      aria-label={`DHnaturally ${variant === 'header' ? 'Navigation' : 'Hero'} Animated Logo`}
    />
  );
}
