// components/ProductList.tsx
import React from "react";
import ProductCard from "./ProductCard";
import { Producto } from "@/interfaces/producto";

interface ProductListProps {
  products: Producto[] | null;
  loading: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, loading }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {loading &&
        Array(3)
          .fill(null)
          .map((_, index) => (
            <ProductCard key={index} product={null} loading={true} />
          ))}
      {!loading &&
        products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} loading={false} />
        ))}
    </div>
  );
};

export default ProductList;
