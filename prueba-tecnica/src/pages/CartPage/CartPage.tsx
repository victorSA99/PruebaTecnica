import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/services/order.service";
import Spinner from "@/components/Spinner";

const CartPage: React.FC = () => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleQuantityChange = (productId: string, value: number) => {
    if (value < 1) return;

    const updatedCart = cart.map((item) =>
      item.productId === productId ? { ...item, quantity: value } : item
    );

    setCart(updatedCart);
  };

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user.id;
      const status = "pending";

      const response = await createOrder({
        userId,
        status,
        items: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      });

      if (response.status === 201) {
        localStorage.removeItem("cart");
        setCart([]);

        navigate(`/home`);
      }
    } catch (error) {
      console.error("Error al crear la orden:", error);
    } finally {
      setLoading(false);
    }
  };
  if (cart.length === 0) {
    return <div className="p-6 text-gray-800">Tu carrito está vacío.</div>;
  }
  if (loading) {
    return <Spinner></Spinner>;
  }
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Carrito</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between border-b border-gray-300 pb-4 mb-4"
          >
            <div className="flex items-center space-x-4">
              {}
              <img
                src={`${item.picture}`}
                alt={`Producto ${item.productId}`}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h2 className="text-xl font-semibold">{`Producto ${item.productId}`}</h2>
                <p className="text-lg font-medium">${item.price}</p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.productId, item.quantity - 1)
                    }
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.productId, item.quantity + 1)
                    }
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-medium">
                ${Number(item.price) * item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-2xl font-bold">
          Total: $
          {cart.reduce(
            (total, item) => total + Number(item.price) * item.quantity,
            0
          )}
        </h2>
        <Button
          variant="default"
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={handleCheckout}
        >
          Finalizar compra
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
