import { render, screen, fireEvent } from "@testing-library/react";
import PaginationNav from "../PaginationNav";

describe("PaginationNav Component", () => {
  const mockOnPageChange = jest.fn();

  it("deve renderizar o número correto de páginas", () => {
    render(<PaginationNav currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);

    // Verificando se todos os botões de página são renderizados
    const pageButtons = [
      screen.getByTestId("page-button-1"),
      screen.getByTestId("page-button-2"),
      screen.getByTestId("page-button-3"),
      screen.getByTestId("page-button-4"),
      screen.getByTestId("page-button-5"),
    ];
    expect(pageButtons).toHaveLength(5);
    expect(pageButtons[0]).toHaveTextContent("1");
    expect(pageButtons[4]).toHaveTextContent("5");
  });

  it("deve chamar a função onPageChange quando um botão de página for clicado", () => {
    render(<PaginationNav currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);

    // Simulando o clique no botão de página 3
    fireEvent.click(screen.getByTestId("page-button-3"));

    // Verificando se a função onPageChange foi chamada com o número correto da página
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it("deve desabilitar o botão de página atual", () => {
    render(<PaginationNav currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);

    // Verificando se o botão de página 3 está desabilitado
    const pageButton3 = screen.getByTestId("page-button-3");
    expect(pageButton3).toBeDisabled();
  });

  it("deve chamar a função onPageChange para o botão de seta esquerda", () => {
    render(<PaginationNav currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />);

    // Simulando o clique na seta esquerda
    fireEvent.click(screen.getByTestId("arrow-left"));

    // Verificando se a função onPageChange foi chamada com o número correto da página
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it("deve chamar a função onPageChange para o botão de seta direita", () => {
    render(<PaginationNav currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />);

    // Simulando o clique na seta direita
    fireEvent.click(screen.getByTestId("arrow-right"));

    // Verificando se a função onPageChange foi chamada com o número correto da página
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it("deve desabilitar o botão de seta esquerda na primeira página", () => {
    render(<PaginationNav currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);

    // Verificando se o botão de seta esquerda está desabilitado
    const arrowLeft = screen.getByTestId("arrow-left");
    expect(arrowLeft).toBeDisabled();
  });

  it("deve desabilitar o botão de seta direita na última página", () => {
    render(<PaginationNav currentPage={5} totalPages={5} onPageChange={mockOnPageChange} />);

    // Verificando se o botão de seta direita está desabilitado
    const arrowRight = screen.getByTestId("arrow-right");
    expect(arrowRight).toBeDisabled();
  });
});
