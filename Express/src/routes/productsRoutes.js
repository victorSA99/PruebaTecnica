import express from "express";
import { protegerRuta } from "../middleware/index.js";
import ValidateProduct from "../middleware/Validations/ValidateProduct.js";
import {
  getProduct,
  createProduct,
  getProductById,
  editProduct,
  deleteProduct,
} from "../controllers/productController.js";
const routerProducts = express.Router();

routerProducts.post(
  "/createproduct",
  protegerRuta,
  ValidateProduct,
  createProduct
);
routerProducts.get("/getproducts", protegerRuta, getProduct);
routerProducts.get("/getproductbyid/:idproduct", protegerRuta, getProductById);
routerProducts.patch("/editproduct/:idproduct", editProduct);
routerProducts.delete("/deleteproduct/:idproduct", protegerRuta, deleteProduct);

export default routerProducts;
