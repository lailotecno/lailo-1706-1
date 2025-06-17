import { useMemo } from 'react';
import { Category, UseActiveFiltersParams } from '../types/auction';

export const useActiveFilters = ({ category, appliedFilters }: UseActiveFiltersParams): boolean => {
  // 🚀 OTIMIZAÇÃO: useMemo com dependências estáveis
  return useMemo(() => {
    const filters = category === 'imoveis' ? appliedFilters.imoveis : appliedFilters.veiculos;
    
    const hasActiveFilters = (
      (filters.estado && filters.estado !== "all") ||
      (filters.cidade && filters.cidade !== "all") ||
      filters.formato ||
      filters.origem.length > 0 ||
      filters.etapa.length > 0 ||
      (category === 'veiculos' && (
        (filters.marca && filters.marca !== "all") ||
        (filters.modelo && filters.modelo !== "all") ||
        (filters.cor && filters.cor !== "all") ||
        filters.ano[0] !== 1990 ||
        filters.ano[1] !== 2024 ||
        filters.preco[0] !== 0 ||
        filters.preco[1] !== 500000
      )) ||
      (category === 'imoveis' && (
        filters.area[0] !== 0 ||
        filters.area[1] !== 1000 ||
        filters.valor[0] !== 0 ||
        filters.valor[1] !== 5000000
      ))
    );
    
    return hasActiveFilters;
  }, [
    category,
    // 🎯 OTIMIZAÇÃO: Usar JSON.stringify para comparação profunda estável
    JSON.stringify(appliedFilters)
  ]);
};