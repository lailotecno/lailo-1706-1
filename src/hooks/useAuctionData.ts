import { useMemo } from 'react';
import { getAuctionsByCategory } from '../data/mockAuctions';
import { Category, SortOption, Filters } from '../types/auction';

interface UseAuctionDataProps {
  category: Category;
  currentType: string;
  appliedFilters: any;
  sortOption: SortOption;
  searchQuery: string;
}

export const useAuctionData = ({
  category,
  currentType,
  appliedFilters,
  sortOption,
  searchQuery
}: UseAuctionDataProps) => {
  // 🚀 OTIMIZAÇÃO: useMemo com dependências específicas e estáveis
  return useMemo(() => {
    try {
      // Convert our APPLIED filter format to the expected format
      const filters: Filters = category === 'imoveis' ? {
        format: appliedFilters.imoveis.formato || undefined,
        origin: appliedFilters.imoveis.origem.length > 0 ? appliedFilters.imoveis.origem : undefined,
        stage: appliedFilters.imoveis.etapa.length > 0 ? appliedFilters.imoveis.etapa : undefined,
        state: appliedFilters.imoveis.estado && appliedFilters.imoveis.estado !== "all" ? appliedFilters.imoveis.estado : undefined,
        city: appliedFilters.imoveis.cidade && appliedFilters.imoveis.cidade !== "all" ? appliedFilters.imoveis.cidade : undefined,
        useful_area_m2: appliedFilters.imoveis.area,
        initial_bid_value: appliedFilters.imoveis.valor
      } : {
        format: appliedFilters.veiculos.formato || undefined,
        origin: appliedFilters.veiculos.origem.length > 0 ? appliedFilters.veiculos.origem : undefined,
        stage: appliedFilters.veiculos.etapa.length > 0 ? appliedFilters.veiculos.etapa : undefined,
        state: appliedFilters.veiculos.estado && appliedFilters.veiculos.estado !== "all" ? appliedFilters.veiculos.estado : undefined,
        city: appliedFilters.veiculos.cidade && appliedFilters.veiculos.cidade !== "all" ? appliedFilters.veiculos.cidade : undefined,
        brand: appliedFilters.veiculos.marca && appliedFilters.veiculos.marca !== "all" ? appliedFilters.veiculos.marca : undefined,
        model: appliedFilters.veiculos.modelo && appliedFilters.veiculos.modelo !== "all" ? appliedFilters.veiculos.modelo : undefined,
        color: appliedFilters.veiculos.cor && appliedFilters.veiculos.cor !== "all" ? appliedFilters.veiculos.cor : undefined,
        year: appliedFilters.veiculos.ano,
        initial_bid_value: appliedFilters.veiculos.preco
      };

      const result = getAuctionsByCategory(category, currentType, filters, sortOption, searchQuery);
      
      return result;
    } catch (error) {
      console.error('Erro ao buscar leilões:', error);
      return { auctions: [], totalSites: 0, newAuctions: 0 };
    }
  }, [
    // 🎯 OTIMIZAÇÃO: Dependências específicas e estáveis
    category,
    currentType,
    sortOption,
    searchQuery,
    // Para filtros, usar JSON.stringify para comparação profunda estável
    JSON.stringify(appliedFilters)
  ]);
};