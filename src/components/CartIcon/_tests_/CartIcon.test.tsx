import { render, screen, fireEvent } from "@testing-library/react";
import { CartIcon } from "@/components/CartIcon/CartIcon";

describe("CartIcon", () => {
  test("deve renderizar corretamente o ícone do carrinho", () => {
    render(<CartIcon cartCount={0} onClick={() => { }} />);

    // Verifica se o ícone do carrinho está presente
    const cartIcon = screen.getByTestId("cart-icon"); // Usando um data-testid
    expect(cartIcon).toBeInTheDocument();
  });

  test("deve exibir o contador do carrinho quando o número de itens for maior que 0", () => {
    render(<CartIcon cartCount={5} onClick={() => { }} />);

    // Verifica se o contador do carrinho é exibido com o valor correto
    const cartCount = screen.getByText("5");
    expect(cartCount).toBeInTheDocument();
  });

  test("não deve exibir o contador do carrinho quando o número de itens for 0", () => {
    render(<CartIcon cartCount={0} onClick={() => { }} />);

    // Verifica se o contador do carrinho não é exibido
    const cartCount = screen.queryByText("0");
    expect(cartCount).not.toBeInTheDocument();
  });

  test("deve chamar a função onClick ao clicar no ícone", () => {
    const mockOnClick = jest.fn();

    render(<CartIcon cartCount={3} onClick={mockOnClick} />);

    const cartIconWrapper = screen.getByTestId("cart-icon-wrapper"); // Usando um data-testid

    // Clica no ícone
    fireEvent.click(cartIconWrapper);

    // Verifica se a função onClick foi chamada
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("deve ter o estilo correto para o contador do carrinho", () => {
    render(<CartIcon cartCount={3} onClick={() => { }} />);

    const cartCount = screen.getByText("3");

    // Verifica o estilo do contador
    expect(cartCount).toHaveStyle("background-color: #ff0000");
    expect(cartCount).toHaveStyle("color: white");
    expect(cartCount).toHaveStyle("font-size: 12px");
    expect(cartCount).toHaveStyle("font-weight: bold");
    expect(cartCount).toHaveStyle("border-radius: 50%");
  });
});
