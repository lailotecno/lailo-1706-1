import React, { useState, useMemo } from 'react';
import { Grid3x3, LayoutList, ChevronDown, Search, X, ArrowUpDown } from 'lucide-react';
import { AuctionCard } from '../components/AuctionCard';
import { SortPopover } from '../components/SortPopover';
import { Pagination } from '../components/Pagination';
import { mockCarsData } from '../data/mockCarsData';
import { ViewMode, SortOption } from '../types/auction';

const ITEMS_PER_PAGE = 12;

export const CarsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('horizontal');
  const [showSortPopover, setShowSortPopover] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and sort auctions
  const filteredAndSortedAuctions = useMemo(() => {
    let filtered = mockCarsData;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(auction => 
        auction.title.toLowerCase().includes(query) ||
        auction.description.toLowerCase().includes(query) ||
        auction.location.toLowerCase().includes(query) ||
        auction.color?.toLowerCase().includes(query) ||
        auction.year?.includes(query)
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (selectedSort) {
        case 'newest':
          return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
        case 'lowest-bid':
          return a.currentBid - b.currentBid;
        case 'highest-bid':
          return b.currentBid - a.currentBid;
        case 'highest-discount':
          const discountA = a.appraisedValue ? ((a.appraisedValue - a.currentBid) / a.appraisedValue) * 100 : 0;
          const discountB = b.appraisedValue ? ((b.appraisedValue - b.currentBid) / b.appraisedValue) * 100 : 0;
          return discountB - discountA;
        case 'nearest':
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, selectedSort]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedAuctions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentAuctions = filteredAndSortedAuctions.slice(startIndex, endIndex);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSort]);

  const getStatusText = () => {
    const count = filteredAndSortedAuctions.length;
    const newCount = filteredAndSortedAuctions.filter(auction => auction.isNew).length;
    
    return (
      <>
        <span className="font-medium">Encontramos</span> <span className="font-semibold text-blue-600">{count}</span> <span className="font-medium">carros em</span> <span className="font-semibold text-blue-600">15</span> <span className="font-medium">sites</span>
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
  };

  const handleSortChange = (sort: SortOption) => {
    setSelectedSort(sort);
    setShowSortPopover(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 max-[767px]:pb-20 min-[768px]:pb-0 md:pl-20">
      {/* Desktop Header */}
      <div className="hidden min-[768px]:block bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Carros em Leilão</h1>
              <p className="text-gray-600 text-sm mt-1">Encontre o carro ideal nos melhores leilões do Brasil</p>
            </div>
            
            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
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

      {/* Mobile Header */}
      <div className="min-[768px]:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 h-16">
        {showSearch ? (
          <div className="px-4 py-3 h-full flex items-center">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 w-full">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Busque por marca, modelo, cor..."
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
          <div className="px-4 py-3 h-full flex items-center">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-gray-900">Carros</h1>
                
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

      {/* Main Content */}
      <div className="pt-16 min-[768px]:pt-0">
        <main className="w-full px-4 md:px-6">
          {/* Status and Desktop Sort */}
          <div className="flex flex-col min-[768px]:flex-row min-[768px]:items-center min-[768px]:justify-between py-4 gap-3 w-full">
            <div className="min-w-0 flex-1">
              <p className="text-gray-600 text-sm break-words">
                {getStatusText()}
              </p>
            </div>
            
            {/* Desktop Sort Control */}
            <div className="hidden min-[768px]:flex items-center flex-shrink-0">
              <div className="relative" data-sort-container>
                <button
                  onClick={() => setShowSortPopover(!showSortPopover)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  <span>{getSortLabel(selectedSort)}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
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

          {/* Pagination Container */}
          <div className="mt-8 mb-8 w-full overflow-x-auto min-h-[72px] flex items-center justify-center">
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </main>
      </div>

      {/* Mobile Sort Popover */}
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