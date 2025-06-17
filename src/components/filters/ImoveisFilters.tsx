import * as React from "react"
import { RangeSlider } from "./RangeSlider"
import { BaseFilters } from "./BaseFilters"
import { useAppContext } from "../../contexts/AppContext"
import { FILTER_CONFIG } from "../../config/constants"

// 🚀 OTIMIZAÇÃO: React.memo para evitar re-renderizações desnecessárias
export const ImoveisFilters: React.FC = React.memo(() => {
  const { state, actions } = useAppContext();
  const filters = state.stagedFilters.imoveis;

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
          min={FILTER_CONFIG.DEFAULT_RANGES.PROPERTY_AREA.MIN}
          max={FILTER_CONFIG.DEFAULT_RANGES.PROPERTY_AREA.MAX}
          step={FILTER_CONFIG.DEFAULT_RANGES.PROPERTY_AREA.STEP}
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
          min={FILTER_CONFIG.DEFAULT_RANGES.PROPERTY_VALUE.MIN}
          max={FILTER_CONFIG.DEFAULT_RANGES.PROPERTY_VALUE.MAX}
          step={FILTER_CONFIG.DEFAULT_RANGES.PROPERTY_VALUE.STEP}
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