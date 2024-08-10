import React from "react";
import { Producto } from "@/interfaces/producto";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Skeleton from "@/components/Skeleton";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Producto | null;
  loading: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, loading }) => {
  if (loading) {
    return (
      <Card className="w-80 bg-white shadow-lg rounded-lg overflow-hidden">
        <Skeleton className="w-full h-48" />
        <CardContent className="p-6">
          <Skeleton className="h-6 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-10 w-full mt-4" />
        </CardContent>
      </Card>
    );
  }

  if (!product) return null;

  return (
    <Card className="w-80 bg-white shadow-lg hover:shadow-xl transition-shadow rounded-lg overflow-hidden">
      <CardHeader className="p-0">
        <img
          src={product.picture}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-2xl font-bold text-gray-900">
          {product.name}
        </CardTitle>
        <p className="text-lg text-gray-600 my-2">${product.price}</p>
        <Link to={`/product/${product.id}`}>
          <Button
            variant="default"
            className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Ver detalles
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
