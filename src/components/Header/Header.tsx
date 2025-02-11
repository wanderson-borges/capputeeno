import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CartIcon } from "@/components/CartIcon/CartIcon";
import SearchBar from "@/components/SearchBar/SearchBar";
import { HeaderContainer, RightSection } from "./styles/Header.styles";

interface HeaderProps {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
}

export function Header({ onSearchChange, searchTerm }: HeaderProps) {
  const [cartCount, setCartCount] = useState<number>(0);
  const router = useRouter();

  // Função para atualizar a contagem de itens no carrinho
  const updateCartCount = () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const cartItems = JSON.parse(storedCart);
      const totalQuantity = cartItems.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0);
      setCartCount(totalQuantity);
    } else {
      setCartCount(0);
    }
  };

  // Atualiza o contador ao montar o componente
  useEffect(() => {
    updateCartCount();
  }, []);

  // Atualiza o contador sempre que houver mudanças no localStorage
  useEffect(() => {
    const handleStorageChange = () => updateCartCount();

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <HeaderContainer>
      <h1 data-testid="header-title">capputeeno</h1>
      <RightSection>
        <SearchBar value={searchTerm} onChange={onSearchChange} />
        <CartIcon cartCount={cartCount} onClick={() => router.push("/cart")} data-testid="cart-icon" />
      </RightSection>
    </HeaderContainer>
  );
}
