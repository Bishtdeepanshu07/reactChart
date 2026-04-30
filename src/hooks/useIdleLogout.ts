import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

/**
 * Logs the user out and redirects to the landing page after a period of inactivity.
 * @param enabled Whether the idle logout is active (e.g. only for non-admin users).
 * @param timeoutMs Inactivity threshold in milliseconds (default 7 minutes).
 */
export const useIdleLogout = (enabled: boolean, timeoutMs: number = 7 * 60 * 1000) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleLogout = async () => {
      try {
        await signOut();
      } finally {
        toast({
          title: 'Signed out',
          description: 'You were logged out due to 7 minutes of inactivity.',
        });
        navigate('/', { replace: true });
      }
    };

    const reset = () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(handleLogout, timeoutMs);
    };

    const events: (keyof WindowEventMap)[] = [
      'mousemove',
      'mousedown',
      'keydown',
      'touchstart',
      'scroll',
      'wheel',
      'click',
    ];

    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, [enabled, timeoutMs, signOut, navigate]);
};
