import { exit } from "node:process";
import { Products, Usuario, OrderItems, Orders } from "../models/index.js";
import users from "./User.js";
import products from "./products.js";
import orders from "./orders.js";
import orderItems from "./order_items.js";
import db from "../config/db.js";

const importDatos = async () => {
  try {
    await db.authenticate();

    await db.sync();

    await Promise.all([
      Usuario.bulkCreate(users),
      Products.bulkCreate(products),
      Orders.bulkCreate(orders),
    ]);

    await OrderItems.bulkCreate(orderItems);
    console.log("datos importados 👌");
    exit();
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

const eliminarDatos = async () => {
  try {
    await db.query("SET FOREIGN_KEY_CHECKS = 0;");
    await Promise.all([
      OrderItems.destroy({ where: {}, truncate: true }),
      Orders.destroy({ where: {}, truncate: true }),
      Usuario.destroy({ where: {}, truncate: true }),
      Products.destroy({ where: {}, truncate: true }),
    ]);
    console.log("datos eliminados correctamente 🗑");
    exit();
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

if (process.argv[2] === "-i") {
  importDatos();
}
if (process.argv[2] === "-e") {
  eliminarDatos();
}
