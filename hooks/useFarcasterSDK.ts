"use client";

import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { FarcasterContext, FarcasterUser } from "@/types/farcaster";

export function useFarcasterSDK(): FarcasterContext {
  const { address } = useAccount();
  const [user, setUser] = useState<FarcasterUser | null>(null);

  useEffect(() => {
    if (address) {
      const label = `${address.slice(0, 6)}…${address.slice(-4)}`;
      setUser({
        fid: 0,
        username: label,
        displayName: label,
        pfpUrl: "",
      });
    } else {
      setUser(null);
    }
  }, [address]);

  return {
    user,
    isReady: true,
    isLoading: false,
    error: null,
  };
}
