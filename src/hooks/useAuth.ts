import { trpc } from "@/providers/trpc";
import { useCallback, useMemo } from "react";

export function useAuth() {
  const utils = trpc.useUtils();
  const { data: user, isLoading } = trpc.localAuth.me.useQuery(undefined, { staleTime: 1000 * 60 * 5, retry: false });
  const logoutMutation = trpc.localAuth.logout.useMutation({ onSuccess: async () => { await utils.invalidate(); } });

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  const logout = useCallback(() => {
    localStorage.removeItem("local_auth_token");
    logoutMutation.mutate(undefined, { onSettled: () => window.location.reload() });
  }, [logoutMutation]);

  return useMemo(() => ({ user, isAuthenticated, isAdmin, isLoading, logout }), [user, isAuthenticated, isAdmin, isLoading, logout]);
}
