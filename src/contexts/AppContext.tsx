import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { 
  ViewMode, 
  SortOption, 
  ImoveisFilters, 
  VeiculosFilters, 
  UIState,
  AppContextState,
  AppContextActions,
  StorageData,
  isValidViewMode,
  isValidSortOption
} from '../types/auction';
import { FILTER_CONFIG, STORAGE_CONFIG } from '../config/constants';

// ===== DEFAULT VALUES =====
const defaultImoveisFilters: ImoveisFilters = {
  estado: "",
  cidade: "",
  area: [FILTER_CONFIG.DEFAULT_RANGES.PROPERTY_AREA.MIN, FILTER_CONFIG.DEFAULT_RANGES.PROPERTY_AREA.MAX],
  valor: [FILTER_CONFIG.DEFAULT_RANGES.PROPERTY_VALUE.MIN, FILTER_CONFIG.DEFAULT_RANGES.PROPERTY_VALUE.MAX],
  formato: "",
  origem: [],
  etapa: []
};

const defaultVeiculosFilters: VeiculosFilters = {
  estado: "",
  cidade: "",
  marca: "",
  modelo: "",
  cor: "",
  ano: [FILTER_CONFIG.DEFAULT_RANGES.VEHICLE_YEAR.MIN, FILTER_CONFIG.DEFAULT_RANGES.VEHICLE_YEAR.MAX],
  preco: [FILTER_CONFIG.DEFAULT_RANGES.VEHICLE_PRICE.MIN, FILTER_CONFIG.DEFAULT_RANGES.VEHICLE_PRICE.MAX],
  formato: "",
  origem: [],
  etapa: []
};

const defaultUIState: UIState = {
  sidebarOpen: false,
  filtersOpen: false
};

const defaultState: AppContextState = {
  viewMode: 'horizontal',
  stagedFilters: {
    imoveis: defaultImoveisFilters,
    veiculos: defaultVeiculosFilters
  },
  appliedFilters: {
    imoveis: defaultImoveisFilters,
    veiculos: defaultVeiculosFilters
  },
  sortOption: 'newest',
  searchQuery: '',
  ui: defaultUIState
};

// ===== ACTIONS =====
type AppAction =
  | { type: 'SET_VIEW_MODE'; payload: ViewMode }
  | { type: 'SET_STAGED_IMOVEIS_FILTERS'; payload: Partial<ImoveisFilters> }
  | { type: 'SET_STAGED_VEICULOS_FILTERS'; payload: Partial<VeiculosFilters> }
  | { type: 'APPLY_IMOVEIS_FILTERS' }
  | { type: 'APPLY_VEICULOS_FILTERS' }
  | { type: 'CLEAR_IMOVEIS_FILTERS' }
  | { type: 'CLEAR_VEICULOS_FILTERS' }
  | { type: 'SET_SORT_OPTION'; payload: SortOption }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_UI_STATE'; payload: Partial<UIState> }
  | { type: 'LOAD_FROM_STORAGE'; payload: Partial<AppContextState> }
  | { type: 'RESET_ALL' };

// ===== REDUCER =====
function appReducer(state: AppContextState, action: AppAction): AppContextState {
  switch (action.type) {
    case 'SET_VIEW_MODE':
      return {
        ...state,
        viewMode: action.payload
      };
      
    case 'SET_STAGED_IMOVEIS_FILTERS':
      return {
        ...state,
        stagedFilters: {
          ...state.stagedFilters,
          imoveis: {
            ...state.stagedFilters.imoveis,
            ...action.payload
          }
        }
      };
      
    case 'SET_STAGED_VEICULOS_FILTERS':
      return {
        ...state,
        stagedFilters: {
          ...state.stagedFilters,
          veiculos: {
            ...state.stagedFilters.veiculos,
            ...action.payload
          }
        }
      };
      
    case 'APPLY_IMOVEIS_FILTERS':
      return {
        ...state,
        appliedFilters: {
          ...state.appliedFilters,
          imoveis: { ...state.stagedFilters.imoveis }
        }
      };
      
    case 'APPLY_VEICULOS_FILTERS':
      return {
        ...state,
        appliedFilters: {
          ...state.appliedFilters,
          veiculos: { ...state.stagedFilters.veiculos }
        }
      };
      
    case 'CLEAR_IMOVEIS_FILTERS':
      return {
        ...state,
        stagedFilters: {
          ...state.stagedFilters,
          imoveis: defaultImoveisFilters
        },
        appliedFilters: {
          ...state.appliedFilters,
          imoveis: defaultImoveisFilters
        }
      };
      
    case 'CLEAR_VEICULOS_FILTERS':
      return {
        ...state,
        stagedFilters: {
          ...state.stagedFilters,
          veiculos: defaultVeiculosFilters
        },
        appliedFilters: {
          ...state.appliedFilters,
          veiculos: defaultVeiculosFilters
        }
      };
      
    case 'SET_SORT_OPTION':
      return {
        ...state,
        sortOption: action.payload
      };
      
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload
      };
      
    case 'SET_UI_STATE':
      return {
        ...state,
        ui: {
          ...state.ui,
          ...action.payload
        }
      };
      
    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        ...action.payload
      };
      
    case 'RESET_ALL':
      return defaultState;
      
    default:
      return state;
  }
}

// ===== CONTEXT =====
interface AppContextType {
  state: AppContextState;
  actions: AppContextActions;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// ===== STORAGE UTILITIES =====
const saveToStorage = (state: AppContextState): void => {
  try {
    // Salvar apenas dados relevantes (não UI state temporário)
    const dataToSave: StorageData = {
      viewMode: state.viewMode,
      appliedFilters: state.appliedFilters, // Salvar apenas os filtros aplicados
      sortOption: state.sortOption,
      // Não salvar searchQuery pois é temporário
      // Não salvar stagedFilters pois são temporários
      // Não salvar ui state pois é temporário
    };
    
    localStorage.setItem(STORAGE_CONFIG.KEYS.USER_PREFERENCES, JSON.stringify(dataToSave));
  } catch (error) {
    console.warn('Erro ao salvar no localStorage:', error);
  }
};

const loadFromStorage = (): Partial<AppContextState> => {
  try {
    const saved = localStorage.getItem(STORAGE_CONFIG.KEYS.USER_PREFERENCES);
    if (!saved) {
      return {};
    }
    
    const parsed: unknown = JSON.parse(saved);
    
    // Validar e sanitizar dados carregados
    const validatedState: Partial<AppContextState> = {};
    
    if (parsed && typeof parsed === 'object') {
      const data = parsed as Record<string, unknown>;
      
      // Validar viewMode
      if (isValidViewMode(data.viewMode)) {
        validatedState.viewMode = data.viewMode;
      }
      
      // Validar sortOption
      if (isValidSortOption(data.sortOption)) {
        validatedState.sortOption = data.sortOption;
      }
      
      // Validar appliedFilters
      if (data.appliedFilters && typeof data.appliedFilters === 'object') {
        const filters = data.appliedFilters as Record<string, unknown>;
        validatedState.appliedFilters = {};
        validatedState.stagedFilters = {}; // Inicializar staged com os mesmos valores
        
        // Validar filtros de imóveis
        if (filters.imoveis && typeof filters.imoveis === 'object') {
          const imoveisFilters: ImoveisFilters = {
            ...defaultImoveisFilters,
            ...(filters.imoveis as Partial<ImoveisFilters>)
          };
          validatedState.appliedFilters.imoveis = imoveisFilters;
          validatedState.stagedFilters.imoveis = imoveisFilters; // Staged começa igual ao applied
        }
        
        // Validar filtros de veículos
        if (filters.veiculos && typeof filters.veiculos === 'object') {
          const veiculosFilters: VeiculosFilters = {
            ...defaultVeiculosFilters,
            ...(filters.veiculos as Partial<VeiculosFilters>)
          };
          validatedState.appliedFilters.veiculos = veiculosFilters;
          validatedState.stagedFilters.veiculos = veiculosFilters; // Staged começa igual ao applied
        }
      }
    }
    
    return validatedState;
  } catch (error) {
    console.warn('Erro ao carregar do localStorage:', error);
    return {};
  }
};

// ===== PROVIDER =====
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, defaultState);

  // Carregar estado do localStorage na inicialização
  useEffect(() => {
    const savedState = loadFromStorage();
    if (Object.keys(savedState).length > 0) {
      dispatch({ type: 'LOAD_FROM_STORAGE', payload: savedState });
    }
  }, []);

  // Salvar estado no localStorage quando mudar (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveToStorage(state);
    }, FILTER_CONFIG.DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [state]);

  // Actions
  const actions: AppContextActions = {
    setViewMode: (mode: ViewMode) => {
      dispatch({ type: 'SET_VIEW_MODE', payload: mode });
    },
    
    setStagedImoveisFilters: (filters: Partial<ImoveisFilters>) => {
      dispatch({ type: 'SET_STAGED_IMOVEIS_FILTERS', payload: filters });
    },
    
    setStagedVeiculosFilters: (filters: Partial<VeiculosFilters>) => {
      dispatch({ type: 'SET_STAGED_VEICULOS_FILTERS', payload: filters });
    },
    
    applyImoveisFilters: () => {
      dispatch({ type: 'APPLY_IMOVEIS_FILTERS' });
    },
    
    applyVeiculosFilters: () => {
      dispatch({ type: 'APPLY_VEICULOS_FILTERS' });
    },
    
    clearImoveisFilters: () => {
      dispatch({ type: 'CLEAR_IMOVEIS_FILTERS' });
    },
    
    clearVeiculosFilters: () => {
      dispatch({ type: 'CLEAR_VEICULOS_FILTERS' });
    },
    
    setSortOption: (sort: SortOption) => {
      dispatch({ type: 'SET_SORT_OPTION', payload: sort });
    },
    
    setSearchQuery: (query: string) => {
      dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
    },
    
    setUIState: (ui: Partial<UIState>) => {
      dispatch({ type: 'SET_UI_STATE', payload: ui });
    },
    
    resetAll: () => {
      dispatch({ type: 'RESET_ALL' });
    }
  };

  const contextValue: AppContextType = {
    state,
    actions
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// ===== CUSTOM HOOK =====
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useAppContext deve ser usado dentro de um AppProvider');
  }
  
  return context;
};

// ===== EXPORT TYPES =====
export type { AppContextState as AppState, ImoveisFilters, VeiculosFilters, UIState };