import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { PaginationNavContainer, PaginationControls, PageButton, ArrowButton } from "./styles/PaginationNav.styles";


interface PaginationNavProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationNav: React.FC<PaginationNavProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <PaginationNavContainer>
      <PaginationControls>
        {[...Array(totalPages)].map((_, index) => (
          <PageButton
            key={index}
            onClick={() => onPageChange(index + 1)}
            disabled={currentPage === index + 1}
            data-testid={`page-button-${index + 1}`}>
            {index + 1}
          </PageButton>
        ))}
      </PaginationControls>
      <ArrowButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        data-testid="arrow-left">
        <MdChevronLeft />
      </ArrowButton>
      <ArrowButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        data-testid="arrow-right">
        <MdChevronRight />
      </ArrowButton>
    </PaginationNavContainer>
  );
};

export default PaginationNav;
