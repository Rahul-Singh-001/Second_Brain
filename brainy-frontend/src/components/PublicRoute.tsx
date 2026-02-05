import { useAuthStore } from "@/store/auth";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const { isAuthenticated } = useAuthStore();


  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
