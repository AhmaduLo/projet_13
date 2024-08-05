import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.user.token);

  if (!token) {
    // Si pas de token, redirige vers la page de connexion
    return <Navigate to="/login" replace />;
  }

  // Sinon, affiche le composant enfant
  return children;
};

export default PrivateRoute;