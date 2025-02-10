import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowDown } from "react-icons/md";
import { NavMenu } from './NavMenu';

const SortingMenuContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Distribui os elementos */
  align-items: center;
  position: relative;
  width: 100%;
  height: 124px;
  padding: 0px 160px;
  
  @media (max-width: 768px) {
    padding: 0px 20px;
    flex-direction: column;
    height: auto;
  }

  @media (max-width: 365px) {
    padding: 10px 20px;
    gap: 10px;
    height: 100px;
  }

  @media (min-width: 365px) and (max-width: 576px) {
    padding: 10px 20px;
    gap: 10px;
    height: 100px;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    padding: 10px 20px;
    gap: 10px;
    height: 100px;
  }

  @media (min-width: 768px) and (max-width: 992px) {
    padding: 10px 20px;
    gap: 10px;
    height: 100px;
  }

  @media (min-width: 992px) and (max-width: 1200px) {
    padding: 10px 20px;
    gap: 10px;
    height: 100px;
  }
`;

const SortingLabel = styled.label`
  font-size: 14px;
  font-family: 'Saira', sans-serif;
  color: #737380;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  gap: 4px;

  &:hover {
    background-color: #e9e9f0;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    justify-content: center;
  }
`;

const SortingOptionsWrapper = styled.div`
  position: relative;
  user-select: none;

  @media (max-width: 768px) {
    width: 70%;
    text-align: center;
  }
`;

const SortingOptionsContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 220px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
  padding: 10px;
  font-size: 14px;
  font-family: 'Saira', sans-serif;

  @media (max-width: 768px) {
    width: 100%;
    right: 0;
  }
`;

const SortingOptionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 5px;
`;

const SortingOption = styled.li<{ isSelected: boolean }>`
  padding: 8px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 8px;
  color: ${(props) => (props.isSelected ? "#ffa585" : "#737380")};
  background-color: ${(props) => (props.isSelected ? "#fff" : "transparent")};

  &:hover {
    background-color: #f4f4f4;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

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
