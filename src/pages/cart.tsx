import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Notify } from "@/components/Notify";
import { TbArrowBackUp } from "react-icons/tb";
import { Body } from "@/styles/GlobalStyles";
import { FaRegTrashCan } from "react-icons/fa6";
import Image from "next/image";

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
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
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
  min-height: 120px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  border-radius: 8px 0px 0px 8px;
  position: relative;

  @media (max-width: 992px) {
    width: 100%;
    // height: 200px;
    border-radius: 8px 8px 0 0;
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
  padding: 10px;
  background-color: #008000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #006600;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const LinksContainer = styled.div`
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid #ddd;
`;

const SummaryLink = styled.a`
  display: block;
  margin-top: 5px;
  color: #0066cc;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const BackButton = styled.button`
  border: 1px solid #5d5d6d;
  color: #5d5d6d;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-top: 20px;
  font-family: Saira;
  font-weight: 500;
  background: transparent;

  &:hover {
    background-color: rgb(221, 223, 224);
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
  const shippingCost = 20.0;
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
        <BackButton onClick={() => router.push("/")}>
          <TbArrowBackUp size={20} />
        </BackButton>
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
              <span>R$ {shippingCost.toFixed(2)}</span>
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
