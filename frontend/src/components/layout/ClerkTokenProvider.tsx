// src/components/layout/ClerkTokenProvider.tsx
// Syncs the Clerk session JWT to the global api.ts token cache on mount
// so all API calls have auth headers even before Sidebar mounts.
'use client';

import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { setGlobalToken } from '@/lib/api';

export function ClerkTokenProvider({ children }: { children: React.ReactNode }) {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) return;

    const syncToken = async () => {
      try {
        const token = await getToken();
        setGlobalToken(token);
      } catch (err) {
        console.error('ClerkTokenProvider: failed to get token', err);
      }
    };

    syncToken();
    // Refresh before the default 60s expiry (every 50s)
    const interval = setInterval(syncToken, 50_000);
    return () => clearInterval(interval);
  }, [getToken, isSignedIn]);

  return <>{children}</>;
}
