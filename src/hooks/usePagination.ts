import { useState, useEffect } from 'react';
import { Auction } from '../types/auction';

interface UsePaginationProps {
  auctions: Auction[];
  itemsPerPage: number;
  dependencies: any[]; // Dependencies that should reset pagination
}

export const usePagination = ({ auctions, itemsPerPage, dependencies }: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Reset page when dependencies change
  useEffect(() => {
    setCurrentPage(1);
  }, dependencies);
  
  const totalPages = Math.ceil(auctions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAuctions = auctions.slice(startIndex, endIndex);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return {
    currentPage,
    totalPages,
    currentAuctions,
    handlePageChange
  };
};