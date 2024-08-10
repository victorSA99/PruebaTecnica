import express from "express";
import {
  createOrder,
  getOrderByUser,
  getOrderItems,
} from "../controllers/orderController.js";
import { protegerRuta } from "../middleware/index.js";
import validateOrderFields from "../middleware/Validations/validateOrder.js";
const routerOrder = express.Router();

routerOrder.post(
  "/createorder",
  protegerRuta,
  validateOrderFields,
  createOrder
);
routerOrder.get("/getorderbyuser/:userId", protegerRuta, getOrderByUser);
routerOrder.get("/getorderitem/:orderId", protegerRuta, getOrderItems);

export default routerOrder;
