import { render, screen } from "@testing-library/react";
import ProductCard from "../ProductCard";

const product = {
  id: "1",
  name: "Produto Exemplo",
  category: "Categoria Exemplo",
  price_in_cents: 1999,
  image_url: "https://via.placeholder.com/150",
};

describe("ProductCard Component", () => {
  it("deve renderizar as informações do produto corretamente", () => {
    render(<ProductCard product={product} />);

    // Verificando se o nome do produto é exibido corretamente
    expect(screen.getByText(product.name)).toBeInTheDocument();

    // Verificando se o preço do produto é exibido corretamente
    expect(screen.getByText("R$ 19,99")).toBeInTheDocument();

    // Verificando se a imagem do produto é carregada corretamente
    const productImage = screen.getByRole("img");
    expect(productImage).toHaveAttribute("src", product.image_url);
    expect(productImage).toHaveAttribute("alt", product.name);
  });

  it("deve redirecionar para a página do produto ao clicar", () => {
    render(<ProductCard product={product} />);

    // Verificando se o link está sendo renderizado corretamente
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/product/${product.id}`);

    // Simulando o clique no link
    link.click();
  });
});
