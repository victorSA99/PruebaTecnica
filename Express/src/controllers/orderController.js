import { Products } from "../models/index.js";
import Orders from "../models/Orders.js";
import OrderItems from "../models/OrderItems.js";

const createOrder = async (req, res) => {
  const { userId, status, items } = req.body;
  if (!userId || !items || !items.length) {
    return res
      .status(400)
      .json({ error: "User ID and order items are required" });
  }

  try {
    // Calcular el total de la orden
    const totalAmount = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Crear la orden
    const order = await Orders.create({
      userId,
      totalAmount,
      status,
    });

    // Crear elementos de la orden
    const orderItemsPromises = items.map((item) => {
      return OrderItems.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    });

    const updateProductPromises = items.map(async (item) => {
      const product = await Products.findByPk(item.productId);
      if (product) {
        product.amount -= item.quantity;
        await product.save();
      }
    });

    await Promise.all([...orderItemsPromises, ...updateProductPromises]);

    res.status(201).json(order);
  } catch (error) {
    console.error("Error al crear la orden:", error);
    res.status(500).json({ error: "Error al crear la orden" });
  }
};

const getOrderByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const orders = await Orders.findAll({
      where: { userId },
    });

    if (orders.length === 0) {
      return res.status(404).json({ error: "El usuario no tiene ordenes" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error al obtener las ordenes del usuario:", error);
    res.status(500).json({ error: "Error al obtener las ordenes del usuario" });
  }
};

const getOrderItems = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Orders.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order no encontrada" });
    }

    const orderItems = await OrderItems.findAll({
      where: { orderId },
      include: [
        {
          model: Products,
          attributes: ["id", "name", "price", "picture"],
        },
      ],
    });

    const products = orderItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      product: {
        id: item.product.id,
        name: item.product.name,

        price: item.product.price,
        picture: item.product.picture,
      },
    }));

    res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener los productos de la orden:", error);
    res
      .status(500)
      .json({ error: "Error al obtener los productos de la orden" });
  }
};

export { createOrder, getOrderByUser, getOrderItems };
