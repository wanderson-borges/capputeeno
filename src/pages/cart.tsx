import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Notify } from "@/components/Notify/Notify";
import { Body } from "@/styles/GlobalStyles";
import { FaRegTrashCan } from "react-icons/fa6";
import Image from "next/image";
import { BackToHome } from "@/components/BackToHome/BackToHome";
import { PageContainer, CartSection, CartSectionTitle, CartSectionSubtitle, CartItemCard, CartItemImage, CartItemInfo, CartItemInfoHeader, RemoveButton, CartItemInfoDesc, CartItemInfoFooter, QuantityInput, QuantityButton, QuantityField, SummarySection, SummaryItem, CheckoutButton, LinksContainer, SummaryLink } from "./styles/cart.styles";

interface CartItem {
  id: string;
  name: string;
  image_url: string;
  description: string;
  price_in_cents: number;
  category: string;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const router = useRouter();

  const loadCart = () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  };

  useEffect(() => {
    loadCart();
    const handleStorageChange = () => {
      loadCart();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const updateCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    // Disparando evento de armazenamento para garantir a atualização em outras páginas
    window.dispatchEvent(new Event("storage"));
  };

  const handleRemoveItem = (id: string) => {
    updateCart(cart.filter((item) => item.id !== id));
  };

  const handleIncrement = (id: string) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const handleDecrement = (id: string) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 0 }
        : item
    );
    const filteredCart = updatedCart.filter((item) => item.quantity > 0);
    updateCart(filteredCart);
  };

  const totalPrice = cart.reduce((total, item) => total + item.price_in_cents * item.quantity, 0) / 100;
  const shippingCost = totalPrice > 900 ? 0 : 40;
  const finalPrice = totalPrice + shippingCost;

  const handleCheckout = () => {
    setShowMessage(true);
    localStorage.removeItem("cart");
    setCart([]);
    // Disparando evento para forçar a atualização do Header após finalizar a compra
    window.dispatchEvent(new Event("storage"));
    setTimeout(() => {
      setShowMessage(false);
      router.push("/");
    }, 3000);
  };

  return (
    <>
      <Body>
        <BackToHome />
        <PageContainer>
          {showMessage && <Notify message="Compra finalizada com sucesso!" type="success" />}
          <CartSection>
            <CartSectionTitle>Seu Carrinho</CartSectionTitle>
            <CartSectionSubtitle>Total ({cart.length} produtos) <b>R$ {totalPrice.toFixed(2)}</b></CartSectionSubtitle>
            {cart.length === 0 ? (
              <p>Seu carrinho está vazio.</p>
            ) : (
              cart.map((item) => (
                <CartItemCard key={item.id}>
                  <CartItemImage imageUrl={item.image_url}>
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </CartItemImage>
                  <CartItemInfo>
                    <CartItemInfoHeader>
                      <h3>{item.name}</h3>
                      <RemoveButton onClick={() => handleRemoveItem(item.id)}>
                        <FaRegTrashCan />
                      </RemoveButton>
                    </CartItemInfoHeader>
                    <CartItemInfoDesc>{item.description}</CartItemInfoDesc>
                    <CartItemInfoFooter>
                      <QuantityInput>
                        <QuantityButton onClick={() => handleDecrement(item.id)}>-</QuantityButton>
                        <QuantityField type="number" value={item.quantity} min="0" readOnly />
                        <QuantityButton onClick={() => handleIncrement(item.id)}>+</QuantityButton>
                      </QuantityInput>
                      <p>R$ {((item.price_in_cents / 100) * item.quantity).toFixed(2)}</p>
                    </CartItemInfoFooter>
                  </CartItemInfo>
                </CartItemCard>
              ))
            )}
          </CartSection>
          <SummarySection>
            <h2>Resumo do Pedido</h2>
            <SummaryItem>
              <span>Subtotal de produtos</span>
              <span>R$ {totalPrice.toFixed(2)}</span>
            </SummaryItem>
            <SummaryItem>
              <span>Entrega</span>
              <span>{shippingCost === 0 ? <b>Grátis</b> : `R$ ${shippingCost.toFixed(2)}`}</span>
            </SummaryItem>
            <hr />
            <SummaryItem>
              <strong>Total</strong>
              <strong>R$ {finalPrice.toFixed(2)}</strong>
            </SummaryItem>
            <CheckoutButton onClick={handleCheckout}>Finalizar a Compra</CheckoutButton>
            <LinksContainer>
              <SummaryLink href="#">Ajuda</SummaryLink>
              <SummaryLink href="#">Reembolsos</SummaryLink>
              <SummaryLink href="#">Entregas e Frete</SummaryLink>
              <SummaryLink href="#">Trocas e Devoluções</SummaryLink>
            </LinksContainer>
          </SummarySection>
        </PageContainer>
      </Body>
    </>
  );
}
