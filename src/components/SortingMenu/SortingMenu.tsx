import React, { useState, useEffect, useRef } from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";
import { NavMenu } from '../NavMenu/NavMenu';
import { SortingMenuContainer, SortingOptionsWrapper, SortingLabel, SortingOptionsContainer, SortingOptionsList, SortingOption } from './styles/SortingMenu.styles';

interface SortingMenuProps {
  sortOption: string;
  onSortChange: (sortValue: string) => void;
  onCategoryChange: (category: string) => void;
}

const SortingMenu: React.FC<SortingMenuProps> = ({ onSortChange, onCategoryChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState<string>('novidades');
  const sortingMenuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu ao clicar fora
  const handleClickOutside = (e: MouseEvent) => {
    if (sortingMenuRef.current && !sortingMenuRef.current.contains(e.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLabelClick = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleOptionClick = (option: string) => {
    setSelectedSortOption(option);
    onSortChange(option); // Atualiza a opção de ordenação
  };

  return (
    <SortingMenuContainer>
      <NavMenu onCategoryChange={onCategoryChange} />

      {/* Botão de "Organizar por" e dropdown */}
      <SortingOptionsWrapper ref={sortingMenuRef}>
        <SortingLabel onClick={handleLabelClick}>
          Organizar por <MdKeyboardArrowDown />
        </SortingLabel>
        {isDropdownOpen && (
          <SortingOptionsContainer>
            <SortingOptionsList>
              <SortingOption
                isSelected={selectedSortOption === 'novidades'}
                onClick={() => handleOptionClick('novidades')}
              >
                Novidades
              </SortingOption>
              <SortingOption
                isSelected={selectedSortOption === 'preco-maior-menor'}
                onClick={() => handleOptionClick('preco-maior-menor')}
              >
                Preço: Maior - menor
              </SortingOption>
              <SortingOption
                isSelected={selectedSortOption === 'preco-menor-maior'}
                onClick={() => handleOptionClick('preco-menor-maior')}
              >
                Preço: Menor - maior
              </SortingOption>
              <SortingOption
                isSelected={selectedSortOption === 'mais-vendidos'}
                onClick={() => handleOptionClick('mais-vendidos')}
              >
                Mais vendidos
              </SortingOption>
            </SortingOptionsList>
          </SortingOptionsContainer>
        )}
      </SortingOptionsWrapper>
    </SortingMenuContainer>
  );
};

export default SortingMenu;
