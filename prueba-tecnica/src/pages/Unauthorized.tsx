import React from "react";
import { Link } from "react-router-dom";

const Unauthorized: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-600 text-white text-center">
      <h1 className="text-4xl font-bold mb-4">Acceso Denegado</h1>
      <p className="text-lg mb-8">
        No tienes permiso para acceder a esta página.
      </p>
      <Link
        to="/login"
        className="px-6 py-3 bg-white text-red-600 font-semibold rounded-md shadow hover:bg-red-100"
      >
        Iniciar Sesión
      </Link>
    </div>
  );
};

export default Unauthorized;
