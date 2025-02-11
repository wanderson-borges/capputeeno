import { useState } from "react";
import { Nav, NavLink } from "./styles/NavMenu.styles";

interface NavMenuProps {
  onCategoryChange: (category: string) => void;
}

export function NavMenu({ onCategoryChange }: NavMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return (
    <Nav>
      <NavLink
        href="#"
        selected={selectedCategory === "all"}
        onClick={() => handleCategoryChange("all")}
      >
        TODOS OS PRODUTOS
      </NavLink>
      <NavLink
        href="#"
        selected={selectedCategory === "t-shirts"}
        onClick={() => handleCategoryChange("t-shirts")}
      >
        CAMISETAS
      </NavLink>
      <NavLink
        href="#"
        selected={selectedCategory === "mugs"}
        onClick={() => handleCategoryChange("mugs")}
      >
        CANECAS
      </NavLink>
    </Nav>
  );
}
