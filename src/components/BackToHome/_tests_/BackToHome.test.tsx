import { render, screen, fireEvent } from "@testing-library/react";
import { BackToHome } from "@/components/BackToHome/BackToHome";
import { useRouter } from "next/router";

// Mock do hook do Next.js useRouter
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("BackToHome", () => {
  test("deve renderizar corretamente o botão de voltar", () => {
    render(<BackToHome />);

    const backButton = screen.getByRole("button");
    const icon = screen.getByTestId("back-icon"); // Para garantir que o ícone está sendo renderizado
    const text = screen.getByText("Voltar");

    // Verifica se o ícone e o texto estão presentes
    expect(backButton).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  test("deve chamar o router.push quando não for passado onClick", () => {
    const mockPush = jest.fn();

    // Mockando o comportamento do useRouter diretamente
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    render(<BackToHome />);

    const backButton = screen.getByRole("button");

    // Clica no botão
    fireEvent.click(backButton);

    // Verifica se o router.push foi chamado com o caminho correto
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  test("deve chamar a função onClick se fornecida", () => {
    const mockOnClick = jest.fn();

    render(<BackToHome onClick={mockOnClick} />);

    const backButton = screen.getByRole("button");

    // Clica no botão
    fireEvent.click(backButton);

    // Verifica se a função onClick foi chamada
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("deve ter o estilo correto e o efeito de hover", () => {
    render(<BackToHome />);

    const backButton = screen.getByRole("button");

    // Verifica o estilo inicial
    expect(backButton).toHaveStyle("border: 1px solid #5d5d6d");
    expect(backButton).toHaveStyle("color: #5d5d6d");
    expect(backButton).toHaveStyle("font-size: 14px");

    // Simula o hover
    fireEvent.mouseOver(backButton);

    // Verifica se o hover altera o fundo
    expect(backButton).toHaveStyle("background-color: rgb(221, 223, 224)");
  });
});
