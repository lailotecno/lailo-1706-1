import React, { useMemo, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { SortOption } from '../../types/auction';
import { SortPopover } from '../SortPopover';
import { LABEL_CONFIG } from '../../config/constants';

interface StatusHeaderProps {
  totalAuctions: number;
  totalSites: number;
  newAuctions: number;
  sortOption: SortOption;
  showSortPopover: boolean;
  onSortToggle: () => void;
  onSortChange: (sort: SortOption) => void;
  onSortClose: () => void;
}

// 🚀 OTIMIZAÇÃO: React.memo para evitar re-renderizações desnecessárias
export const StatusHeader: React.FC<StatusHeaderProps> = React.memo(({
  totalAuctions,
  totalSites,
  newAuctions,
  sortOption,
  showSortPopover,
  onSortToggle,
  onSortChange,
  onSortClose
}) => {
  // 🚀 OTIMIZAÇÃO: Memoizar labels de ordenação usando configuração centralizada
  const getSortLabel = useCallback((sort: SortOption) => {
    return LABEL_CONFIG.SORT_LABELS[sort];
  }, []);

  // 🚀 OTIMIZAÇÃO: Memoizar texto de status
  const statusText = useMemo(() => {
    return (
      <>
        <span className="font-medium">Encontramos</span> <span className="font-semibold text-blue-600">{totalAuctions}</span> <span className="font-medium">leilões em</span> <span className="font-semibold text-blue-600">{totalSites}</span> <span className="font-medium">sites</span>
        {newAuctions > 0 && (
          <> <span className="font-medium">•</span> <span className="font-semibold text-blue-600">{newAuctions}</span> <span className="font-medium">novos hoje</span></>
        )}
      </>
    );
  }, [totalAuctions, totalSites, newAuctions]);

  return (
    <div className="flex flex-col min-[768px]:flex-row min-[768px]:items-center min-[768px]:justify-between py-4 gap-3 w-full">
      <div className="min-w-0 flex-1">
        <p className="text-gray-600 text-sm break-words">
          {statusText}
        </p>
      </div>
      
      {/* Desktop Sort Control Only (768px+) */}
      <div className="hidden min-[768px]:flex items-center flex-shrink-0">
        <div className="relative" data-sort-container>
          <button
            onClick={onSortToggle}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <span>{getSortLabel(sortOption)}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {/* Desktop Sort Popover */}
          <SortPopover
            isOpen={showSortPopover}
            onClose={onSortClose}
            selectedSort={sortOption}
            onSortChange={onSortChange}
            isMobile={false}
          />
        </div>
      </div>
    </div>
  );
});

// 🚀 OTIMIZAÇÃO: Definir displayName para debugging
StatusHeader.displayName = 'StatusHeader';