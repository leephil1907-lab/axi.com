import { trpc } from "@/providers/trpc";
import { useCallback, useMemo, createContext, useContext, ReactNode } from "react";

// ── Auth Context ──────────────────────────────────────────
type AuthContextType = {
  user: any;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

// ── AuthProvider ──────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const utils = trpc.useUtils();
  const { data: user, isLoading } = trpc.localAuth.me.useQuery(undefined, { staleTime: 1000 * 60 * 5, retry: false });
  const logoutMutation = trpc.localAuth.logout.useMutation({ onSuccess: async () => { await utils.invalidate(); } });

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  const logout = useCallback(() => {
    localStorage.removeItem("local_auth_token");
    logoutMutation.mutate(undefined, { onSettled: () => window.location.reload() });
  }, [logoutMutation]);

  const value = useMemo(() => ({
    user,
    isAuthenticated,
    isAdmin,
    isLoading,
    logout,
  }), [user, isAuthenticated, isAdmin, isLoading, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ── useAuth Hook ──────────────────────────────────────────
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

