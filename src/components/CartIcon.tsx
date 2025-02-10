import styled from "styled-components";
import { LuShoppingBag } from "react-icons/lu";

const CartIconWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const CartCount = styled.span`
  position: absolute;
  bottom: 7px;
  right: -9px;
  background-color: #ff0000;
  color: white;
  font-size: 12px;
  font-weight: bold;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface CartIconProps {
  cartCount: number;
  onClick: () => void;
}

export function CartIcon({ cartCount, onClick }: CartIconProps) {
  return (
    <CartIconWrapper onClick={onClick}>
      <LuShoppingBag size={24} />
      {cartCount > 0 && <CartCount>{cartCount}</CartCount>}
    </CartIconWrapper>
  );
}
