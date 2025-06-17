import * as React from "react"
import { ComboBoxSearch } from "./ComboBoxSearch"
import { FormatToggle } from "./FormatToggle"
import { MultiToggleGrid } from "./MultiToggleGrid"
import { getEstadosOptions, getMunicipiosOptions, fetchMunicipiosByEstado } from "../../utils/ibgeApi"
import { IBGEMunicipio, FilterOption } from "../../types/auction"

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

// 🚀 OTIMIZAÇÃO: React.memo para evitar re-renderizações desnecessárias
export const BaseFilters: React.FC<BaseFiltersProps> = React.memo(({
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
  const [municipios, setMunicipios] = React.useState<IBGEMunicipio[]>([])
  const [loadingMunicipios, setLoadingMunicipios] = React.useState<boolean>(false)

  // Carregar municípios quando o estado mudar
  React.useEffect(() => {
    if (estado && estado !== "all") {
      setLoadingMunicipios(true)
      fetchMunicipiosByEstado(estado)
        .then((municipiosData: IBGEMunicipio[]) => {
          setMunicipios(municipiosData);
        })
        .catch((error: unknown) => {
          console.error('Erro ao carregar municípios:', error)
          setMunicipios([])
        })
        .finally(() => setLoadingMunicipios(false))
    } else {
      setMunicipios([])
    }
  }, [estado])

  // 🚀 OTIMIZAÇÃO: Memoizar opções que não mudam
  const estados = React.useMemo((): FilterOption[] => getEstadosOptions(), []);
  const cidades = React.useMemo((): FilterOption[] => getMunicipiosOptions(municipios), [municipios]);

  const origemOptions = React.useMemo((): FilterOption[] => [
    { value: "judicial", label: "Judicial" },
    { value: "extrajudicial", label: "Extrajudicial" },
    { value: "particular", label: "Particular" },
    { value: "publico", label: "Público" }
  ], []);

  const etapaOptions = React.useMemo((): FilterOption[] => [
    { value: "praca-unica", label: "Praça única" },
    { value: "primeira", label: "1ª Praça" },
    { value: "segunda", label: "2ª Praça" },
    { value: "terceira", label: "3ª Praça" }
  ], []);

  // 🚀 OTIMIZAÇÃO: Memoizar estado derivado
  const isVendaDireta = React.useMemo((): boolean => formato === "venda-direta", [formato]);

  // 🚀 OTIMIZAÇÃO: Memoizar handlers
  const handleEstadoChange = React.useCallback((value: string): void => {
    onEstadoChange(value)
    onCidadeChange("") // Reset cidade when estado changes
  }, [onEstadoChange, onCidadeChange]);

  const handleCidadeChange = React.useCallback((value: string): void => {
    onCidadeChange(value)
  }, [onCidadeChange]);

  return (
    <div className="space-y-6">
      {/* Localização - CORREÇÃO: Adicionada margem superior */}
      <div className="mt-4">
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
});

// 🚀 OTIMIZAÇÃO: Definir displayName para debugging
BaseFilters.displayName = 'BaseFilters';