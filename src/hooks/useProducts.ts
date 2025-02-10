interface Product {
  id: string;
  name: string;
  category: string;
  price_in_cents: number;
  image_url: string;
  sales: number;
}

export const useProducts = (
  allProducts: Product[],
  category: string,
  sortOption: string
) => {
  const filteredProducts = allProducts.filter((product) => {
    const isCategoryMatch = category === "all" || product.category === category;

    return isCategoryMatch;
  });

  const sortedProducts = [...filteredProducts];

  switch (sortOption) {
    case "preco-maior-menor":
      sortedProducts.sort((a, b) => b.price_in_cents - a.price_in_cents);
      break;
    case "preco-menor-maior":
      sortedProducts.sort((a, b) => a.price_in_cents - b.price_in_cents);
      break;
    case "mais-vendidos":
      sortedProducts.sort((a, b) => b.sales - a.sales);
      break;
    default:
      break;
  }

  return sortedProducts;
};
