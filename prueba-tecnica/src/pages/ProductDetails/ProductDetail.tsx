import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "@/services/product.service";
import { ProductResponseDTO } from "@/dtos/product.dto";
import Skeleton from "@/components/Skeleton";
import { Button } from "@/components/ui/button";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/services/order.service";

const ProductDetails: React.FC = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (productId) {
          const productData = await getProductById(productId);
          setProduct(productData);
        }
      } catch (err) {
        setError("Error al cargar los detalles del producto");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="p-6">
        <Skeleton className="w-full h-64" />
        <div className="mt-6">
          <Skeleton className="w-full h-8 mb-4" />
          <Skeleton className="w-1/2 h-6 mb-4" />
          <Skeleton className="w-1/3 h-6 mb-4" />
          <Skeleton className="w-full h-10 mt-4" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  if (!product) return null;

  const handleQuantityChange = (value: number) => {
    setQuantity((prev) =>
      Math.max(1, Math.min(prev + value, Number(product.amount)))
    );
  };

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      productId: product.id,
      quantity,
      price: product.price,
      picture: product.picture,
    });

    alert(`Añadido ${quantity} de ${product.name} al carrito`);
  };

  const handleBuyNow = async () => {
    setLoading(true);

    try {
      const userId = "1";
      const status = "pending";

      const response = await createOrder({
        userId,
        status,
        items: [{ productId: product.id, quantity, price: product.price }],
      });

      if (response.status === 201) {
        navigate(`/home`);
      }
    } catch (error) {
      console.error("Error al crear la orden:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <img
          src={product.picture}
          alt={product.name}
          className="w-full lg:w-1/2 h-80 object-cover rounded-lg shadow-lg"
        />
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-xl font-semibold text-gray-800 mb-4">
              ${product.price}
            </p>
            <p className="text-lg text-gray-600 mb-6">{product.description}</p>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4 mb-6">
              <label
                htmlFor="quantity"
                className="text-lg font-medium text-gray-800"
              >
                Cantidad:
              </label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="default"
                  className="bg-gray-300 text-gray-800 hover:bg-gray-400"
                  onClick={() => handleQuantityChange(-1)}
                >
                  <MinusIcon className="h-5 w-5" />
                </Button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  min="1"
                  readOnly
                  className="w-20 p-2 text-center border border-gray-300 rounded"
                />
                <Button
                  variant="default"
                  className="bg-gray-300 text-gray-800 hover:bg-gray-400"
                  onClick={() => handleQuantityChange(1)}
                >
                  <PlusIcon className="h-5 w-5" />
                </Button>
              </div>
              <span className="text-gray-600">
                Disponible: {product.amount}
              </span>
            </div>
            <div className="flex gap-4">
              <Button
                variant="default"
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleBuyNow}
              >
                Comprar ahora
              </Button>
              <Button
                variant="default"
                className="bg-green-600 text-white hover:bg-green-700"
                onClick={handleAddToCart}
              >
                Agregar al carrito
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
