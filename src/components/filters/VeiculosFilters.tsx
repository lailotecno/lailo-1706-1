import * as React from "react"
import { ComboBoxSearch } from "./ComboBoxSearch"
import { RangeSlider } from "./RangeSlider"
import { FormatToggle } from "./FormatToggle"
import { MultiToggleGrid } from "./MultiToggleGrid"
import { getEstadosOptions, getMunicipiosOptions, fetchMunicipiosByEstado, Municipio } from "../../utils/ibgeApi"

interface VeiculosFiltersState {
  estado: string
  cidade: string
  marca: string
  modelo: string
  cor: string
  ano: [number, number]
  preco: [number, number]
  formato: string
  origem: string[]
  etapa: string[]
}

interface VeiculosFiltersProps {
  filters: VeiculosFiltersState
  onFiltersChange: (filters: Partial<VeiculosFiltersState>) => void
  currentVehicleType?: string // Novo prop para receber o tipo atual
}

export const VeiculosFilters: React.FC<VeiculosFiltersProps> = ({
  filters,
  onFiltersChange,
  currentVehicleType = 'todos'
}) => {
  const [municipios, setMunicipios] = React.useState<Municipio[]>([])
  const [loadingMunicipios, setLoadingMunicipios] = React.useState(false)

  // Carregar municípios quando o estado mudar
  React.useEffect(() => {
    // CORREÇÃO: Só carregar municípios se estado não for vazio e não for "all"
    if (filters.estado && filters.estado !== "all") {
      console.log('🏛️ VeiculosFilters - Carregando municípios para estado:', filters.estado);
      setLoadingMunicipios(true)
      fetchMunicipiosByEstado(filters.estado)
        .then(municipiosData => {
          console.log('🏙️ VeiculosFilters - Municípios carregados:', municipiosData.length);
          setMunicipios(municipiosData);
        })
        .catch(error => {
          console.error('❌ Erro ao carregar municípios:', error)
          setMunicipios([])
        })
        .finally(() => setLoadingMunicipios(false))
    } else {
      console.log('🏛️ VeiculosFilters - Limpando municípios (estado vazio ou "all")');
      setMunicipios([])
    }
  }, [filters.estado])

  const estados = getEstadosOptions()
  const cidades = getMunicipiosOptions(municipios)

  console.log('🚗 VeiculosFilters - Estado atual:', {
    filters,
    currentVehicleType,
    estadosDisponiveis: estados.length,
    cidadesDisponiveis: cidades.length,
    loadingMunicipios
  });

  const marcas = [
    { value: "all", label: "Todas as marcas" }, // Mudou de "" para "all"
    { value: "toyota", label: "Toyota" },
    { value: "honda", label: "Honda" },
    { value: "volkswagen", label: "Volkswagen" },
    { value: "ford", label: "Ford" },
    { value: "chevrolet", label: "Chevrolet" },
  ]

  const getModelos = (marca: string) => {
    const modelosPorMarca: Record<string, Array<{ value: string; label: string }>> = {
      toyota: [
        { value: "all", label: "Todos os modelos" }, // Mudou de "" para "all"
        { value: "corolla", label: "Corolla" },
        { value: "camry", label: "Camry" },
        { value: "hilux", label: "Hilux" },
      ],
      honda: [
        { value: "all", label: "Todos os modelos" }, // Mudou de "" para "all"
        { value: "civic", label: "Civic" },
        { value: "accord", label: "Accord" },
        { value: "cr-v", label: "CR-V" },
      ],
    }
    
    return modelosPorMarca[marca] || [{ value: "all", label: "Todos os modelos" }] // Mudou de "" para "all"
  }

  const cores = [
    { value: "all", label: "Todas as cores" }, // Mudou de "" para "all"
    { value: "amarelo", label: "Amarelo" },
    { value: "azul", label: "Azul" },
    { value: "bege", label: "Bege" },
    { value: "branco", label: "Branco" },
    { value: "bronze", label: "Bronze" },
    { value: "cinza", label: "Cinza" },
    { value: "dourado", label: "Dourado" },
    { value: "grafite", label: "Grafite" },
    { value: "laranja", label: "Laranja" },
    { value: "marrom", label: "Marrom" },
    { value: "prata", label: "Prata" },
    { value: "preto", label: "Preto" },
    { value: "rosa", label: "Rosa" },
    { value: "roxo", label: "Roxo" },
    { value: "verde", label: "Verde" },
    { value: "vermelho", label: "Vermelho" },
    { value: "vinho", label: "Vinho" }
  ]

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
  
  // Verificar se deve mostrar os filtros de marca e modelo
  // CORREÇÃO: Agora também oculta para 'nao-informado'
  const shouldShowBrandModelFilters = currentVehicleType !== 'todos' && currentVehicleType !== 'nao-informado'

  const handleEstadoChange = (value: string) => {
    console.log('🏛️ VeiculosFilters - Estado mudou:', {
      newValue: value,
      currentFilters: filters,
      willResetCidade: true
    })
    
    onFiltersChange({ 
      ...filters,
      estado: value,
      cidade: "" // Reset cidade when estado changes
    })
  }

  const handleCidadeChange = (value: string) => {
    console.log('🏙️ VeiculosFilters - Cidade mudou:', {
      newValue: value,
      currentFilters: filters
    })
    
    onFiltersChange({ ...filters, cidade: value })
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

      {/* Marca e Modelo - Só exibir se não for 'todos' ou 'nao-informado' */}
      {shouldShowBrandModelFilters && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Marca e Modelo
          </label>
          <div className="grid grid-cols-1 gap-2">
            <ComboBoxSearch
              options={marcas}
              value={filters.marca}
              onValueChange={(value) => {
                onFiltersChange({ 
                  ...filters,
                  marca: value,
                  modelo: "" // Reset modelo when marca changes
                })
              }}
              placeholder="Marca"
              searchPlaceholder="Buscar marca..."
            />
            <ComboBoxSearch
              options={getModelos(filters.marca)}
              value={filters.modelo}
              onValueChange={(value) => onFiltersChange({ ...filters, modelo: value })}
              placeholder="Modelo"
              searchPlaceholder="Buscar modelo..."
              disabled={!filters.marca || filters.marca === "all"}
            />
          </div>
        </div>
      )}

      {/* Cor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Cor
        </label>
        <ComboBoxSearch
          options={cores}
          value={filters.cor}
          onValueChange={(value) => onFiltersChange({ ...filters, cor: value })}
          placeholder="Cor"
          searchPlaceholder="Buscar cor..."
        />
      </div>

      {/* Ano */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Ano
        </label>
        <RangeSlider
          min={1990}
          max={2024}
          step={1}
          value={filters.ano}
          onValueChange={(value) => onFiltersChange({ ...filters, ano: value })}
        />
      </div>

      {/* Faixa de preço */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Faixa de preço
        </label>
        <RangeSlider
          min={0}
          max={500000}
          step={5000}
          value={filters.preco}
          onValueChange={(value) => onFiltersChange({ ...filters, preco: value })}
          prefix="R$ "
        />
      </div>

      {/* Formato - New dedicated component */}
      <FormatToggle
        value={filters.formato}
        onValueChange={(value) => onFiltersChange({ ...filters, formato: value })}
      />

      {/* Origem */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Origem
        </label>
        <MultiToggleGrid
          options={origemOptions}
          value={filters.origem}
          onValueChange={(value) => onFiltersChange({ ...filters, origem: value })}
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
          onValueChange={(value) => onFiltersChange({ ...filters, etapa: value })}
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