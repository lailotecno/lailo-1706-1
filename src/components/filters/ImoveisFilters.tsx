import * as React from "react"
import { ComboBoxSearch } from "./ComboBoxSearch"
import { RangeSlider } from "./RangeSlider"
import { FormatToggle } from "./FormatToggle"
import { MultiToggleGrid } from "./MultiToggleGrid"
import { getEstadosOptions, getMunicipiosOptions, fetchMunicipiosByEstado, Municipio } from "../../utils/ibgeApi"
import { useAppContext } from "../../contexts/AppContext"

export const ImoveisFilters: React.FC = () => {
  const { state, actions } = useAppContext();
  const filters = state.filters.imoveis;
  
  const [municipios, setMunicipios] = React.useState<Municipio[]>([])
  const [loadingMunicipios, setLoadingMunicipios] = React.useState(false)

  // Carregar municípios quando o estado mudar
  React.useEffect(() => {
    // CORREÇÃO: Só carregar municípios se estado não for vazio e não for "all"
    if (filters.estado && filters.estado !== "all") {
      console.log('🏛️ ImoveisFilters - Carregando municípios para estado:', filters.estado);
      setLoadingMunicipios(true)
      fetchMunicipiosByEstado(filters.estado)
        .then(municipiosData => {
          console.log('🏙️ ImoveisFilters - Municípios carregados:', municipiosData.length);
          setMunicipios(municipiosData);
        })
        .catch(error => {
          console.error('❌ Erro ao carregar municípios:', error)
          setMunicipios([])
        })
        .finally(() => setLoadingMunicipios(false))
    } else {
      console.log('🏛️ ImoveisFilters - Limpando municípios (estado vazio ou "all")');
      setMunicipios([])
    }
  }, [filters.estado])

  const estados = getEstadosOptions()
  const cidades = getMunicipiosOptions(municipios)

  console.log('🏠 ImoveisFilters - Estado atual:', {
    filters,
    estadosDisponiveis: estados.length,
    cidadesDisponiveis: cidades.length,
    loadingMunicipios
  });

  const origemOptions = [
    { value: "judicial", label: "Judicial" },
    { value: "extrajudicial", label: "Extrajudicial" },
    { value: "particular", label: "Particular" },
    { value: "publico", label: "Público" }
  ]

  const etapaOptions = [
    { value: "praca-unica", label: "Praça única" },
    { value: "primeira", label: "1ª Praça" },
    { value: "segunda", label: "2ª Praça" },
    { value: "terceira", label: "3ª Praça" }
  ]

  const isVendaDireta = filters.formato === "venda-direta"

  const handleEstadoChange = (value: string) => {
    console.log('🏛️ ImoveisFilters - Estado mudou:', {
      newValue: value,
      currentFilters: filters,
      willResetCidade: true
    })
    
    actions.setImoveisFilters({ 
      estado: value,
      cidade: "" // Reset cidade when estado changes
    })
  }

  const handleCidadeChange = (value: string) => {
    console.log('🏙️ ImoveisFilters - Cidade mudou:', {
      newValue: value,
      currentFilters: filters
    })
    
    actions.setImoveisFilters({ cidade: value })
  }

  return (
    <div className="space-y-6">
      {/* Localização */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Localização
        </label>
        <div className="grid grid-cols-1 gap-2">
          <ComboBoxSearch
            options={estados}
            value={filters.estado}
            onValueChange={handleEstadoChange}
            placeholder="Estado"
            searchPlaceholder="Buscar estado..."
          />
          <ComboBoxSearch
            options={cidades}
            value={filters.cidade}
            onValueChange={handleCidadeChange}
            placeholder="Cidade"
            searchPlaceholder="Buscar cidade..."
            disabled={!filters.estado || filters.estado === "all" || loadingMunicipios}
          />
        </div>
      </div>

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
          onValueChange={(value) => actions.setImoveisFilters({ area: value })}
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
          onValueChange={(value) => actions.setImoveisFilters({ valor: value })}
          prefix="R$ "
        />
      </div>

      {/* Formato - New dedicated component */}
      <FormatToggle
        value={filters.formato}
        onValueChange={(value) => actions.setImoveisFilters({ formato: value })}
      />

      {/* Origem */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Origem
        </label>
        <MultiToggleGrid
          options={origemOptions}
          value={filters.origem}
          onValueChange={(value) => actions.setImoveisFilters({ origem: value })}
        />
      </div>

      {/* Etapa */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Etapa
        </label>
        <MultiToggleGrid
          options={etapaOptions}
          value={filters.etapa}
          onValueChange={(value) => actions.setImoveisFilters({ etapa: value })}
          disabled={isVendaDireta}
        />
        {/* Espaço reservado para mensagem condicional para evitar layout shift */}
        <div className="min-h-[16px] mt-2">
          {isVendaDireta && (
            <p className="text-xs text-gray-500">
              Etapas não se aplicam à venda direta
            </p>
          )}
        </div>
      </div>
    </div>
  )
}