import * as React from "react"
import { RangeSlider } from "./RangeSlider"
import { BaseFilters } from "./BaseFilters"
import { useAppContext } from "../../contexts/AppContext"

export const ImoveisFilters: React.FC = () => {
  const { state, actions } = useAppContext();
  const filters = state.stagedFilters.imoveis;
  
  console.log('🏠 ImoveisFilters - Estado atual:', {
    filters
  });

  return (
    <BaseFilters
      estado={filters.estado}
      cidade={filters.cidade}
      formato={filters.formato}
      origem={filters.origem}
      etapa={filters.etapa}
      onEstadoChange={(value) => actions.setStagedImoveisFilters({ estado: value })}
      onCidadeChange={(value) => actions.setStagedImoveisFilters({ cidade: value })}
      onFormatoChange={(value) => actions.setStagedImoveisFilters({ formato: value })}
      onOrigemChange={(value) => actions.setStagedImoveisFilters({ origem: value })}
      onEtapaChange={(value) => actions.setStagedImoveisFilters({ etapa: value })}
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
          onValueChange={(value) => actions.setStagedImoveisFilters({ area: value })}
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
          onValueChange={(value) => actions.setStagedImoveisFilters({ valor: value })}
          prefix="R$ "
        />
      </div>
    </BaseFilters>
  )
}