import React from "react";
import styled from "styled-components";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";


interface PaginationNavProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationNavContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 8px;
  padding: 0px 160px;

  @media (max-width: 365px) {
    padding: 0px 20px;
    justify-content: center;
  }

  @media (min-width: 365px) and (max-width: 576px) {
    padding: 0px 20px;
    justify-content: center;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    padding: 0px 20px;
    justify-content: center;
  }

  @media (min-width: 768px) and (max-width: 992px) {
    padding: 0px 20px;
  }

  @media (min-width: 992px) and (max-width: 1200px) {
    padding: 0px 20px;
  }
`;

const ArrowButton = styled.button`
  font-size: 24px;
  background-color: #e9e9f0;
  color: #737380;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  height: 32px;
  width: 32px;
  display: grid;
  align-items: center;
  justify-items: center;

  &:hover{
    background-color: #dedee5;
  }

  &:disabled {
    cursor: not-allowed;

    &:hover{
      background-color: #e9e9f0;
    }
  }
`;

const PageButton = styled.button`
  background-color: #e9e9f0;
  height: 32px;
  width: 32px;
  color: #737380;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  font-family: "Saira", sans-serif;

  &:hover{
    background-color: #dedee5;
  }

  &:disabled {
    background-color: #fff;
    cursor: not-allowed;
    color: #ffa585;
    border: 1px solid #ffa585;
  }
`;

const PaginationControls = styled.div`
  display: flex;
  gap: 8px;
`;

const PaginationNav: React.FC<PaginationNavProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <PaginationNavContainer>
      <PaginationControls>
        {[...Array(totalPages)].map((_, index) => (
          <PageButton
            key={index}
            onClick={() => onPageChange(index + 1)}
            disabled={currentPage === index + 1}>
            {index + 1}
          </PageButton>
        ))}
      </PaginationControls>
      <ArrowButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        <MdChevronLeft />
      </ArrowButton>
      <ArrowButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        <MdChevronRight />
      </ArrowButton>
    </PaginationNavContainer>
  );
};

export default PaginationNav;
