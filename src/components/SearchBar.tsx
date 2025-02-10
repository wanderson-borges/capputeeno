import styled from "styled-components";
import { MdSearch } from "react-icons/md";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "@/graphql/queries";

// Estilização da barra de busca
const SearchBarContainer = styled.div`
  position: relative;
  width: 300px;

  @media (min-width: 365px) and (max-width: 576px) {
    width: 100%;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    width: 100%;
  }
`;

const SearchBarInput = styled.input`
  padding: 8px 12px;
  padding-right: 40px;
  border: none;
  border-radius: 8px;
  width: 100%;
  height: 47px;
  background-color: #F3F5F6;
  font-family: 'Saira', sans-serif;
  font-size: 15px;

  &:focus-visible {
    outline: 2px solid #ededed;
  }
`;

const SearchIcon = styled(MdSearch)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 20px;
  pointer-events: none;
`;

// Estilização do dropdown de resultados
const Dropdown = styled.ul`
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 250px;
  overflow-y: auto;
  padding: 8px 0;
  z-index: 10;
`;

const DropdownItem = styled.li`
  list-style: none;
  padding: 10px;
  font-family: 'Saira', sans-serif;
  font-size: 14px;
  color: #41414d;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: 20px;
  font-weight: 500;

  &:hover {
    background-color: #f3f5f6;
  }
`;

const ProductImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
`;

interface Product {
  id: string;
  name: string;
  image_url: string;
  category: string;
  description: string;
  price_in_cents: number;
}

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const router = useRouter();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { data } = useQuery<{ allProducts: Product[] }>(GET_PRODUCTS);

  // Filtra os produtos ao digitar
  useEffect(() => {
    if (!data?.allProducts) return;

    const searchTerm = value.toLowerCase().trim();
    if (searchTerm === "") {
      setFilteredProducts([]);
      return;
    }

    const results = data.allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.price_in_cents.toString().includes(searchTerm)
    );

    setFilteredProducts(results);
  }, [value, data]);

  // Esconde o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <SearchBarContainer ref={searchRef}>
      <SearchBarInput
        placeholder="Procurando algo específico?"
        value={value}
        onChange={onChange}
        onFocus={() => setShowDropdown(true)} // Mostra o dropdown ao focar no input
      />
      <SearchIcon />

      {/* Exibindo dropdown apenas se houver resultados e ele estiver ativo */}
      {showDropdown && filteredProducts.length > 0 && (
        <Dropdown>
          {filteredProducts.map((product) => (
            <DropdownItem
              key={product.id}
              onClick={() => router.push(`/product/${product.id}`)}
            >
              <ProductImage src={product.image_url} alt={product.name} />
              {product.name}
              <br />
              R$ {(product.price_in_cents / 100).toFixed(2)}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </SearchBarContainer>
  );
};

export default SearchBar;
