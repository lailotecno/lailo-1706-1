import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { ViewMode, SortOption } from '../types/auction';

// ===== TYPES =====
interface ImoveisFilters {
  estado: string;
  cidade: string;
  area: [number, number];
  valor: [number, number];
  formato: string;
  origem: string[];
  etapa: string[];
}

interface VeiculosFilters {
  estado: string;
  cidade: string;
  marca: string;
  modelo: string;
  cor: string;
  ano: [number, number];
  preco: [number, number];
  formato: string;
  origem: string[];
  etapa: string[];
}

interface UIState {
  sidebarOpen: boolean;
  filtersOpen: boolean;
}

interface AppState {
  viewMode: ViewMode;
  // CORREÇÃO: Separar filtros staged (editando) dos applied (aplicados)
  stagedFilters: {
    imoveis: ImoveisFilters;
    veiculos: VeiculosFilters;
  };
  appliedFilters: {
    imoveis: ImoveisFilters;
    veiculos: VeiculosFilters;
  };
  sortOption: SortOption;
  searchQuery: string;
  ui: UIState;
}

// ===== DEFAULT VALUES =====
const defaultImoveisFilters: ImoveisFilters = {
  estado: "",
  cidade: "",
  area: [0, 1000],
  valor: [0, 5000000],
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
  ano: [1990, 2024],
  preco: [0, 500000],
  formato: "",
  origem: [],
  etapa: []
};

const defaultUIState: UIState = {
  sidebarOpen: false,
  filtersOpen: false
};

const defaultState: AppState = {
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
  | { type: 'LOAD_FROM_STORAGE'; payload: Partial<AppState> }
  | { type: 'RESET_ALL' };

// ===== REDUCER =====
function appReducer(state: AppState, action: AppAction): AppState {
  console.log('🔄 AppContext Action:', action.type, action.payload);
  
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
  state: AppState;
  actions: {
    setViewMode: (mode: ViewMode) => void;
    setStagedImoveisFilters: (filters: Partial<ImoveisFilters>) => void;
    setStagedVeiculosFilters: (filters: Partial<VeiculosFilters>) => void;
    applyImoveisFilters: () => void;
    applyVeiculosFilters: () => void;
    clearImoveisFilters: () => void;
    clearVeiculosFilters: () => void;
    setSortOption: (sort: SortOption) => void;
    setSearchQuery: (query: string) => void;
    setUIState: (ui: Partial<UIState>) => void;
    resetAll: () => void;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// ===== STORAGE UTILITIES =====
const STORAGE_KEY = 'buscador-preferences';

const saveToStorage = (state: AppState) => {
  try {
    // Salvar apenas dados relevantes (não UI state temporário)
    const dataToSave = {
      viewMode: state.viewMode,
      appliedFilters: state.appliedFilters, // Salvar apenas os filtros aplicados
      sortOption: state.sortOption,
      // Não salvar searchQuery pois é temporário
      // Não salvar stagedFilters pois são temporários
      // Não salvar ui state pois é temporário
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    console.log('💾 Estado salvo no localStorage:', dataToSave);
  } catch (error) {
    console.warn('⚠️ Erro ao salvar no localStorage:', error);
  }
};

const loadFromStorage = (): Partial<AppState> => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      console.log('📂 Nenhum estado salvo encontrado');
      return {};
    }
    
    const parsed = JSON.parse(saved);
    console.log('📂 Estado carregado do localStorage:', parsed);
    
    // Validar e sanitizar dados carregados
    const validatedState: Partial<AppState> = {};
    
    // Validar viewMode
    if (parsed.viewMode && ['horizontal', 'vertical'].includes(parsed.viewMode)) {
      validatedState.viewMode = parsed.viewMode;
    }
    
    // Validar sortOption
    if (parsed.sortOption && ['newest', 'lowest-bid', 'highest-bid', 'highest-discount', 'nearest'].includes(parsed.sortOption)) {
      validatedState.sortOption = parsed.sortOption;
    }
    
    // Validar appliedFilters
    if (parsed.appliedFilters && typeof parsed.appliedFilters === 'object') {
      validatedState.appliedFilters = {};
      validatedState.stagedFilters = {}; // Inicializar staged com os mesmos valores
      
      // Validar filtros de imóveis
      if (parsed.appliedFilters.imoveis && typeof parsed.appliedFilters.imoveis === 'object') {
        const imoveisFilters = {
          ...defaultImoveisFilters,
          ...parsed.appliedFilters.imoveis
        };
        validatedState.appliedFilters.imoveis = imoveisFilters;
        validatedState.stagedFilters.imoveis = imoveisFilters; // Staged começa igual ao applied
      }
      
      // Validar filtros de veículos
      if (parsed.appliedFilters.veiculos && typeof parsed.appliedFilters.veiculos === 'object') {
        const veiculosFilters = {
          ...defaultVeiculosFilters,
          ...parsed.appliedFilters.veiculos
        };
        validatedState.appliedFilters.veiculos = veiculosFilters;
        validatedState.stagedFilters.veiculos = veiculosFilters; // Staged começa igual ao applied
      }
    }
    
    return validatedState;
  } catch (error) {
    console.warn('⚠️ Erro ao carregar do localStorage:', error);
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
    }, 500); // Debounce de 500ms

    return () => clearTimeout(timeoutId);
  }, [state]);

  // Actions
  const actions = {
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
export type { AppState, ImoveisFilters, VeiculosFilters, UIState };