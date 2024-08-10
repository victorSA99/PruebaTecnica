import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderItemResponseDto } from "@/dtos/order.dto";

interface OrderProductsProps {
  products: OrderItemResponseDto[];
}

const OrderProducts: React.FC<OrderProductsProps> = ({ products }) => {
  // Calcular el total de la compra
  const totalAmount = products
    .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 text-center">
        Detalles de la Orden
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((item) => (
          <Card
            key={item.productId}
            className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-lg overflow-hidden border border-gray-200"
          >
            <CardHeader className="relative p-0">
              <img
                src={item.product.picture}
                alt={item.product.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent rounded-t-lg opacity-50"></div>
              <div className="relative p-4">
                <CardTitle className="text-xl font-semibold text-white">
                  {item.product.name}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:justify-between mb-4">
                <p className="text-lg font-medium text-gray-800">Cantidad:</p>
                <p className="text-lg font-semibold text-green-600">
                  {item.quantity}
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between">
                <p className="text-lg font-medium text-gray-800">Precio:</p>
                <p className="text-lg text-gray-700">${item.price}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 p-6 bg-white shadow-md rounded-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Total de la Compra
        </h2>
        <p className="text-xl font-bold text-gray-800">
          Subtotal: ${totalAmount}
        </p>
      </div>
    </div>
  );
};

export default OrderProducts;
