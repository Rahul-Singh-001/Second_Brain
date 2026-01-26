import { useAuthStore } from "@/store/auth";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const { isAuthenticated, hasHydrated } = useAuthStore();

  if (!hasHydrated) return null;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
