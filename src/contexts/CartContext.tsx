import { createContext, useContext, useEffect, useState } from "react";

// Definindo a interface para um item do carrinho
interface CartItem {
  id: string;
  name: string;
  image_url: string;
  price_in_cents: number;
  category: string;
  quantity: number;
}

// Definindo a interface do contexto do carrinho
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
}

// Criando o contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook personalizado para acessar o contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};

// Provider do carrinho
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Carregar o carrinho do localStorage ao iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Atualizar o localStorage sempre que o carrinho mudar
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Função para adicionar um item ao carrinho
  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingProductIndex !== -1) {
        // Se o produto já existir, aumentar a quantidade
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        // Se for um novo produto, adicioná-lo ao carrinho
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
