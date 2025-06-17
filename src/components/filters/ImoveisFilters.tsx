import * as React from "react"
import { RangeSlider } from "./RangeSlider"
import { BaseFilters } from "./BaseFilters"
import { useAppContext } from "../../contexts/AppContext"

// 🚀 OTIMIZAÇÃO: React.memo para evitar re-renderizações desnecessárias
export const ImoveisFilters: React.FC = React.memo(() => {
  const { state, actions } = useAppContext();
  const filters = state.stagedFilters.imoveis;
  
  console.log('🏠 ImoveisFilters - Estado atual:', {
    filters
  });

  // 🚀 OTIMIZAÇÃO: Memoizar handlers
  const handleEstadoChange = React.useCallback((value: string) => {
    actions.setStagedImoveisFilters({ estado: value });
  }, [actions]);

  const handleCidadeChange = React.useCallback((value: string) => {
    actions.setStagedImoveisFilters({ cidade: value });
  }, [actions]);

  const handleFormatoChange = React.useCallback((value: string) => {
    actions.setStagedImoveisFilters({ formato: value });
  }, [actions]);

  const handleOrigemChange = React.useCallback((value: string[]) => {
    actions.setStagedImoveisFilters({ origem: value });
  }, [actions]);

  const handleEtapaChange = React.useCallback((value: string[]) => {
    actions.setStagedImoveisFilters({ etapa: value });
  }, [actions]);

  const handleAreaChange = React.useCallback((value: [number, number]) => {
    actions.setStagedImoveisFilters({ area: value });
  }, [actions]);

  const handleValorChange = React.useCallback((value: [number, number]) => {
    actions.setStagedImoveisFilters({ valor: value });
  }, [actions]);

  return (
    <BaseFilters
      estado={filters.estado}
      cidade={filters.cidade}
      formato={filters.formato}
      origem={filters.origem}
      etapa={filters.etapa}
      onEstadoChange={handleEstadoChange}
      onCidadeChange={handleCidadeChange}
      onFormatoChange={handleFormatoChange}
      onOrigemChange={handleOrigemChange}
      onEtapaChange={handleEtapaChange}
    >
      {/* Filtros específicos de imóveis */}
      
      {/* Área */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Área
        </label>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={filters.area}
          onValueChange={handleAreaChange}
          suffix="m²"
        />
      </div>

      {/* Valor do lance */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Valor do lance
        </label>
        <RangeSlider
          min={0}
          max={5000000}
          step={10000}
          value={filters.valor}
          onValueChange={handleValorChange}
          prefix="R$ "
        />
      </div>
    </BaseFilters>
  )
});

// 🚀 OTIMIZAÇÃO: Definir displayName para debugging
ImoveisFilters.displayName = 'ImoveisFilters';