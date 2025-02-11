import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NavMenu } from "@/components/NavMenu/NavMenu";

describe("NavMenu", () => {
  test("muda de categoria ao clicar", async () => {
    const mockOnCategoryChange = jest.fn();
    render(<NavMenu onCategoryChange={mockOnCategoryChange} />);

    const allProductsButton = screen.getByText("TODOS OS PRODUTOS");
    const tShirtsButton = screen.getByText("CAMISETAS");

    // Verifica se o item "TODOS OS PRODUTOS" começa selecionado
    expect(allProductsButton).toHaveStyle("font-weight: bold");
    expect(allProductsButton).toHaveStyle("color: #41414d");
    expect(allProductsButton).toHaveStyle("border-bottom: 4px solid #ffa585");

    // Clica em "CAMISETAS"
    fireEvent.click(tShirtsButton);

    // Aguarda a atualização do estado antes de verificar
    await waitFor(() => {
      // Verifica se "CAMISETAS" agora está selecionado
      expect(tShirtsButton).toHaveStyle("font-weight: bold");
      expect(tShirtsButton).toHaveStyle("color: #41414d");
      expect(tShirtsButton).toHaveStyle("border-bottom: 4px solid #ffa585");

      // Verifica se "TODOS OS PRODUTOS" não está mais selecionado
      expect(allProductsButton).toHaveStyle("font-weight: normal");
      expect(allProductsButton).toHaveStyle("color: #737380");
      expect(allProductsButton).toHaveStyle("border-bottom: 4px solid transparent");
    });
  });
});
