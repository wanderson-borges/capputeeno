import React from "react";
import Link from "next/link";
import { Card, ProductImage, ProductInfo, ProductName, ProductPrice } from "./styles/ProductCard.styles";

interface Product {
  id: string;
  name: string;
  category: string;
  price_in_cents: number;
  image_url: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <Link href={`/product/${product.id}`} passHref>
    <Card>
      <ProductImage src={product.image_url} alt={product.name} />
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <hr />
        <ProductPrice>
          R$ {(product.price_in_cents / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </ProductPrice>
      </ProductInfo>
    </Card>
  </Link>
);

export default ProductCard;
