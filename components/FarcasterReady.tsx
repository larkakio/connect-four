'use client';

import { useEffect } from 'react';

export function FarcasterReady() {
  useEffect(() => {
    // Notify Farcaster that the mini app is ready
    import('@farcaster/miniapp-sdk')
      .then(({ sdk }) => {
        sdk.actions.ready().catch(() => {
          // Silently fail if not in Farcaster context
        });
      })
      .catch(() => {
        // SDK not available, probably in browser
      });
  }, []);

  return null;
}
