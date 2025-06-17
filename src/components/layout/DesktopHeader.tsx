import React, { useCallback } from 'react';
import { Grid3x3, LayoutList } from 'lucide-react';
import { ViewMode, SortOption, Category } from '../../types/auction';
import { TypeNavigationTabs } from '../TypeNavigationTabs';

interface DesktopHeaderProps {
  category: Category;
  viewMode: ViewMode;
  sortOption: SortOption;
  showSortPopover: boolean;
  onViewModeChange: (mode: ViewMode) => void;
  onSortToggle: () => void;
  onSortChange: (sort: SortOption) => void;
  onSortClose: () => void;
}

// 🚀 OTIMIZAÇÃO: React.memo para evitar re-renderizações desnecessárias
export const DesktopHeader: React.FC<DesktopHeaderProps> = React.memo(({
  category,
  viewMode,
  onViewModeChange
}) => {
  // 🚀 OTIMIZAÇÃO: Memoizar handlers
  const handleHorizontalView = useCallback(() => {
    onViewModeChange('horizontal');
  }, [onViewModeChange]);

  const handleVerticalView = useCallback(() => {
    onViewModeChange('vertical');
  }, [onViewModeChange]);

  return (
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
              onClick={handleHorizontalView}
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
              onClick={handleVerticalView}
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
  );
});

// 🚀 OTIMIZAÇÃO: Definir displayName para debugging
DesktopHeader.displayName = 'DesktopHeader';