import React from "react";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/CartContext";
import { useAuth } from "./AuthProvider";

const Layout: React.FC = () => {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <div className="bg-white text-gray-900">
      <header className="bg-gray-100 p-4 flex justify-between items-center">
        {/* Logo a la izquierda */}
        <div className="flex items-center space-x-4">
          <Button variant="link" asChild>
            <a href="/home" className="font-bold text-xl">
              LOGO
            </a>
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          {/* Condicionalmente muestra el enlace a "Productos" si el usuario es administrador */}
          {user?.rol === "admin" && (
            <Button variant="link" asChild>
              <a href="/product">Productos</a>
            </Button>
          )}

          <Button variant="link" asChild>
            <a href="/purchases">Compras</a>
          </Button>

          <Button variant="ghost" asChild>
            <a href="/cart">
              <div className="relative">
                <ShoppingCartIcon className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                    {itemCount}
                  </span>
                )}
              </div>
            </a>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <UserCircleIcon className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => logout()}>
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="p-7">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
