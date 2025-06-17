export interface Auction {
  _id: string;
  type: 'property' | 'vehicle';
  image: string;
  
  // Property fields
  property_type?: string;
  useful_area_m2?: number;
  property_address?: string;
  
  // Vehicle fields
  vehicle_type?: string;
  brand?: string;
  model?: string;
  color?: string;
  year?: number;
  
  // Common fields
  city: string;
  state: string;
  initial_bid_value: number;
  appraised_value?: number;
  origin: string;
  stage: string;
  end_date: string;
  href: string;
  website: string;
  website_image: string;
  updated: string;
  data_scraped: string;
  docs: string[];
  format: string;
}

export type ViewMode = 'horizontal' | 'vertical';
export type SortOption = 'newest' | 'lowest-bid' | 'highest-bid' | 'highest-discount' | 'nearest';
export type Category = 'veiculos' | 'imoveis';

export interface Filters {
  format?: string;
  origin?: string[];
  stage?: string[];
  state?: string;
  city?: string;
  useful_area_m2?: [number, number];
  initial_bid_value?: [number, number];
  brand?: string;
  model?: string;
  color?: string;
  year?: [number, number];
}

// ===== STRICT TYPING ADDITIONS =====

// Tipos para filtros específicos
export interface ImoveisFilters {
  estado: string;
  cidade: string;
  area: [number, number];
  valor: [number, number];
  formato: string;
  origem: string[];
  etapa: string[];
}

export interface VeiculosFilters {
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

// Tipos para estado da UI
export interface UIState {
  sidebarOpen: boolean;
  filtersOpen: boolean;
}

// Tipos para resultados de busca
export interface AuctionSearchResult {
  auctions: Auction[];
  totalSites: number;
  newAuctions: number;
}

// Tipos para paginação
export interface PaginationData {
  currentPage: number;
  totalPages: number;
  currentAuctions: Auction[];
  totalItems: number;
}

// Tipos para componentes de filtro
export interface FilterOption {
  value: string;
  label: string;
}

export interface RangeValue {
  min: number;
  max: number;
}

// Tipos para handlers de eventos
export type FilterChangeHandler<T = string> = (value: T) => void;
export type MultiFilterChangeHandler = (values: string[]) => void;
export type RangeChangeHandler = (range: [number, number]) => void;
export type PageChangeHandler = (page: number) => void;

// Tipos para props de componentes
export interface BaseComponentProps {
  className?: string;
  disabled?: boolean;
}

export interface FilterComponentProps extends BaseComponentProps {
  value: string | string[] | [number, number];
  onValueChange: FilterChangeHandler | MultiFilterChangeHandler | RangeChangeHandler;
}

// Tipos para validação
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Tipos para configuração
export interface ConfigurableRange {
  min: number;
  max: number;
  step?: number;
}

// Tipos para mapeamentos
export type FormatMapping = Record<string, string[]>;
export type TypeMapping = Record<string, string[]>;
export type LabelMapping = Record<string, string>;

// Tipos para storage
export interface StorageData {
  viewMode?: ViewMode;
  appliedFilters?: {
    imoveis: ImoveisFilters;
    veiculos: VeiculosFilters;
  };
  sortOption?: SortOption;
}

// Tipos para contexto
export interface AppContextState {
  viewMode: ViewMode;
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

export interface AppContextActions {
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
}

// Tipos para hooks
export interface UseAuctionDataParams {
  category: Category;
  currentType: string;
  appliedFilters: AppContextState['appliedFilters'];
  sortOption: SortOption;
  searchQuery: string;
}

export interface UseActiveFiltersParams {
  category: Category;
  appliedFilters: AppContextState['appliedFilters'];
}

export interface UsePaginationParams {
  auctions: Auction[];
  itemsPerPage: number;
  dependencies: unknown[];
}

// Tipos para utilitários
export interface DateFormatOptions {
  includeTime?: boolean;
  includeSeconds?: boolean;
  relative?: boolean;
  format?: 'short' | 'medium' | 'long' | 'full';
}

export type DateInput = string | Date | null | undefined;

// Tipos para APIs externas
export interface IBGEEstado {
  id: number;
  sigla: string;
  nome: string;
}

export interface IBGEMunicipio {
  id: number;
  nome: string;
}

// Tipos para erros
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
}

// Type guards
export function isValidAuction(auction: unknown): auction is Auction {
  return (
    typeof auction === 'object' &&
    auction !== null &&
    typeof (auction as Auction)._id === 'string' &&
    typeof (auction as Auction).type === 'string' &&
    ['property', 'vehicle'].includes((auction as Auction).type) &&
    typeof (auction as Auction).image === 'string'
  );
}

export function isValidCategory(category: unknown): category is Category {
  return typeof category === 'string' && ['veiculos', 'imoveis'].includes(category);
}

export function isValidViewMode(mode: unknown): mode is ViewMode {
  return typeof mode === 'string' && ['horizontal', 'vertical'].includes(mode);
}

export function isValidSortOption(sort: unknown): sort is SortOption {
  return typeof sort === 'string' && 
    ['newest', 'lowest-bid', 'highest-bid', 'highest-discount', 'nearest'].includes(sort);
}

// Utility types
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type NonNullable<T> = T extends null | undefined ? never : T;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};