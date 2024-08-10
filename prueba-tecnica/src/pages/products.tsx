import React, { useState, useEffect } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/services/product.service";
import { CreateProductDTO, ProductResponseDTO } from "@/dtos/product.dto";

const Products = () => {
  const [products, setProducts] = useState<ProductResponseDTO[]>([]);
  const [newProduct, setNewProduct] = useState<CreateProductDTO>({
    name: "",
    amount: "",
    price: "",
    description: "",
    picture: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    setLoading(true);
    setError(null);

    try {
      if (isEditing && editIndex !== null) {
        // Editar producto
        const productId = products[editIndex].id;
        await updateProduct(productId, newProduct);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        // Crear producto
        await createProduct(newProduct);
      }
      await fetchProducts(); // Volver a cargar los productos desde el servidor
      setNewProduct({
        name: "",
        amount: "",
        price: "",
        description: "",
        picture: "",
      });
    } catch (error) {
      setError("Error al guardar el producto.");
      console.error("Error al guardar el producto:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (index: number) => {
    setNewProduct(products[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDeleteProduct = async (index: number) => {
    setLoading(true);
    setError(null);

    try {
      const productId = products[index].id;
      console.log(productId);
      await deleteProduct(productId);
      await fetchProducts(); // Volver a cargar los productos desde el servidor
    } catch (error) {
      setError("Error al eliminar el producto.");
      console.error("Error al eliminar el producto:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <div className="grid grid-cols-1 gap-4 mb-4">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Nombre del producto"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="amount"
          value={newProduct.amount}
          onChange={handleInputChange}
          placeholder="Cantidad"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          placeholder="Precio"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          placeholder="Descripción"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="picture"
          value={newProduct.picture}
          onChange={handleInputChange}
          placeholder="URL de la imagen"
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleAddProduct}
          className="p-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {isEditing ? "Guardar Cambios" : "Agregar Producto"}
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Imagen</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Cantidad</th>
            <th className="py-2 px-4 border-b">Precio</th>
            <th className="py-2 px-4 border-b">Descripción</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">
                <img
                  src={product.picture}
                  alt={product.name}
                  className="w-20 h-20 object-cover"
                />
              </td>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.amount}</td>
              <td className="py-2 px-4 border-b">${product.price}</td>
              <td className="py-2 px-4 border-b">{product.description}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button
                  onClick={() => handleEditProduct(products.indexOf(product))}
                  className="p-1 bg-yellow-500 text-white rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteProduct(products.indexOf(product))}
                  className="p-1 bg-red-500 text-white rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
