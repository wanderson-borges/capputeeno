import { render, screen, fireEvent } from '@testing-library/react';
import SortingMenu from '@/components/SortingMenu/SortingMenu';
import '@testing-library/jest-dom';

describe('SortingMenu Component', () => {
  // Funções mock para testar as interações
  const mockOnSortChange = jest.fn();
  const mockOnCategoryChange = jest.fn();

  beforeEach(() => {
    render(
      <SortingMenu
        sortOption="novidades"
        onSortChange={mockOnSortChange}
        onCategoryChange={mockOnCategoryChange}
      />
    );
  });

  it('deve renderizar o input de busca', () => {
    const sortingLabel = screen.getByText('Organizar por');
    expect(sortingLabel).toBeInTheDocument();
  });

  it('deve abrir e fechar o dropdown ao clicar no botão "Organizar por"', () => {
    const sortingLabel = screen.getByText('Organizar por');
    const dropdownContainer = screen.queryByText('Novidades');

    // Verifica que o dropdown não está visível inicialmente
    expect(dropdownContainer).not.toBeInTheDocument();

    // Clica no botão para abrir o dropdown
    fireEvent.click(sortingLabel);
    expect(screen.getByText('Novidades')).toBeInTheDocument();

    // Clica novamente no botão para fechar o dropdown
    fireEvent.click(sortingLabel);
    expect(dropdownContainer).not.toBeInTheDocument();
  });

  it('deve chamar a função onSortChange com o valor correto ao clicar em uma opção', () => {
    const sortingLabel = screen.getByText('Organizar por');
    fireEvent.click(sortingLabel);

    const optionNovidades = screen.getByText('Novidades');
    fireEvent.click(optionNovidades);

    // Verifica se a função mock foi chamada com o valor correto
    expect(mockOnSortChange).toHaveBeenCalledWith('novidades');
  });

  it('deve marcar a opção selecionada corretamente', () => {
    const sortingLabel = screen.getByText('Organizar por');
    fireEvent.click(sortingLabel);

    const optionPrecoMaiorMenor = screen.getByText('Preço: Maior - menor');
    fireEvent.click(optionPrecoMaiorMenor);

    const selectedOption = screen.getByText('Preço: Maior - menor');
    expect(selectedOption).toHaveStyle('color: #ffa585');
  });
});
