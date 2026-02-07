import { useState, useEffect } from 'react';
import { FarcasterContext, FarcasterUser } from '@/types/farcaster';

declare global {
  interface Window {
    farcaster?: {
      actions: {
        ready: () => void;
        openUrl: (url: string) => void;
      };
      context: {
        user: FarcasterUser;
      };
    };
  }
}

export function useFarcasterSDK(): FarcasterContext {
  const [context, setContext] = useState<FarcasterContext>({
    user: null,
    isReady: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const initFarcaster = async () => {
      try {
        // Check if running in Farcaster mini app
        if (typeof window === 'undefined') {
          return;
        }

        // Wait for SDK to be available
        const maxAttempts = 50;
        let attempts = 0;

        const checkSDK = () => {
          if (window.farcaster) {
            // Notify Farcaster that the mini app is ready
            window.farcaster.actions.ready();
            
            // Get user context
            const user = window.farcaster.context?.user || null;
            
            setContext({
              user,
              isReady: true,
              isLoading: false,
              error: null,
            });
          } else {
            attempts++;
            if (attempts < maxAttempts) {
              setTimeout(checkSDK, 100);
            } else {
              // Not in Farcaster environment, use mock data for development
              setContext({
                user: {
                  fid: 1,
                  username: 'player',
                  displayName: 'Player',
                  pfpUrl: '',
                },
                isReady: true,
                isLoading: false,
                error: null,
              });
            }
          }
        };

        checkSDK();
      } catch (error) {
        setContext({
          user: null,
          isReady: false,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to initialize Farcaster SDK',
        });
      }
    };

    initFarcaster();
  }, []);

  return context;
}
