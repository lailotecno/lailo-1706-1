import { useState, useEffect, useMemo } from 'react';
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
    console.log('📄 usePagination - Resetando página devido a mudanças nas dependências');
    setCurrentPage(1);
  }, dependencies);
  
  // 🚀 OTIMIZAÇÃO: Memoizar cálculos de paginação
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(auctions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentAuctions = auctions.slice(startIndex, endIndex);
    
    console.log('📊 usePagination - Dados calculados:', {
      totalAuctions: auctions.length,
      totalPages,
      currentPage,
      startIndex,
      endIndex,
      currentAuctionsCount: currentAuctions.length
    });
    
    return {
      totalPages,
      currentAuctions
    };
  }, [auctions, itemsPerPage, currentPage]);
  
  const handlePageChange = (page: number) => {
    console.log('📄 usePagination - Mudando para página:', page);
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return {
    currentPage,
    totalPages: paginationData.totalPages,
    currentAuctions: paginationData.currentAuctions,
    handlePageChange
  };
};