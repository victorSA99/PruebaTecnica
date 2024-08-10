// pages/Home/Home.tsx
import React, { useEffect, useState } from "react";
import ProductList from "@/components/ProductList";
import { Producto } from "@/interfaces/producto";
import { getProducts } from "@/services/product.service";

export const Home: React.FC = () => {
  const [productos, setProductos] = useState<Producto[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProductos(response);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Productos</h1>
      <ProductList products={productos} loading={loading} />
    </div>
  );
};
