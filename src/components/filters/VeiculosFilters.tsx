import * as React from "react"
import { ComboBoxSearch } from "./ComboBoxSearch"
import { RangeSlider } from "./RangeSlider"
import { BaseFilters } from "./BaseFilters"
import { useAppContext } from "../../contexts/AppContext"

interface VeiculosFiltersProps {
  currentVehicleType?: string;
}

export const VeiculosFilters: React.FC<VeiculosFiltersProps> = ({
  currentVehicleType = 'todos'
}) => {
  const { state, actions } = useAppContext();
  const filters = state.stagedFilters.veiculos;
  
  console.log('🚗 VeiculosFilters - Estado atual:', {
    filters,
    currentVehicleType
  });

  const marcas = [
    { value: "all", label: "Todas as marcas" },
    { value: "toyota", label: "Toyota" },
    { value: "honda", label: "Honda" },
    { value: "volkswagen", label: "Volkswagen" },
    { value: "ford", label: "Ford" },
    { value: "chevrolet", label: "Chevrolet" },
  ]

  const getModelos = (marca: string) => {
    const modelosPorMarca: Record<string, Array<{ value: string; label: string }>> = {
      toyota: [
        { value: "all", label: "Todos os modelos" },
        { value: "corolla", label: "Corolla" },
        { value: "camry", label: "Camry" },
        { value: "hilux", label: "Hilux" },
      ],
      honda: [
        { value: "all", label: "Todos os modelos" },
        { value: "civic", label: "Civic" },
        { value: "accord", label: "Accord" },
        { value: "cr-v", label: "CR-V" },
      ],
    }
    
    return modelosPorMarca[marca] || [{ value: "all", label: "Todos os modelos" }]
  }

  const cores = [
    { value: "all", label: "Todas as cores" },
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
  
  // Verificar se deve mostrar os filtros de marca e modelo
  const shouldShowBrandModelFilters = currentVehicleType !== 'todos' && currentVehicleType !== 'nao-informado'

  return (
    <BaseFilters
      estado={filters.estado}
      cidade={filters.cidade}
      formato={filters.formato}
      origem={filters.origem}
      etapa={filters.etapa}
      onEstadoChange={(value) => actions.setStagedVeiculosFilters({ estado: value })}
      onCidadeChange={(value) => actions.setStagedVeiculosFilters({ cidade: value })}
      onFormatoChange={(value) => actions.setStagedVeiculosFilters({ formato: value })}
      onOrigemChange={(value) => actions.setStagedVeiculosFilters({ origem: value })}
      onEtapaChange={(value) => actions.setStagedVeiculosFilters({ etapa: value })}
    >
      {/* Filtros específicos de veículos */}
      
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
                actions.setStagedVeiculosFilters({ 
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
              onValueChange={(value) => actions.setStagedVeiculosFilters({ modelo: value })}
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
          onValueChange={(value) => actions.setStagedVeiculosFilters({ cor: value })}
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
          onValueChange={(value) => actions.setStagedVeiculosFilters({ ano: value })}
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
          onValueChange={(value) => actions.setStagedVeiculosFilters({ preco: value })}
          prefix="R$ "
        />
      </div>
    </BaseFilters>
  )
}