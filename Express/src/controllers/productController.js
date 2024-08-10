import { Products } from "../models/index.js";

const createProduct = async (req, res) => {
  try {
    const product = await Products.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);

    res.status(500).json({ error: "Failed to create product" });
  }
};

const getProduct = async (req, res) => {
  try {
    const productos = await Products.findAll();
    res.status(200).json(productos);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { idproduct } = req.params;
    const product = await Products.findByPk(idproduct);
    if (!product) {
      return res.status(404).json({ error: "El producto no existe" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ error: "Failed to fetch product by ID" });
  }
};

const editProduct = async (req, res) => {
  try {
    const { idproduct } = req.params;
    const { body } = req;
    const product = await Products.findByPk(idproduct);
    if (!product) {
      return res.status(404).json({ error: "El producto no existe" });
    }
    await product.update(body);
    res.status(200).json(product);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { idproduct } = req.params;
    const product = await Products.findByPk(idproduct);
    if (!product) {
      return res.status(404).json({ error: "El producto no existe" });
    }

    // Eliminar el producto
    await product.destroy();

    // Enviar una respuesta de éxito
    res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

export {
  createProduct,
  getProduct,
  editProduct,
  deleteProduct,
  getProductById,
};
