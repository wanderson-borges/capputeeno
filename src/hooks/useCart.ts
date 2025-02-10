// hooks/useCart.ts
import { useState, useEffect } from "react";

interface CartItem {
  id: string;
  name: string;
  image_url: string;
  price_in_cents: number;
  category: string;
  quantity: number;
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Carregar o carrinho do localStorage ao iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Adicionar um item ao carrinho
  const addToCart = (product: CartItem) => {
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);
    let updatedCart: CartItem[];

    if (existingProductIndex !== -1) {
      updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return {
    cartCount: cart.length,
    addToCart,
  };
}
