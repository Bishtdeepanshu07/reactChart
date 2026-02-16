import { ReactNode, useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  triggerKey?: string; // Change this to re-trigger animation
}

const AnimatedCard = ({ children, className, delay = 0, triggerKey }: AnimatedCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const prevKey = useRef(triggerKey);

  useEffect(() => {
    // Reset and re-animate when triggerKey changes
    if (prevKey.current !== triggerKey) {
      setIsVisible(false);
      prevKey.current = triggerKey;
    }

    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay, triggerKey]);

  return (
    <div
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-6 scale-[0.96]',
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
