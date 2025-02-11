import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "@/graphql/queries";
import { useState } from "react";
import { useRouter } from "next/router";
import { LuShoppingBag } from "react-icons/lu";
import { Notify } from "@/components/Notify/Notify";
import { BackToHome } from "@/components/BackToHome/BackToHome";
import { ProductDetailContainer, ProductContent, ProductImage, ProductInfo, ProductCategory, ProductName, ProductPrice, ShippingCost, ProductDescriptionTitle, ProductDescription, AddToCartButton } from "./styles/product.styles";

// Definindo a interface para o item do carrinho
interface CartItem {
  id: string;
  name: string;
  image_url: string;
  price_in_cents: number;
  category: string;
  quantity: number;
}

// Definindo a interface para o produto
interface Product {
  id: string;
  name: string;
  image_url: string;
  price_in_cents: number;
  description: string;
  category: string;
}

const categoryTranslations: Record<string, string> = {
  "t-shirts": "Camiseta",
  "mugs": "Caneca",
};

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [addedToCartMessage, setAddedToCartMessage] = useState<string | null>(null);

  // Buscando os produtos
  const { data, loading, error } = useQuery<{ allProducts: Product[] }>(GET_PRODUCTS);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar os produtos.</p>;
  if (!id || typeof id !== "string") return <p>Produto não encontrado.</p>;

  // Filtrando o produto específico
  const product = data?.allProducts.find((prod) => prod.id === id);
  if (!product) return <p>Produto não encontrado.</p>;

  const addToCart = () => {
    const storedCart = localStorage.getItem("cart");
    const currentCart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

    const existingProductIndex = currentCart.findIndex((item) => item.id === product.id);
    const updatedCart = [...currentCart];

    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Disparando evento para forçar a atualização do Header
    window.dispatchEvent(new Event("storage"));

    setAddedToCartMessage(
      `A quantidade do produto "${product.name}" foi ${existingProductIndex !== -1 ? 'aumentada' : 'adicionada'} ao carrinho.`
    );

    setTimeout(() => setAddedToCartMessage(null), 3000);
  };

  return (
    <>
      <ProductDetailContainer>
        <BackToHome />
        <ProductContent>
          <ProductImage src={product.image_url} alt={product.name} />
          <ProductInfo>
            <ProductCategory>
              {categoryTranslations[product.category] || product.category}
            </ProductCategory>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>R$ {(product.price_in_cents / 100).toFixed(2)}</ProductPrice>
            <ShippingCost>*Frete de R$40,00 para todo o Brasil. Grátis para compras acima de R$900,00.</ShippingCost>
            <ProductDescriptionTitle>DESCRIÇÃO</ProductDescriptionTitle>
            <ProductDescription>{product.description}</ProductDescription>
            <AddToCartButton onClick={addToCart}>
              <LuShoppingBag size={20} />
              Adicionar ao carrinho
            </AddToCartButton>
          </ProductInfo>
        </ProductContent>
        {addedToCartMessage && <Notify message={addedToCartMessage} type="success" />}
      </ProductDetailContainer>
    </>
  );
}
