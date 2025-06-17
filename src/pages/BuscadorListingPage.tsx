import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid3x3, LayoutList, ChevronDown, SlidersHorizontal, ArrowUpDown, Search, X } from 'lucide-react';
import { AuctionCard } from '../components/AuctionCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { SortPopover } from '../components/SortPopover';
import { TypeNavigationTabs } from '../components/TypeNavigationTabs';
import { Pagination } from '../components/Pagination';
import { EmptyState } from '../components/EmptyState';
import { getAuctionsByCategory } from '../data/mockAuctions';
import { ViewMode, SortOption, Category } from '../types/auction';
import { isValidVehicleType, isValidPropertyType } from '../utils/typeNormalization';
import { useAppContext } from '../contexts/AppContext';

interface BuscadorListingPageProps {
  category: Category;
}

const ITEMS_PER_PAGE = 30;

export const BuscadorListingPage: React.FC<BuscadorListingPageProps> = ({ category }) => {
  const { tipo } = useParams<{ tipo: string }>();
  const { state, actions } = useAppContext();
  
  // Estados locais (não persistidos)
  const [showFilters, setShowFilters] = useState(false);
  const [showSortPopover, setShowSortPopover] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSearch, setShowSearch] = useState(false);

  console.log('🏠 BuscadorListingPage - Estado do contexto:', {
    category,
    viewMode: state.viewMode,
    sortOption: state.sortOption,
    searchQuery: state.searchQuery,
    appliedFilters: state.appliedFilters,
    stagedFilters: state.stagedFilters
  });

  // Validar e normalizar o tipo
  const getCurrentType = (): string => {
    if (!tipo) return 'todos';
    
    if (category === 'veiculos') {
      return isValidVehicleType(tipo) ? tipo : 'todos';
    } else {
      return isValidPropertyType(tipo) ? tipo : 'todos';
    }
  };

  const currentType = getCurrentType();
  
  // CORREÇÃO: Get filtered and sorted auctions using APPLIED filters (não staged)
  const { auctions: filteredAndSortedAuctions, totalSites, newAuctions } = useMemo(() => {
    console.log('🔍 Buscando leilões:', { category, currentType, sortOption: state.sortOption, searchQuery: state.searchQuery });
    
    try {
      // CORREÇÃO: Convert our APPLIED filter format to the expected format
      const filters = category === 'imoveis' ? {
        format: state.appliedFilters.imoveis.formato || undefined,
        origin: state.appliedFilters.imoveis.origem.length > 0 ? state.appliedFilters.imoveis.origem : undefined,
        stage: state.appliedFilters.imoveis.etapa.length > 0 ? state.appliedFilters.imoveis.etapa : undefined,
        state: state.appliedFilters.imoveis.estado && state.appliedFilters.imoveis.estado !== "all" ? state.appliedFilters.imoveis.estado : undefined,
        city: state.appliedFilters.imoveis.cidade && state.appliedFilters.imoveis.cidade !== "all" ? state.appliedFilters.imoveis.cidade : undefined,
        useful_area_m2: state.appliedFilters.imoveis.area,
        initial_bid_value: state.appliedFilters.imoveis.valor
      } : {
        format: state.appliedFilters.veiculos.formato || undefined,
        origin: state.appliedFilters.veiculos.origem.length > 0 ? state.appliedFilters.veiculos.origem : undefined,
        stage: state.appliedFilters.veiculos.etapa.length > 0 ? state.appliedFilters.veiculos.etapa : undefined,
        state: state.appliedFilters.veiculos.estado && state.appliedFilters.veiculos.estado !== "all" ? state.appliedFilters.veiculos.estado : undefined,
        city: state.appliedFilters.veiculos.cidade && state.appliedFilters.veiculos.cidade !== "all" ? state.appliedFilters.veiculos.cidade : undefined,
        brand: state.appliedFilters.veiculos.marca && state.appliedFilters.veiculos.marca !== "all" ? state.appliedFilters.veiculos.marca : undefined,
        model: state.appliedFilters.veiculos.modelo && state.appliedFilters.veiculos.modelo !== "all" ? state.appliedFilters.veiculos.modelo : undefined,
        color: state.appliedFilters.veiculos.cor && state.appliedFilters.veiculos.cor !== "all" ? state.appliedFilters.veiculos.cor : undefined,
        year: state.appliedFilters.veiculos.ano,
        initial_bid_value: state.appliedFilters.veiculos.preco
      };

      const result = getAuctionsByCategory(category, currentType, filters, state.sortOption, state.searchQuery);
      console.log('📊 Resultado da busca:', result);
      
      return result;
    } catch (error) {
      console.error('❌ Erro ao buscar leilões:', error);
      return { auctions: [], totalSites: 0, newAuctions: 0 };
    }
  }, [category, currentType, state.appliedFilters, state.sortOption, state.searchQuery]); // CORREÇÃO: Usar appliedFilters
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedAuctions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentAuctions = filteredAndSortedAuctions.slice(startIndex, endIndex);
  
  console.log('📄 Paginação:', { 
    totalAuctions: filteredAndSortedAuctions.length, 
    totalPages, 
    currentPage, 
    currentAuctions: currentAuctions.length 
  });
  
  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [state.appliedFilters, state.sortOption, state.searchQuery, currentType]); // CORREÇÃO: Usar appliedFilters
  
  // Check if there are active filters
  const hasActiveFilters = useMemo(() => {
    // CORREÇÃO: Usar appliedFilters para verificar se há filtros ativos
    const filters = category === 'imoveis' ? state.appliedFilters.imoveis : state.appliedFilters.veiculos;
    
    return (
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
  }, [category, state.appliedFilters]); // CORREÇÃO: Usar appliedFilters
  
  const getStatusText = () => {
    const count = filteredAndSortedAuctions.length;
    
    return (
      <>
        <span className="font-medium">Encontramos</span> <span className="font-semibold text-blue-600">{count}</span> <span className="font-medium">leilões em</span> <span className="font-semibold text-blue-600">{totalSites}</span> <span className="font-medium">sites</span>
        {newAuctions > 0 && (
          <> <span className="font-medium">•</span> <span className="font-semibold text-blue-600">{newAuctions}</span> <span className="font-medium">novos hoje</span></>
        )}
      </>
    );
  };

  const getSortLabel = (sort: SortOption) => {
    const labels = {
      'newest': 'Mais recentes',
      'lowest-bid': 'Menor valor',
      'highest-bid': 'Maior valor',
      'highest-discount': 'Maior desconto',
      'nearest': 'Mais próximos',
    };
    return labels[sort];
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      actions.setSearchQuery('');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the useMemo dependency
  };

  const handleClearFilters = () => {
    if (category === 'imoveis') {
      actions.clearImoveisFilters();
    } else {
      actions.clearVeiculosFilters();
    }
  };

  const handleClearSearch = () => {
    actions.setSearchQuery('');
    setShowSearch(false);
  };

  const handleSortChange = (sort: SortOption) => {
    actions.setSortOption(sort);
    setShowSortPopover(false);
  };

  // Close sort popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSortPopover) {
        const target = event.target as Element;
        if (!target.closest('[data-sort-container]')) {
          setShowSortPopover(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSortPopover]);

  // Show empty state if no auctions found
  const showEmptyState = filteredAndSortedAuctions.length === 0;

  return (
    <div className="flex flex-col h-screen pb-20 max-[767px]:pb-20 min-[768px]:pb-0 md:pl-20 overflow-x-hidden">
      {/* Desktop Header - Type Navigation Tabs with View Toggle - Always Visible (768px+) */}
      <div className="hidden min-[768px]:block bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="px-4 md:px-6">
          <div className="flex items-center">
            <div className="flex-1">
              <TypeNavigationTabs category={category} />
            </div>
            
            {/* Divider */}
            <div className="h-8 w-px bg-gray-200 mx-4"></div>
            
            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1 flex-shrink-0">
              <button
                onClick={() => actions.setViewMode('horizontal')}
                className={`p-2 rounded-md transition-colors ${
                  state.viewMode === 'horizontal'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Visualização horizontal"
              >
                <LayoutList className="w-4 h-4" />
              </button>
              <button
                onClick={() => actions.setViewMode('vertical')}
                className={`p-2 rounded-md transition-colors ${
                  state.viewMode === 'vertical'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Visualização em grade"
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Action Bar - Fixed at top (below 768px only) */}
      <div className="min-[768px]:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 h-16">
        {showSearch ? (
          // Search Bar Mode
          <div className="px-4 py-3 h-full flex items-center">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 w-full">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={state.searchQuery}
                  onChange={(e) => actions.setSearchQuery(e.target.value)}
                  placeholder="Busque por palavra-chave"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>
              <button
                type="button"
                onClick={handleSearchToggle}
                className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          // Normal Action Bar Mode
          <div className="px-4 py-3 h-full flex items-center">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSearchToggle}
                  className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => setShowSortPopover(true)}
                  className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <ArrowUpDown className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => setShowFilters(true)}
                  className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
              </div>
              
              <div className="bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => actions.setViewMode('horizontal')}
                  className={`p-2 rounded-lg transition-colors ${
                    state.viewMode === 'horizontal'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
                <button
                  onClick={() => actions.setViewMode('vertical')}
                  className={`p-2 rounded-lg transition-colors ${
                    state.viewMode === 'vertical'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 min-h-0 overflow-x-hidden">
        {/* Desktop Sidebar - Visible from 768px+ */}
        <div className="hidden min-[768px]:block w-[35%] max-w-md flex-shrink-0">
          <FilterSidebar 
            category={category}
            currentVehicleType={tipo || 'todos'}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-0 min-w-0 overflow-x-hidden">
          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden pt-16 min-[768px]:pt-0">
            {/* Mobile Type Navigation Tabs - Inside scrollable area (below 768px only) */}
            <div className="min-[768px]:hidden overflow-x-hidden bg-white border-b border-gray-100">
              <div className="px-4">
                <TypeNavigationTabs category={category} />
              </div>
            </div>
            
            {/* 🔧 CORREÇÃO: Container com altura mínima fixa para evitar layout shift */}
            <main className="w-full px-4 md:px-6 overflow-x-hidden min-h-[calc(100vh-200px)]">
              {/* Header with status and desktop sort control - Only show if there are results */}
              {!showEmptyState && (
                <div className="flex flex-col min-[768px]:flex-row min-[768px]:items-center min-[768px]:justify-between py-4 gap-3 w-full">
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-600 text-sm break-words">
                      {getStatusText()}
                    </p>
                  </div>
                  
                  {/* Desktop Sort Control Only (768px+) */}
                  <div className="hidden min-[768px]:flex items-center flex-shrink-0">
                    <div className="relative" data-sort-container>
                      <button
                        onClick={() => setShowSortPopover(!showSortPopover)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                      >
                        <span>{getSortLabel(state.sortOption)}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      
                      {/* Desktop Sort Popover - APENAS DESKTOP */}
                      <SortPopover
                        isOpen={showSortPopover}
                        onClose={() => setShowSortPopover(false)}
                        selectedSort={state.sortOption}
                        onSortChange={handleSortChange}
                        isMobile={false}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Empty State or Auction Cards */}
              {showEmptyState ? (
                <EmptyState
                  category={category}
                  hasActiveFilters={hasActiveFilters}
                  onClearFilters={handleClearFilters}
                  onClearSearch={state.searchQuery ? handleClearSearch : undefined}
                  searchQuery={state.searchQuery}
                />
              ) : (
                <>
                  {/* Auction Cards */}
                  <div className={
                    state.viewMode === 'horizontal'
                      ? 'space-y-3 w-full min-h-[400px]'
                      : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 w-full min-h-[400px]'
                  }>
                    {currentAuctions.map((auction) => (
                      <AuctionCard
                        key={auction._id}
                        auction={auction}
                        viewMode={state.viewMode}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* CORREÇÃO: Container da paginação SEMPRE presente com altura fixa */}
              <div className="mt-8 mb-8 w-full overflow-x-auto h-[72px] flex items-center justify-center">
                {!showEmptyState && totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <FilterSidebar
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        isMobile={true}
        category={category}
        currentVehicleType={tipo || 'todos'}
      />

      {/* Mobile Sort Popover - APENAS MOBILE - ESCONDIDO NO DESKTOP */}
      <div className="min-[768px]:hidden">
        <SortPopover
          isOpen={showSortPopover}
          onClose={() => setShowSortPopover(false)}
          selectedSort={state.sortOption}
          onSortChange={handleSortChange}
          isMobile={true}
        />
      </div>
    </div>
  );
};