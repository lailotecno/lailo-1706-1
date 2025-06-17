import { useMemo } from 'react';
import { Category } from '../types/auction';

interface UseActiveFiltersProps {
  category: Category;
  appliedFilters: any;
}

export const useActiveFilters = ({ category, appliedFilters }: UseActiveFiltersProps) => {
  // 🚀 OTIMIZAÇÃO: useMemo com dependências estáveis
  return useMemo(() => {
    console.log('🔍 useActiveFilters - Verificando filtros ativos para:', category);
    
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
    
    console.log('📊 useActiveFilters - Resultado:', hasActiveFilters);
    return hasActiveFilters;
  }, [
    category,
    // 🎯 OTIMIZAÇÃO: Usar JSON.stringify para comparação profunda estável
    JSON.stringify(appliedFilters)
  ]);
};