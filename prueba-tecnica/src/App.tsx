import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { Home } from "./pages/Home/Home";
import Layout from "./components/Layout";
import Purchases from "./pages/purchases/Purchases";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import ProductDetails from "./pages/ProductDetails/ProductDetail";
import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/CartPage/CartPage";
import Unauthorized from "./pages/Unauthorized"; // Página de acceso denegado
import Products from "./pages/products";

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />{" "}
          {/* Nueva ruta para no autorizados */}
          <Route path="/" element={<Layout />}>
            <Route
              path="/home"
              element={
                <ProtectedRoute
                  element={<Home />}
                  allowedRoles={["user", "admin"]}
                />
              }
            />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route
              path="/purchases"
              element={
                <ProtectedRoute
                  element={<Purchases />}
                  allowedRoles={["user", "admin"]}
                />
              }
            />
            <Route
              path="/order/:orderId"
              element={
                <ProtectedRoute
                  element={<OrderDetails />}
                  allowedRoles={["user", "admin"]}
                />
              }
            />
            <Route path="/cart" element={<CartPage />} />{" "}
            {/* Ruta para el carrito */}
            <Route
              path="/product"
              element={
                <ProtectedRoute
                  element={<Products />}
                  allowedRoles={["admin"]}
                />
              }
            />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
