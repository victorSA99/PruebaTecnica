// pages/OrderDetails/OrderDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getOrderByItems } from "@/services/order.service"; // Asegúrate de que la ruta es correcta
import { OrderItemResponseDto } from "@/dtos/order.dto";
import OrderProducts from "@/components/OrderProducts";
import Spinner from "@/components/Spinner";

const OrderDetails: React.FC = () => {
  const { orderId } = useParams();
  const [products, setProducts] = useState<OrderItemResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderProducts = async () => {
      try {
        if (orderId) {
          const products = await getOrderByItems(orderId);
          setProducts(products);
        }
      } catch (err) {
        setError("Error al cargar los productos de la orden");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderProducts();
  }, [orderId]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Detalles de la Orden {orderId}
      </h1>
      <OrderProducts products={products} />
    </div>
  );
};

export default OrderDetails;
