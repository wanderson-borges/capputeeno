import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "@/graphql/queries";
import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { TbArrowBackUp } from "react-icons/tb";
import { LuShoppingBag } from "react-icons/lu";
import { Notify } from "@/components/Notify";

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

const ProductDetailContainer = styled.div`
  padding: 20px 160px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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

const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 60px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;

  @media (min-width: 768px) {
    width: 50%;
    max-width: 600px;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  @media (min-width: 768px) {
    width: 50%;
  }
`;

const ProductCategory = styled.h1`
  color: #41414d;
  font-family: Saira;
  font-size: 16px;
  font-weight: 400;
  margin-top: 5px;
`;

const ProductName = styled.h1`
  color: #41414d;
  font-family: Saira;
  font-size: 32px;
  font-weight: 300;
  line-height: 100%;
  margin-top: 12px;
`;

const ProductPrice = styled.p`
  color: #09090a;
  font-family: Saira;
  font-size: 20px;
  font-weight: 600;
  line-height: 100%;
  margin-top: 4px;
`;

const ShippingCost = styled.p`
  color: #41414d;
  font-family: Saira;
  font-size: 12px;
  font-weight: 400;
  line-height: 100%;
  margin-top: 24px;
`;

const ProductDescriptionTitle = styled.p`
  color: #737380;
  font-family: Saira;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  margin: 58px 0 -10px 0;
`;

const ProductDescription = styled.p`
  color: #41414d;
  font-family: Saira;
  font-size: 14px;
  font-weight: 400;
  width: 100%;
`;

const AddToCartButton = styled.button`
  width: 100%;
  height: 44px;
  border-radius: 4px;
  background-color: #115d8c;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 180px;
  gap: 12px;
  padding: 10px 0px;
  border: none;
  cursor: pointer;
  color: #f5f5fa;
  font-family: Saira;
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;

  &:hover {
    background-color: #0f4d7b;
  }
`;

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
        <BackButton onClick={() => router.push("/")}>
          <TbArrowBackUp size={20} />
        </BackButton>

        <ProductContent>
          <ProductImage src={product.image_url} alt={product.name} />
          <ProductInfo>
            <ProductCategory>
              {categoryTranslations[product.category] || product.category}
            </ProductCategory>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>R$ {(product.price_in_cents / 100).toFixed(2)}</ProductPrice>
            <ShippingCost>*Frete de R$ 20,00 em todo o site.</ShippingCost>
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
