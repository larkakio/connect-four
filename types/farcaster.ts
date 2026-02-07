export interface FarcasterUser {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl: string;
  bio?: string;
}

export interface FarcasterContext {
  user: FarcasterUser | null;
  isReady: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface MiniAppSDK {
  actions: {
    ready: () => void;
    openUrl: (url: string) => void;
  };
  context: {
    user: FarcasterUser;
  };
}
