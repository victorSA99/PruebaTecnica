import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

interface ProtectedRouteProps {
  element: JSX.Element;
  allowedRoles: string[]; // Roles permitidos para acceder a la ruta
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  allowedRoles,
}) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user && allowedRoles.includes(user.rol)) {
    return element;
  }

  return <Navigate to="/unauthorized" />; // Redirige a una página de acceso denegado si el usuario no tiene el rol adecuado
};

export default ProtectedRoute;
