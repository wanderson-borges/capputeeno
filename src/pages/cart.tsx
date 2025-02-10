import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Notify } from "@/components/Notify";
import { Body } from "@/styles/GlobalStyles";
import { FaRegTrashCan } from "react-icons/fa6";
import Image from "next/image";
import { BackToHome } from "@/components/BackToHome";

interface CartItem {
  id: string;
  name: string;
  image_url: string;
  description: string;
  price_in_cents: number;
  category: string;
  quantity: number;
}

const PageContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  padding: 20px 160px;

  @media (max-width: 365px) {
    padding: 20px 20px;
  }

  @media (min-width: 365px) and (max-width: 576px) {
    padding: 20px 20px;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    padding: 20px 100px;
  }

  @media (min-width: 768px) and (max-width: 992px) {
    padding: 20px 20px;
  }

  @media (min-width: 992px) and (max-width: 1200px) {
  }

   @media (min-width: 1200px) and (max-width: 1550px) {
    padding: 20px 20px;
  }

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CartSection = styled.div`
  flex: 2;
  border-radius: 8px;
`;

const CartSectionTitle = styled.div`
  color: #41414d;
  font-family: Saira;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  text-transform: uppercase;
  `;

const CartSectionSubtitle = styled.div`
  margin-bottom: 20px;
  color: #41414d;
  font-family: Saira;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 150%;

  & b{
    color: #41414d;
    font-family: Saira;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
  }
`;

const SummarySection = styled.div`
  flex: 1;
  color: #737380;
  background: #fff;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: 1200px) {
    max-width: 100%;
  }
  
  & h2{
    font-weight: 500;
    color: #41414D;
    text-transform: uppercase;
    margin-bottom: 30px;
  }

  & hr{
    border-color: #ffffff73;
    margin: 20px 0 10px 0;
  }
`;

const CartItemCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 15px;
  justify-content: space-between;
  height: auto;
  overflow: hidden;
  transition: 0.2s ease-in-out;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CartItemImage = styled.div<{ imageUrl: string }>`
  flex-basis: 5%;
  flex-grow: 1;
  min-height: 200px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  border-radius: 8px 0px 0px 8px;
  position: relative;

  @media (max-width: 992px) {
    width: 100%;
  }

  img {
    display: none;
  }
`;

const CartItemInfo = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  background: #ffffff;
  gap: 20px;
`;

const CartItemInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & h3{
    width: 100%;
    color: #41414d;
    font-family: Saira;
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    line-height: 150%;
  }
`;

const CartItemInfoDesc = styled.div`
  color: #41414d;
  font-family: Saira;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  cursor: default;
  width: auto;
`;

const CartItemInfoFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  align-content: end;

  & p{
    font-weight: 500;
    font-size: 16px;
    font-family: Saira;
  }
`;

const QuantityInput = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const QuantityButton = styled.button`
  padding: 5px 10px;
  font-size: 18px;
  background-color: #ddd;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  height: 31px;
  width: 31px;
  display: grid;
  align: items: center;
  justify-items: center;
  color: #737380;
  font-weight: bold;
  
  &:hover {
    background-color: #ccc;
  }
`;

const QuantityField = styled.input`
  width: 50px;
  text-align: center;
  font-size: 16px;
  padding: 5px;
  border-radius: 8px;
  border: 2px solid #dddddd9c;
  color: #737380;

  &:focus-visible {
    outline: 1px solid #ededed;
  }
`;

const RemoveButton = styled.button`
  display: flex;
  color: #DE3838;
  font-size: 18px;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const CheckoutButton = styled.button`
  height: 44px;
  padding: 10px;
  background-color: #51B853;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 30px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 16px;
  font-family: Saira;
  
  &:hover {
    background-color: #42ad44;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  & span{
    & b{
      color: #51B853;
    }
  }

  & strong{
    font-weight: 600;
    color: #41414D;
    font-size: 16px;
  }
`;

const LinksContainer = styled.div`
  font-family: Saira;
  margin-top: auto;
  padding-top: 20px;
  text-decoration: underline;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
`;

const SummaryLink = styled.a`
  display: block;
  margin-top: 5px;
  color: #737380;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

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
