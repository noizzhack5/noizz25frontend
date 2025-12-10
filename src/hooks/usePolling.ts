import { useEffect, useRef, useCallback } from 'react';

interface UsePollingOptions {
  interval?: number; // Polling interval in ms
  enabled?: boolean; // Whether polling is enabled
  pauseOnHidden?: boolean; // Pause when tab is not visible
}

/**
 * Custom hook for polling data at regular intervals
 * Features:
 * - Pauses when browser tab is hidden (visibility API)
 * - Resumes immediately when tab becomes visible
 * - Cleanup on unmount
 * - Configurable interval
 */
export function usePolling(
  pollFn: () => Promise<void>,
  options: UsePollingOptions = {}
) {
  const {
    interval = 5000,
    enabled = true,
    pauseOnHidden = true,
  } = options;

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPollingRef = useRef(false);

  const poll = useCallback(async () => {
    // Prevent overlapping polls
    if (isPollingRef.current) return;
    
    isPollingRef.current = true;
    try {
      await pollFn();
    } finally {
      isPollingRef.current = false;
    }
  }, [pollFn]);

  const startPolling = useCallback(() => {
    if (intervalRef.current) return; // Already polling
    
    intervalRef.current = setInterval(() => {
      poll();
    }, interval);
  }, [poll, interval]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Handle visibility change
  useEffect(() => {
    if (!enabled || !pauseOnHidden) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopPolling();
      } else {
        // Immediately poll when tab becomes visible again
        poll();
        startPolling();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [enabled, pauseOnHidden, poll, startPolling, stopPolling]);

  // Start/stop polling based on enabled state
  useEffect(() => {
    if (!enabled) {
      stopPolling();
      return;
    }

    // Only start if tab is visible (or we don't care about visibility)
    if (!pauseOnHidden || !document.hidden) {
      startPolling();
    }

    return () => {
      stopPolling();
    };
  }, [enabled, pauseOnHidden, startPolling, stopPolling]);

  return {
    poll, // Manual poll trigger
    isPolling: isPollingRef.current,
  };
}

