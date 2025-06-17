import React from 'react';
import { Search, Filter, RotateCcw, Sparkles, MapPin, Calendar, DollarSign } from 'lucide-react';
import { Category } from '../types/auction';

interface EmptyStateProps {
  category: Category;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onClearSearch?: () => void;
  searchQuery?: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  category,
  hasActiveFilters,
  onClearFilters,
  onClearSearch,
  searchQuery,
  className = ''
}) => {
  const isVehicles = category === 'veiculos';
  
  // Diferentes cenários de empty state
  const getEmptyStateContent = () => {
    if (searchQuery && searchQuery.trim()) {
      // Empty state para busca sem resultados
      return {
        icon: Search,
        title: 'Nenhum resultado encontrado',
        subtitle: `Não encontramos ${isVehicles ? 'veículos' : 'imóveis'} que correspondam à sua busca "${searchQuery}"`,
        suggestions: [
          'Verifique a ortografia das palavras',
          'Use termos mais gerais',
          'Tente palavras-chave diferentes'
        ],
        primaryAction: {
          label: 'Limpar busca',
          action: onClearSearch
        },
        secondaryAction: hasActiveFilters ? {
          label: 'Remover filtros',
          action: onClearFilters
        } : undefined
      };
    }
    
    if (hasActiveFilters) {
      // Empty state para filtros muito restritivos
      return {
        icon: Filter,
        title: 'Nenhum leilão encontrado',
        subtitle: `Os filtros aplicados são muito específicos. Tente ajustar alguns critérios para encontrar mais ${isVehicles ? 'veículos' : 'imóveis'}.`,
        suggestions: [
          'Amplie a faixa de preço',
          'Selecione mais regiões',
          'Remova alguns filtros específicos'
        ],
        primaryAction: {
          label: 'Limpar filtros',
          action: onClearFilters
        }
      };
    }
    
    // Empty state geral (sem filtros nem busca)
    return {
      icon: Sparkles,
      title: `Nenhum ${isVehicles ? 'veículo' : 'imóvel'} disponível`,
      subtitle: `No momento não há ${isVehicles ? 'veículos' : 'imóveis'} disponíveis nesta categoria. Novos leilões são adicionados constantemente.`,
      suggestions: [
        'Tente outras categorias',
        'Volte mais tarde para ver novos leilões',
        'Configure alertas para ser notificado'
      ]
    };
  };

  const content = getEmptyStateContent();
  const IconComponent = content.icon;

  // Ícones para sugestões baseados no tipo
  const getSuggestionIcon = (index: number) => {
    if (searchQuery) {
      return [Search, Search, Search][index] || Search;
    }
    if (hasActiveFilters) {
      return [DollarSign, MapPin, Filter][index] || Filter;
    }
    return [Calendar, RotateCcw, Sparkles][index] || Sparkles;
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-[60vh] px-4 py-12 text-center ${className}`}>
      {/* Ilustração principal */}
      <div className="relative mb-8">
        {/* Background decorativo */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full blur-3xl opacity-60 scale-150"></div>
        
        {/* Container do ícone */}
        <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 shadow-xl">
          <IconComponent className="w-12 h-12 text-white" />
          
          {/* Elementos decorativos flutuantes */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-green-400 rounded-full animate-bounce delay-300"></div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-md mx-auto space-y-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
          {content.title}
        </h2>
        
        <p className="text-gray-600 text-lg leading-relaxed">
          {content.subtitle}
        </p>
      </div>

      {/* Sugestões */}
      <div className="max-w-sm mx-auto space-y-3 mb-8">
        {content.suggestions.map((suggestion, index) => {
          const SuggestionIcon = getSuggestionIcon(index);
          return (
            <div 
              key={index}
              className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100"
            >
              <SuggestionIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span>{suggestion}</span>
            </div>
          );
        })}
      </div>

      {/* Ações */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mx-auto">
        {content.primaryAction && (
          <button
            onClick={content.primaryAction.action}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            {content.primaryAction.label}
          </button>
        )}
        
        {content.secondaryAction && (
          <button
            onClick={content.secondaryAction.action}
            className="flex-1 bg-white text-gray-700 font-semibold py-3 px-6 rounded-xl border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Filter className="w-4 h-4" />
            {content.secondaryAction.label}
          </button>
        )}
      </div>
    </div>
  );
};