import { LuShoppingBag } from "react-icons/lu";
import { CartIconWrapper, CartCount } from "./styles/CartIcon.styles";

interface CartIconProps {
  cartCount: number;
  onClick: () => void;
}

export function CartIcon({ cartCount, onClick }: CartIconProps) {
  return (
    <CartIconWrapper data-testid="cart-icon-wrapper" onClick={onClick}>
      <LuShoppingBag size={24} data-testid="cart-icon" />
      {cartCount > 0 && <CartCount data-testid="cart-count">{cartCount}</CartCount>}
    </CartIconWrapper>
  );
}
