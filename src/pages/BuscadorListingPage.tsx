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

interface BuscadorListingPageProps {
  category: Category;
}

const ITEMS_PER_PAGE = 30;

// Default filter states
const defaultImoveisFilters = {
  estado: "",
  cidade: "",
  area: [0, 1000] as [number, number],
  valor: [0, 5000000] as [number, number],
  formato: "",
  origem: [] as string[],
  etapa: [] as string[]
}

const defaultVeiculosFilters = {
  estado: "",
  cidade: "",
  marca: "",
  modelo: "",
  cor: "",
  ano: [1990, 2024] as [number, number],
  preco: [0, 500000] as [number, number],
  formato: "",
  origem: [] as string[],
  etapa: [] as string[]
}

// Global state for view mode persistence
let globalViewMode: ViewMode = 'horizontal';

export const BuscadorListingPage: React.FC<BuscadorListingPageProps> = ({ category }) => {
  const { tipo } = useParams<{ tipo: string }>();
  const [viewMode, setViewMode] = useState<ViewMode>(globalViewMode);
  const [showFilters, setShowFilters] = useState(false);
  const [showSortPopover, setShowSortPopover] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Staged filter states (what user is editing)
  const [stagedImoveisFilters, setStagedImoveisFilters] = useState(defaultImoveisFilters);
  const [stagedVeiculosFilters, setStagedVeiculosFilters] = useState(defaultVeiculosFilters);

  // Applied filter states (what actually filters the results)
  const [appliedImoveisFilters, setAppliedImoveisFilters] = useState(defaultImoveisFilters);
  const [appliedVeiculosFilters, setAppliedVeiculosFilters] = useState(defaultVeiculosFilters);

  // Update global view mode when local state changes
  useEffect(() => {
    globalViewMode = viewMode;
  }, [viewMode]);

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
  
  // Get filtered and sorted auctions using APPLIED filters
  const filteredAndSortedAuctions = useMemo(() => {
    const filters = category === 'imoveis' ? appliedImoveisFilters : appliedVeiculosFilters;
    return getAuctionsByCategory(category, currentType, filters, selectedSort, searchQuery);
  }, [category, currentType, appliedImoveisFilters, appliedVeiculosFilters, selectedSort, searchQuery]);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedAuctions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentAuctions = filteredAndSortedAuctions.slice(startIndex, endIndex);
  
  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [appliedImoveisFilters, appliedVeiculosFilters, selectedSort, searchQuery, currentType]);
  
  // Check if there are active filters
  const hasActiveFilters = useMemo(() => {
    const filters = category === 'imoveis' ? appliedImoveisFilters : appliedVeiculosFilters;
    
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
        filters.ano[0] !== defaultVeiculosFilters.ano[0] ||
        filters.ano[1] !== defaultVeiculosFilters.ano[1] ||
        filters.preco[0] !== defaultVeiculosFilters.preco[0] ||
        filters.preco[1] !== defaultVeiculosFilters.preco[1]
      )) ||
      (category === 'imoveis' && (
        filters.area[0] !== defaultImoveisFilters.area[0] ||
        filters.area[1] !== defaultImoveisFilters.area[1] ||
        filters.valor[0] !== defaultImoveisFilters.valor[0] ||
        filters.valor[1] !== defaultImoveisFilters.valor[1]
      ))
    );
  }, [category, appliedImoveisFilters, appliedVeiculosFilters]);
  
  const getStatusText = () => {
    const count = filteredAndSortedAuctions.length;
    const newCount = filteredAndSortedAuctions.filter(auction => auction.isNew).length;
    
    return (
      <>
        <span className="font-medium">Encontramos</span> <span className="font-semibold text-blue-600">{count}</span> <span className="font-medium">leilões em</span> <span className="font-semibold text-blue-600">8</span> <span className="font-medium">sites</span>
        {newCount > 0 && (
          <> <span className="font-medium">•</span> <span className="font-semibold text-blue-600">{newCount}</span> <span className="font-medium">novos hoje</span></>
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
      setSearchQuery('');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the useMemo dependency
  };

  const handleApplyFilters = () => {
    // Copy staged filters to applied filters
    if (category === 'imoveis') {
      setAppliedImoveisFilters({ ...stagedImoveisFilters });
    } else {
      setAppliedVeiculosFilters({ ...stagedVeiculosFilters });
    }
    console.log('Filters applied:', category === 'imoveis' ? stagedImoveisFilters : stagedVeiculosFilters);
  };

  const handleClearFilters = () => {
    // Reset both staged and applied filters
    if (category === 'imoveis') {
      setStagedImoveisFilters(defaultImoveisFilters);
      setAppliedImoveisFilters(defaultImoveisFilters);
    } else {
      setStagedVeiculosFilters(defaultVeiculosFilters);
      setAppliedVeiculosFilters(defaultVeiculosFilters);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setShowSearch(false);
  };

  const handleSortChange = (sort: SortOption) => {
    setSelectedSort(sort);
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
                onClick={() => setViewMode('horizontal')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'horizontal'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Visualização horizontal"
              >
                <LayoutList className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('vertical')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'vertical'
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                  onClick={() => setViewMode('horizontal')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'horizontal'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('vertical')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'vertical'
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
            imoveisFilters={stagedImoveisFilters}
            veiculosFilters={stagedVeiculosFilters}
            onImoveisFiltersChange={setStagedImoveisFilters}
            onVeiculosFiltersChange={setStagedVeiculosFilters}
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
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
            
            <main className="w-full px-4 md:px-6 overflow-x-hidden">
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
                        <span>{getSortLabel(selectedSort)}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      
                      {/* Desktop Sort Popover - APENAS DESKTOP */}
                      <SortPopover
                        isOpen={showSortPopover}
                        onClose={() => setShowSortPopover(false)}
                        selectedSort={selectedSort}
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
                  onClearSearch={searchQuery ? handleClearSearch : undefined}
                  searchQuery={searchQuery}
                />
              ) : (
                <>
                  {/* Auction Cards */}
                  <div className={
                    viewMode === 'horizontal'
                      ? 'space-y-3 w-full'
                      : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 w-full'
                  }>
                    {currentAuctions.map((auction) => (
                      <AuctionCard
                        key={auction.id}
                        auction={auction}
                        viewMode={viewMode}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Pagination Container - SEMPRE PRESENTE para evitar layout shift */}
              <div className="mt-8 mb-8 w-full overflow-x-auto">
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
        imoveisFilters={stagedImoveisFilters}
        veiculosFilters={stagedVeiculosFilters}
        onImoveisFiltersChange={setStagedImoveisFilters}
        onVeiculosFiltersChange={setStagedVeiculosFilters}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />

      {/* Mobile Sort Popover - APENAS MOBILE - ESCONDIDO NO DESKTOP */}
      <div className="min-[768px]:hidden">
        <SortPopover
          isOpen={showSortPopover}
          onClose={() => setShowSortPopover(false)}
          selectedSort={selectedSort}
          onSortChange={handleSortChange}
          isMobile={true}
        />
      </div>
    </div>
  );
};