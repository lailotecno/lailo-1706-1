import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Category } from '../types/auction';
import { ImoveisFilters } from './filters/ImoveisFilters';
import { VeiculosFilters } from './filters/VeiculosFilters';
import { useParams } from 'react-router-dom';

interface FilterSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
  category: Category;
  imoveisFilters: any;
  veiculosFilters: any;
  onImoveisFiltersChange: (filters: any) => void;
  onVeiculosFiltersChange: (filters: any) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  isOpen = true, 
  onClose, 
  isMobile = false,
  category,
  imoveisFilters,
  veiculosFilters,
  onImoveisFiltersChange,
  onVeiculosFiltersChange,
  onApplyFilters,
  onClearFilters
}) => {
  const { tipo } = useParams<{ tipo: string }>();
  const [isApplying, setIsApplying] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  // 🛡️ CORREÇÃO: Verificação defensiva para evitar erro #130
  if (!category) {
    console.warn('⚠️ FilterSidebar: category prop é obrigatório');
    return null;
  }

  const handleApplyFilters = async () => {
    setIsApplying(true);
    
    // Simular um pequeno delay para feedback visual
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      onApplyFilters();
    } catch (error) {
      console.error('❌ Erro ao aplicar filtros:', error);
    }
    
    setIsApplying(false);
    
    if (isMobile && onClose) {
      onClose();
    }
  };

  const handleClearFilters = async () => {
    setIsClearing(true);
    
    // Simular um pequeno delay para feedback visual
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      onClearFilters();
    } catch (error) {
      console.error('❌ Erro ao limpar filtros:', error);
    }
    
    setIsClearing(false);
  };

  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={onClose}
          />
        )}
        
        {/* Modal - TELA COMPLETA SEM MOSTRAR LISTAGEM */}
        <div
          className={`fixed inset-0 bg-white z-[70] transform transition-transform duration-300 flex flex-col ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white flex-shrink-0 relative z-[80]">
            <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative z-[80]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filters content - Scrollable area */}
          <div className="flex-1 overflow-y-auto p-4 scrollbar-hide relative z-[75]">
            {category === 'imoveis' ? (
              <ImoveisFilters
                filters={imoveisFilters}
                onFiltersChange={onImoveisFiltersChange}
              />
            ) : (
              <VeiculosFilters
                filters={veiculosFilters}
                onFiltersChange={onVeiculosFiltersChange}
                currentVehicleType={tipo || 'todos'}
              />
            )}
          </div>

          {/* Footer - Fixed at bottom */}
          <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0 relative z-[80]">
            <div className="flex gap-3">
              <button 
                onClick={handleClearFilters}
                disabled={isClearing || isApplying}
                className={`flex-1 px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl transition-all duration-200 font-normal ${
                  isClearing 
                    ? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
                    : 'hover:bg-gray-50 hover:border-gray-400 active:scale-[0.98]'
                }`}
              >
                {isClearing ? 'Limpando...' : 'Limpar'}
              </button>
              <button 
                onClick={handleApplyFilters}
                disabled={isApplying || isClearing}
                className={`flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl transition-all duration-200 font-normal ${
                  isApplying 
                    ? 'bg-blue-500 cursor-not-allowed' 
                    : 'hover:bg-blue-700 active:scale-[0.98] shadow-sm hover:shadow-md'
                }`}
              >
                {isApplying ? 'Aplicando...' : 'Aplicar'}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop version - Compact for notebook screens (768px+)
  return (
    <div className="relative w-full h-full bg-white border-r border-gray-200">
      {/* Header - Compact spacing */}
      <div className="absolute top-4 left-0 right-0 px-4 md:px-6 py-3 border-b border-gray-200 bg-white z-10">
        <h2 className="text-base font-semibold text-gray-900">Filtros</h2>
      </div>

      {/* Filters content - Compact spacing */}
      <div className="absolute top-16 bottom-16 left-0 right-0 overflow-y-auto px-4 md:px-6 py-3 scrollbar-hide">
        {category === 'imoveis' ? (
          <ImoveisFilters
            filters={imoveisFilters}
            onFiltersChange={onImoveisFiltersChange}
          />
        ) : (
          <VeiculosFilters
            filters={veiculosFilters}
            onFiltersChange={onVeiculosFiltersChange}
            currentVehicleType={tipo || 'todos'}
          />
        )}
      </div>

      {/* Footer - Compact */}
      <div className="absolute bottom-0 left-0 right-0 px-4 md:px-6 py-3 border-t border-gray-200 bg-white z-10">
        <div className="flex gap-2">
          <button 
            onClick={handleClearFilters}
            disabled={isClearing || isApplying}
            className={`flex-1 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-xl transition-all duration-200 font-normal ${
              isClearing 
                ? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
                : 'hover:bg-gray-50 hover:border-gray-400 active:scale-[0.98]'
            }`}
          >
            {isClearing ? 'Limpando...' : 'Limpar'}
          </button>
          <button 
            onClick={handleApplyFilters}
            disabled={isApplying || isClearing}
            className={`flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-xl transition-all duration-200 font-normal ${
              isApplying 
                ? 'bg-blue-500 cursor-not-allowed' 
                : 'hover:bg-blue-700 active:scale-[0.98] shadow-sm hover:shadow-md'
            }`}
          >
            {isApplying ? 'Aplicando...' : 'Aplicar'}
          </button>
        </div>
      </div>
    </div>
  );
};