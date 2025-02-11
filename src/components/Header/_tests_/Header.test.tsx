import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "@/components/Header/Header";
import "@testing-library/jest-dom";
import { useRouter } from "next/router";
import { MockedProvider } from "@apollo/client/testing";
import { GET_PRODUCTS } from "@/graphql/queries";

// Mocking localStorage
beforeEach(() => {
  localStorage.clear();
});

// Mocking the router push function
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const mockOnSearchChange = jest.fn();

const mocks = [
  {
    request: {
      query: GET_PRODUCTS,
    },
    result: {
      data: {
        allProducts: [
          { id: "1", name: "Produto 1" },
          { id: "2", name: "Produto 2" },
        ],
      },
    },
  },
];

describe("Header", () => {
  it("deve renderizar o título corretamente", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Header onSearchChange={mockOnSearchChange} searchTerm="" />
      </MockedProvider>
    );

    expect(screen.getByTestId("header-title")).toHaveTextContent("capputeeno");
  });

  it("deve chamar a função de navegação ao clicar no ícone do carrinho", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Header onSearchChange={mockOnSearchChange} searchTerm="" />
      </MockedProvider>
    );

    const cartIcon = screen.getByTestId("cart-icon");
    fireEvent.click(cartIcon);

    expect(push).toHaveBeenCalledWith("/cart");
  });

});
