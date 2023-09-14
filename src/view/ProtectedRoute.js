import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

  // -------------- protege las rutas y redirige a los usuarios si no se an logeado  -------------- //
export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <h1>Loading</h1>;

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
}
