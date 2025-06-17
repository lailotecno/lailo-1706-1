import * as React from "react"
import { ComboBoxSearch } from "./ComboBoxSearch"
import { RangeSlider } from "./RangeSlider"
import { BaseFilters } from "./BaseFilters"
import { useAppContext } from "../../contexts/AppContext"
import { FILTER_CONFIG, LABEL_CONFIG } from "../../config/constants"

interface VeiculosFiltersProps {
  currentVehicleType?: string;
}

// 🚀 OTIMIZAÇÃO: React.memo para evitar re-renderizações desnecessárias
export const VeiculosFilters: React.FC<VeiculosFiltersProps> = React.memo(({
  currentVehicleType = 'todos'
}) => {
  const { state, actions } = useAppContext();
  const filters = state.stagedFilters.veiculos;

  // 🚀 OTIMIZAÇÃO: Memoizar opções que não mudam
  const marcas = React.useMemo(() => [
    { value: "all", label: "Todas as marcas" },
    { value: "toyota", label: "Toyota" },
    { value: "honda", label: "Honda" },
    { value: "volkswagen", label: "Volkswagen" },
    { value: "ford", label: "Ford" },
    { value: "chevrolet", label: "Chevrolet" },
  ], []);

  const getModelos = React.useCallback((marca: string) => {
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
  }, []);

  const cores = React.useMemo(() => [
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
  ], []);
  
  // 🚀 OTIMIZAÇÃO: Memoizar estado derivado
  const shouldShowBrandModelFilters = React.useMemo(() => 
    currentVehicleType !== 'todos' && currentVehicleType !== 'nao-informado',
    [currentVehicleType]
  );

  // 🚀 OTIMIZAÇÃO: Memoizar handlers
  const handleEstadoChange = React.useCallback((value: string) => {
    actions.setStagedVeiculosFilters({ estado: value });
  }, [actions]);

  const handleCidadeChange = React.useCallback((value: string) => {
    actions.setStagedVeiculosFilters({ cidade: value });
  }, [actions]);

  const handleFormatoChange = React.useCallback((value: string) => {
    actions.setStagedVeiculosFilters({ formato: value });
  }, [actions]);

  const handleOrigemChange = React.useCallback((value: string[]) => {
    actions.setStagedVeiculosFilters({ origem: value });
  }, [actions]);

  const handleEtapaChange = React.useCallback((value: string[]) => {
    actions.setStagedVeiculosFilters({ etapa: value });
  }, [actions]);

  const handleMarcaChange = React.useCallback((value: string) => {
    actions.setStagedVeiculosFilters({ 
      marca: value,
      modelo: "" // Reset modelo when marca changes
    });
  }, [actions]);

  const handleModeloChange = React.useCallback((value: string) => {
    actions.setStagedVeiculosFilters({ modelo: value });
  }, [actions]);

  const handleCorChange = React.useCallback((value: string) => {
    actions.setStagedVeiculosFilters({ cor: value });
  }, [actions]);

  const handleAnoChange = React.useCallback((value: [number, number]) => {
    actions.setStagedVeiculosFilters({ ano: value });
  }, [actions]);

  const handlePrecoChange = React.useCallback((value: [number, number]) => {
    actions.setStagedVeiculosFilters({ preco: value });
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
              onValueChange={handleMarcaChange}
              placeholder={LABEL_CONFIG.PLACEHOLDERS.SELECT_BRAND}
              searchPlaceholder={LABEL_CONFIG.PLACEHOLDERS.SEARCH_BRAND}
            />
            <ComboBoxSearch
              options={getModelos(filters.marca)}
              value={filters.modelo}
              onValueChange={handleModeloChange}
              placeholder={LABEL_CONFIG.PLACEHOLDERS.SELECT_MODEL}
              searchPlaceholder={LABEL_CONFIG.PLACEHOLDERS.SEARCH_MODEL}
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
          onValueChange={handleCorChange}
          placeholder={LABEL_CONFIG.PLACEHOLDERS.SELECT_COLOR}
          searchPlaceholder={LABEL_CONFIG.PLACEHOLDERS.SEARCH_COLOR}
        />
      </div>

      {/* Ano */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Ano
        </label>
        <RangeSlider
          min={FILTER_CONFIG.DEFAULT_RANGES.VEHICLE_YEAR.MIN}
          max={FILTER_CONFIG.DEFAULT_RANGES.VEHICLE_YEAR.MAX}
          step={1}
          value={filters.ano}
          onValueChange={handleAnoChange}
        />
      </div>

      {/* Faixa de preço */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Faixa de preço
        </label>
        <RangeSlider
          min={FILTER_CONFIG.DEFAULT_RANGES.VEHICLE_PRICE.MIN}
          max={FILTER_CONFIG.DEFAULT_RANGES.VEHICLE_PRICE.MAX}
          step={FILTER_CONFIG.DEFAULT_RANGES.VEHICLE_PRICE.STEP}
          value={filters.preco}
          onValueChange={handlePrecoChange}
          prefix="R$ "
        />
      </div>
    </BaseFilters>
  )
});

// 🚀 OTIMIZAÇÃO: Definir displayName para debugging
VeiculosFilters.displayName = 'VeiculosFilters';