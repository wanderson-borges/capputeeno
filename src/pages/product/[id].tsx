import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "@/graphql/queries";
import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { LuShoppingBag } from "react-icons/lu";
import { Notify } from "@/components/Notify";
import { BackToHome } from "@/components/BackToHome";

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

  @media (max-width: 365px) {
    padding: 20px 20px;
  }

  @media (min-width: 365px) and (max-width: 576px) {
    padding: 20px 30px;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    padding: 20px 40px;
  }

  @media (min-width: 768px) and (max-width: 992px) {
    padding: 20px 30px;
  }

  @media (min-width: 992px) and (max-width: 1200px) {
    padding: 20px 30px;
  }

   @media (min-width: 1200px) and (max-width: 1550px) {
  }
`;

const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  justify-content: center;

  @media (max-width: 365px) {
  gap: 20px;
  }

  @media (min-width: 365px) and (max-width: 576px) {
  gap: 20px;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    gap: 20px;
  }

  @media (min-width: 768px) and (max-width: 992px) {
    gap: 40px;
  }

  @media (min-width: 992px) and (max-width: 1200px) {
    gap: 40px;
  }

   @media (min-width: 1200px) and (max-width: 1550px) {
  }
  
  @media (min-width: 768px) {
    flex-direction: row;
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
    max-width: 450px;
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
  margin: 50px 0 -10px 0;

  @media (max-width: 365px) {
    margin: 15px 0 -10px 0;
  }

  @media (min-width: 365px) and (max-width: 576px) {
    margin: 15px 0 -10px 0;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    margin: 15px 0 -10px 0;
  }
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
  text-transform: uppercase;

  &:hover {
    background-color: #0f4d7b;
  }

  @media (max-width: 365px) {
    margin-top: 40px;
  }

  @media (min-width: 365px) and (max-width: 576px) {
    margin-top: 40px;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    margin-top: 40px;
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
