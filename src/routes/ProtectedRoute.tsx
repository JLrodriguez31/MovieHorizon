import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";
import type { JSX } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading, isGuest } = useAuth();

  if (loading) return <p>Cargando...</p>;
  if (!user && !isGuest) return <Navigate to="/login" />;

  return children;
}
