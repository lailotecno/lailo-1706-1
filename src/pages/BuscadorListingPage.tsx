import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FilterSidebar } from '../components/FilterSidebar';
import { SortPopover } from '../components/SortPopover';
import { TypeNavigationTabs } from '../components/TypeNavigationTabs';
import { Pagination } from '../components/Pagination';
import { EmptyState } from '../components/EmptyState';
import { MobileActionBar } from '../components/layout/MobileActionBar';
import { DesktopHeader } from '../components/layout/DesktopHeader';
import { StatusHeader } from '../components/layout/StatusHeader';
import { AuctionGrid } from '../components/layout/AuctionGrid';
import { Category, SortOption } from '../types/auction';
import { isValidVehicleType, isValidPropertyType } from '../utils/typeNormalization';
import { useAppContext } from '../contexts/AppContext';
import { useAuctionData } from '../hooks/useAuctionData';
import { useActiveFilters } from '../hooks/useActiveFilters';
import { usePagination } from '../hooks/usePagination';
import { PAGINATION_CONFIG } from '../config/constants';

interface BuscadorListingPageProps {
  category: Category;
}

export const BuscadorListingPage: React.FC<BuscadorListingPageProps> = ({ category }) => {
  const { tipo } = useParams<{ tipo: string }>();
  const { state, actions } = useAppContext();
  
  // Estados locais (não persistidos)
  const [showFilters, setShowFilters] = useState(false);
  const [showSortPopover, setShowSortPopover] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

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
  
  // Custom hooks para separar responsabilidades
  const { auctions: filteredAndSortedAuctions, totalSites, newAuctions } = useAuctionData({
    category,
    currentType,
    appliedFilters: state.appliedFilters,
    sortOption: state.sortOption,
    searchQuery: state.searchQuery
  });

  const hasActiveFilters = useActiveFilters({
    category,
    appliedFilters: state.appliedFilters
  });

  const { currentPage, totalPages, currentAuctions, handlePageChange } = usePagination({
    auctions: filteredAndSortedAuctions,
    itemsPerPage: PAGINATION_CONFIG.ITEMS_PER_PAGE,
    dependencies: [state.appliedFilters, state.sortOption, state.searchQuery, currentType]
  });

  // Event handlers
  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      actions.setSearchQuery('');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the useAuctionData hook
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
      {/* Desktop Header */}
      <DesktopHeader
        category={category}
        viewMode={state.viewMode}
        sortOption={state.sortOption}
        showSortPopover={showSortPopover}
        onViewModeChange={actions.setViewMode}
        onSortToggle={() => setShowSortPopover(!showSortPopover)}
        onSortChange={handleSortChange}
        onSortClose={() => setShowSortPopover(false)}
      />

      {/* Mobile Action Bar */}
      <MobileActionBar
        showSearch={showSearch}
        searchQuery={state.searchQuery}
        viewMode={state.viewMode}
        onSearchToggle={handleSearchToggle}
        onSearchChange={actions.setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onSortClick={() => setShowSortPopover(true)}
        onFiltersClick={() => setShowFilters(true)}
        onViewModeChange={actions.setViewMode}
      />

      <div className="flex flex-1 min-h-0 overflow-x-hidden">
        {/* Desktop Sidebar */}
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
            {/* Mobile Type Navigation Tabs */}
            <div className="min-[768px]:hidden overflow-x-hidden bg-white border-b border-gray-100">
              <div className="px-4">
                <TypeNavigationTabs category={category} />
              </div>
            </div>
            
            <main className="w-full px-4 md:px-6 overflow-x-hidden min-h-[calc(100vh-200px)]">
              {/* Status Header - Only show if there are results */}
              {!showEmptyState && (
                <StatusHeader
                  totalAuctions={filteredAndSortedAuctions.length}
                  totalSites={totalSites}
                  newAuctions={newAuctions}
                  sortOption={state.sortOption}
                  showSortPopover={showSortPopover}
                  onSortToggle={() => setShowSortPopover(!showSortPopover)}
                  onSortChange={handleSortChange}
                  onSortClose={() => setShowSortPopover(false)}
                />
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
                <AuctionGrid
                  auctions={currentAuctions}
                  viewMode={state.viewMode}
                />
              )}

              {/* Pagination Container */}
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

      {/* Mobile Sort Popover */}
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