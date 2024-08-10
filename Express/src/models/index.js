import Usuario from "./Usuarios.js";
import Products from "./Products.js";
import Orders from "./Orders.js";
import OrderItems from "./OrderItems.js";

// Relación entre Users y Orders
Usuario.hasMany(Orders, { foreignKey: "userId" });
Orders.belongsTo(Usuario, { foreignKey: "userId" });

// Relación entre Orders y OrderItems
Orders.hasMany(OrderItems, { foreignKey: "orderId" });
OrderItems.belongsTo(Orders, { foreignKey: "orderId" });

// Relación entre Products y OrderItems
Products.hasMany(OrderItems, { foreignKey: "productId" });
OrderItems.belongsTo(Products, { foreignKey: "productId" });

export { Usuario, Products, Orders, OrderItems };
