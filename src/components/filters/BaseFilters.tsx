import * as React from "react"
import { ComboBoxSearch } from "./ComboBoxSearch"
import { RangeSlider } from "./RangeSlider"
import { FormatToggle } from "./FormatToggle"
import { MultiToggleGrid } from "./MultiToggleGrid"
import { getEstadosOptions, getMunicipiosOptions, fetchMunicipiosByEstado, Municipio } from "../../utils/ibgeApi"

interface BaseFiltersProps {
  // Dados dos filtros
  estado: string;
  cidade: string;
  formato: string;
  origem: string[];
  etapa: string[];
  
  // Callbacks para mudanças
  onEstadoChange: (value: string) => void;
  onCidadeChange: (value: string) => void;
  onFormatoChange: (value: string) => void;
  onOrigemChange: (value: string[]) => void;
  onEtapaChange: (value: string[]) => void;
  
  // Props específicas por categoria
  children?: React.ReactNode; // Para filtros específicos (área, marca, etc.)
}

export const BaseFilters: React.FC<BaseFiltersProps> = ({
  estado,
  cidade,
  formato,
  origem,
  etapa,
  onEstadoChange,
  onCidadeChange,
  onFormatoChange,
  onOrigemChange,
  onEtapaChange,
  children
}) => {
  const [municipios, setMunicipios] = React.useState<Municipio[]>([])
  const [loadingMunicipios, setLoadingMunicipios] = React.useState(false)

  // Carregar municípios quando o estado mudar
  React.useEffect(() => {
    if (estado && estado !== "all") {
      console.log('🏛️ BaseFilters - Carregando municípios para estado:', estado);
      setLoadingMunicipios(true)
      fetchMunicipiosByEstado(estado)
        .then(municipiosData => {
          console.log('🏙️ BaseFilters - Municípios carregados:', municipiosData.length);
          setMunicipios(municipiosData);
        })
        .catch(error => {
          console.error('❌ Erro ao carregar municípios:', error)
          setMunicipios([])
        })
        .finally(() => setLoadingMunicipios(false))
    } else {
      console.log('🏛️ BaseFilters - Limpando municípios (estado vazio ou "all")');
      setMunicipios([])
    }
  }, [estado])

  const estados = getEstadosOptions()
  const cidades = getMunicipiosOptions(municipios)

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

  const isVendaDireta = formato === "venda-direta"

  const handleEstadoChange = (value: string) => {
    console.log('🏛️ BaseFilters - Estado mudou:', {
      newValue: value,
      willResetCidade: true
    })
    
    onEstadoChange(value)
    onCidadeChange("") // Reset cidade when estado changes
  }

  const handleCidadeChange = (value: string) => {
    console.log('🏙️ BaseFilters - Cidade mudou:', {
      newValue: value
    })
    
    onCidadeChange(value)
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
            value={estado}
            onValueChange={handleEstadoChange}
            placeholder="Estado"
            searchPlaceholder="Buscar estado..."
          />
          <ComboBoxSearch
            options={cidades}
            value={cidade}
            onValueChange={handleCidadeChange}
            placeholder="Cidade"
            searchPlaceholder="Buscar cidade..."
            disabled={!estado || estado === "all" || loadingMunicipios}
          />
        </div>
      </div>

      {/* Filtros específicos da categoria (área, marca, etc.) */}
      {children}

      {/* Formato */}
      <FormatToggle
        value={formato}
        onValueChange={onFormatoChange}
      />

      {/* Origem */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Origem
        </label>
        <MultiToggleGrid
          options={origemOptions}
          value={origem}
          onValueChange={onOrigemChange}
        />
      </div>

      {/* Etapa */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Etapa
        </label>
        <MultiToggleGrid
          options={etapaOptions}
          value={etapa}
          onValueChange={onEtapaChange}
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