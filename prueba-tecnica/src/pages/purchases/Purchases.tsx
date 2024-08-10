// pages/Purchases/Purchases.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getOrderByUser } from "@/services/order.service";
import { OrderResponseDTO } from "@/dtos/order.dto";
import { useAuth } from "@/components/AuthProvider";
import Spinner from "@/components/Spinner";

export const Purchases: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [purchases, setPurchases] = useState<OrderResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const userString = localStorage.getItem("user");
      if (!userString) {
        throw new Error("Usuario no encontrado en localStorage");
      }

      // Parsear el usuario y obtener el ID
      const user = JSON.parse(userString);
      const userId = user.id; // Ajusta esto según la estructura de tu objeto de usuario

      if (!userId) {
        throw new Error("ID de usuario no encontrado en localStorage");
      }

      // Obtener las órdenes del usuario
      const orders = await getOrderByUser(userId);
      setPurchases(orders);
    } catch (err) {
      setError("Error al cargar las órdenes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setError("Usuario no autenticado");
      setLoading(false);
      return;
    }

    fetchOrders();
  }, [isAuthenticated]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {purchases.length > 0 ? (
        purchases.map((purchase) => (
          <Link
            key={purchase.id}
            to={`/order/${purchase.id}`}
            className="no-underline"
          >
            <Card className="w-full bg-white shadow-lg hover:shadow-xl transition-shadow rounded-lg overflow-hidden cursor-pointer">
              <CardHeader className="p-4">
                <CardTitle className="text-xl font-bold text-gray-900">
                  Orden ID: {purchase.id}
                </CardTitle>
                <p className="text-sm text-gray-500">
                  Creado el: {new Date(purchase.createdAt).toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-lg text-gray-800">
                  Monto Total: ${purchase.totalAmount}
                </p>
                <p
                  className={`text-md font-semibold mt-2 ${
                    purchase.status === "completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  Estado: {purchase.status}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))
      ) : (
        <p className="text-gray-600">No hay órdenes disponibles</p>
      )}
    </div>
  );
};

export default Purchases;
