import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "@/graphql/queries";
import Head from "next/head";
import ProductCard from "@/components/ProductCard";
import PaginationNav from "@/components/PaginationNav";
import SortingMenu from "@/components/SortingMenu";
import styled from 'styled-components';
import { useProducts } from "@/hooks/useProducts";
import { usePagination } from "@/hooks/usePagination";

interface Product {
  id: string;
  name: string;
  category: string;
  price_in_cents: number;
  image_url: string;
  sales: number;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  gap: 16px;
  padding: 30px 160px;

  @media (max-width: 365px) {
    padding: 30px 20px;
    justify-content: center;
  }

  @media (min-width: 365px) and (max-width: 576px) {
    padding: 30px 20px;
    justify-content: center;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    padding: 30px 20px;
    justify-content: center;
  }

  @media (min-width: 768px) and (max-width: 992px) {
    padding: 30px 20px;
  }

  @media (min-width: 992px) and (max-width: 1200px) {
    padding: 30px 20px;
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const [category, setCategory] = useState("all");
  const [sortOption, setSortOption] = useState("novidades");
  const itemsPerPage = 15;

  // Garantir que os hooks sejam chamados antes dos retornos condicionais
  const allProducts: Product[] = data?.allProducts || [];

  // Chamando os hooks antes de qualquer retorno condicional
  const sortedProducts = useProducts(allProducts, category, sortOption);
  const { currentPage, totalPages, currentItems, handlePageChange } = usePagination<Product>(itemsPerPage, sortedProducts.length);  // Passando o tipo Product para o hook

  const handleSortChange = (sortValue: string) => {
    setSortOption(sortValue);
    handlePageChange(1);
  };

  // Renderizando condicionalmente após os hooks
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar os produtos.</p>;

  return (
    <>
      <Head>
        <title>Capputeeno</title>
      </Head>

      <SortingMenu sortOption={sortOption} onSortChange={handleSortChange} onCategoryChange={setCategory} />

      <PaginationNav
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <Container>
        {currentItems(sortedProducts).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Container>
    </>
  );
}
