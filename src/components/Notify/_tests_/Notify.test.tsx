import { render, screen, waitFor } from "@testing-library/react";
import { Notify } from "@/components/Notify/Notify";

describe("Notify Component", () => {
  it("deve renderizar a mensagem corretamente", () => {
    render(<Notify message="Mensagem de sucesso" type="success" />);

    // Verificando se a mensagem está na tela
    expect(screen.getByText("Mensagem de sucesso")).toBeInTheDocument();
  });

  it("deve aplicar o estilo correto para o tipo success", () => {
    render(<Notify message="Mensagem de sucesso" type="success" />);

    const message = screen.getByText("Mensagem de sucesso");

    // Verificando o estilo aplicado
    expect(message).toHaveStyle("background-color: #4caf50");
  });

  it("deve desaparecer após o tempo de duração", async () => {
    render(<Notify message="Mensagem de sucesso" type="success" duration={2000} />);

    // Verificando se a mensagem aparece na tela
    expect(screen.getByText("Mensagem de sucesso")).toBeInTheDocument();

    // Usando waitFor para esperar o tempo de duração
    await waitFor(() => {
      expect(screen.queryByText("Mensagem de sucesso")).not.toBeInTheDocument();
    }, { timeout: 2500 }); // Definindo timeout um pouco maior que a duração
  });
});
