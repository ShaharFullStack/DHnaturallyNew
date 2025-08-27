import { useCallback } from 'react';

// Haptic feedback patterns for different interactions
export const hapticPatterns = {
  light: [10], // Quick tap
  medium: [50], // Button press
  heavy: [100], // Important action
  success: [20, 10, 20], // Success feedback
  error: [100, 50, 100], // Error feedback
  selection: [30], // Item selection
} as const;

export type HapticPattern = keyof typeof hapticPatterns;

export function useHapticFeedback() {
  const triggerHaptic = useCallback((pattern: HapticPattern = 'light') => {
    // Check if device supports haptic feedback
    if (!('vibrate' in navigator)) {
      return;
    }

    // Check if user has enabled haptics (respect system preferences)
    if ('permissions' in navigator && 'query' in navigator.permissions) {
      navigator.permissions.query({ name: 'vibrate' } as any).then((result) => {
        if (result.state === 'granted') {
          navigator.vibrate(hapticPatterns[pattern]);
        }
      }).catch(() => {
        // Fallback: trigger without permission check
        navigator.vibrate(hapticPatterns[pattern]);
      });
    } else {
      // Fallback for browsers without permission API
      navigator.vibrate(hapticPatterns[pattern]);
    }
  }, []);

  // Specific haptic helpers for common UI interactions
  const hapticHelpers = {
    buttonPress: () => triggerHaptic('medium'),
    success: () => triggerHaptic('success'),
    error: () => triggerHaptic('error'),
    selection: () => triggerHaptic('selection'),
    lightTap: () => triggerHaptic('light'),
    heavyPress: () => triggerHaptic('heavy'),
  };

  return {
    triggerHaptic,
    ...hapticHelpers,
  };
}

// Custom hook for touch interactions with haptic feedback
export function useTouchWithHaptic() {
  const { triggerHaptic } = useHapticFeedback();

  const handleTouchStart = useCallback((pattern: HapticPattern = 'light') => {
    triggerHaptic(pattern);
  }, [triggerHaptic]);

  const touchHandlers = {
    onTouchStart: () => handleTouchStart('light'),
    onTouchEnd: () => {}, // No haptic on touch end to avoid double feedback
  };

  return {
    handleTouchStart,
    touchHandlers,
  };
}