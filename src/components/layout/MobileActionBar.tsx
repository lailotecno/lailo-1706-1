import React from 'react';
import { Search, ArrowUpDown, SlidersHorizontal, X, Grid3x3, LayoutList } from 'lucide-react';
import { ViewMode } from '../../types/auction';

interface MobileActionBarProps {
  showSearch: boolean;
  searchQuery: string;
  viewMode: ViewMode;
  onSearchToggle: () => void;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onSortClick: () => void;
  onFiltersClick: () => void;
  onViewModeChange: (mode: ViewMode) => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({
  showSearch,
  searchQuery,
  viewMode,
  onSearchToggle,
  onSearchChange,
  onSearchSubmit,
  onSortClick,
  onFiltersClick,
  onViewModeChange
}) => {
  return (
    <div className="min-[768px]:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 h-16">
      {showSearch ? (
        // Search Bar Mode
        <div className="px-4 py-3 h-full flex items-center">
          <form onSubmit={onSearchSubmit} className="flex items-center gap-3 w-full">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Busque por palavra-chave"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            </div>
            <button
              type="button"
              onClick={onSearchToggle}
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
                onClick={onSearchToggle}
                className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
              
              <button
                onClick={onSortClick}
                className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>
              
              <button
                onClick={onFiltersClick}
                className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
            
            <div className="bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => onViewModeChange('horizontal')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'horizontal'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange('vertical')}
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
  );
};