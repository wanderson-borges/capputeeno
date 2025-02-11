import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "@/graphql/queries";
import { SearchBarContainer, SearchBarInput, SearchIcon, Dropdown, DropdownItem, ProductImage } from "./styles/SearchBar.styles";

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
        data-testid="search-bar"
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
