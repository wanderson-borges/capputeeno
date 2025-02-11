import styled from "styled-components";
import { MdSearch } from "react-icons/md";

export const SearchBarContainer = styled.div`
  position: relative;
  width: 300px;

  @media (min-width: 365px) and (max-width: 576px) {
    width: 100%;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    width: 100%;
  }
`;

export const SearchBarInput = styled.input`
  padding: 8px 12px;
  padding-right: 40px;
  border: none;
  border-radius: 8px;
  width: 100%;
  height: 47px;
  background-color: #F3F5F6;
  font-family: 'Saira', sans-serif;
  font-size: 15px;

  &:focus-visible {
    outline: 2px solid #ededed;
  }
`;

export const SearchIcon = styled(MdSearch)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 20px;
  pointer-events: none;
`;

export const Dropdown = styled.ul`
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 250px;
  overflow-y: auto;
  padding: 8px 0;
  z-index: 10;
`;

export const DropdownItem = styled.li`
  list-style: none;
  padding: 10px;
  font-family: 'Saira', sans-serif;
  font-size: 14px;
  color: #41414d;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: 20px;
  font-weight: 500;

  &:hover {
    background-color: #f3f5f6;
  }
`;

export const ProductImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
`;