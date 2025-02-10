import React from "react";
import styled from "styled-components";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  category: string;
  price_in_cents: number;
  image_url: string;
}

const Card = styled.div`
  border-radius: 8px;
  background: white;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 12px;
`;

const ProductName = styled.h2`
  font-size: 16px;
  margin: 5px 0;
  color: #41414d;
`;

const ProductPrice = styled.p`
  font-weight: bold;
  color: #333;
`;

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <Link href={`/product/${product.id}`} passHref>
    <Card>
      <ProductImage src={product.image_url} alt={product.name} />
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>
          R$ {(product.price_in_cents / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </ProductPrice>
      </ProductInfo>
    </Card>
  </Link>
);

export default ProductCard;
