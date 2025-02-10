import { useState } from "react";

export const usePagination = <T>(itemsPerPage: number, totalItems: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentItems = (items: T[]) => {
    return items.slice(indexOfFirstItem, indexOfLastItem);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return { currentPage, totalPages, currentItems, handlePageChange };
};
