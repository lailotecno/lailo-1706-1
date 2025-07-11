import { 
  Auction, 
  Category, 
  SortOption, 
  Filters, 
  AuctionSearchResult,
  isValidAuction 
} from '../types/auction';
import { DateUtils } from '../utils/dateUtils';
import { MAPPING_CONFIG, DATE_CONFIG } from '../config/constants';

export const mockAuctions: Auction[] = [
  // IMÓVEIS - Apartamentos
  {
    _id: "1",
    type: "property",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
    property_type: "Apartamento",
    useful_area_m2: 85,
    property_address: "Av. Paulista, 1000",
    city: "São Paulo",
    state: "SP",
    initial_bid_value: 180000,
    appraised_value: 220000,
    origin: "Judicial",
    stage: "1ª Praça",
    end_date: "2025-07-25T16:00:00.000Z", // Data futura
    href: "https://example.com/leilao1",
    website: "Leiloeira ABC",
    website_image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2025-06-15T12:00:00.000Z",
    data_scraped: "2025-06-17T12:00:00.000Z", // Hoje para badge "Novo"
    docs: ["Matrícula", "Condomínio"],
    format: "Presencial"
  },
  {
    _id: "2",
    type: "property",
    image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800",
    property_type: "Casa",
    useful_area_m2: 250,
    property_address: "Rua das Flores, 123",
    city: "Rio de Janeiro",
    state: "RJ",
    initial_bid_value: 450000,
    appraised_value: 600000,
    origin: "Judicial",
    stage: "1ª Praça",
    end_date: "2025-07-28T14:00:00.000Z", // Data futura
    href: "https://example.com/leilao2",
    website: "Leiloeira DEF",
    website_image: "https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2025-06-15T15:20:00.000Z",
    data_scraped: "2025-06-16T15:20:00.000Z",
    docs: ["Matrícula", "IPTU"],
    format: "Online"
  },
  {
    _id: "3",
    type: "property",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
    property_type: "Terreno",
    useful_area_m2: 500,
    property_address: "Rua do Campo, 789",
    city: "Curitiba",
    state: "PR",
    initial_bid_value: 120000,
    appraised_value: 150000,
    origin: "Extrajudicial",
    stage: "1ª Praça",
    end_date: "2025-08-01T09:00:00.000Z", // Data futura
    href: "https://example.com/leilao3",
    website: "Leiloeira MNO",
    website_image: "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2025-06-15T07:20:00.000Z",
    data_scraped: "2025-06-15T07:20:00.000Z",
    docs: ["Matrícula", "Certidões"],
    format: "Presencial"
  },
  {
    _id: "4",
    type: "property",
    image: "https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg?auto=compress&cs=tinysrgb&w=800",
    property_type: "Comercial",
    useful_area_m2: 300,
    property_address: "Rua do Comércio, 456",
    city: "Belo Horizonte",
    state: "MG",
    initial_bid_value: 280000,
    appraised_value: 350000,
    origin: "Judicial",
    stage: "2ª Praça",
    end_date: "2025-08-05T16:00:00.000Z", // Data futura
    href: "https://example.com/leilao4",
    website: "Leiloeira JKL",
    website_image: "https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2025-06-14T14:10:00.000Z",
    data_scraped: "2025-06-14T14:10:00.000Z",
    docs: ["Matrícula", "Alvará"],
    format: "Online"
  },
  {
    _id: "5",
    type: "property",
    image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=800",
    property_type: "Galpão",
    useful_area_m2: 800,
    property_address: "Distrito Industrial, 100",
    city: "Porto Alegre",
    state: "RS",
    initial_bid_value: 450000,
    appraised_value: 580000,
    origin: "Judicial",
    stage: "3ª Praça",
    end_date: "2025-08-10T15:00:00.000Z", // Data futura
    href: "https://example.com/leilao5",
    website: "Leiloeira PQR",
    website_image: "https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2025-06-16T11:30:00.000Z",
    data_scraped: "2025-06-17T11:30:00.000Z", // Hoje para badge "Novo"
    docs: ["Matrícula", "Alvará", "Bombeiros"],
    format: "Híbrido"
  },

  // VEÍCULOS - Carros
  {
    _id: "6",
    type: "vehicle",
    image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800",
    vehicle_type: "Carro",
    brand: "Toyota",
    model: "Corolla",
    color: "Prata",
    year: 2020,
    city: "São Paulo",
    state: "SP",
    initial_bid_value: 45000,
    appraised_value: 60000,
    origin: "Extrajudicial",
    stage: "2ª Praça",
    end_date: "2025-07-28T14:00:00.000Z", // Data futura
    href: "https://example.com/leilao6",
    website: "Leiloeira AUTO",
    website_image: "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2025-06-14T10:30:00.000Z",
    data_scraped: "2025-06-14T10:30:00.000Z",
    docs: ["Documento do Veículo", "Laudo"],
    format: "Online"
  },
  {
    _id: "7",
    type: "vehicle",
    image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800",
    vehicle_type: "Carro",
    brand: "Honda",
    model: "Civic",
    color: "Azul",
    year: 2019,
    city: "Rio de Janeiro",
    state: "RJ",
    initial_bid_value: 38000,
    appraised_value: 50000,
    origin: "Judicial",
    stage: "1ª Praça",
    end_date: "2025-08-01T11:00:00.000Z", // Data futura
    href: "https://example.com/leilao7",
    website: "Leiloeira VEÍCULOS",
    website_image: "https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2025-06-15T16:45:00.000Z",
    data_scraped: "2025-06-15T16:45:00.000Z",
    docs: ["Documento do Veículo"],
    format: "Presencial"
  },
  {
    _id: "8",
    type: "vehicle",
    image: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800",
    vehicle_type: "Carro",
    brand: "Volkswagen",
    model: "Golf",
    color: "Branco",
    year: 2021,
    city: "Belo Horizonte",
    state: "MG",
    initial_bid_value: 52000,
    appraised_value: 68000,
    origin: "Particular",
    stage: "Praça única",
    end_date: "2025-08-05T10:00:00.000Z", // Data futura
    href: "https://example.com/leilao8",
    website: "Leiloeira PREMIUM",
    website_image: "https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2025-06-16T13:20:00.000Z",
    data_scraped: "2025-06-17T13:20:00.000Z", // Hoje para badge "Novo"
    docs: ["Documento do Veículo", "Manual"],
    format: "Híbrido"
  },

  // VEÍCULOS - Motos
  {
    _id: "9",
    type: "vehicle",
    image: "https://images.pexels.com/photos/163210/motorcycles-race-helmets-pilots-163210.jpeg?auto=compress&cs=tinysrgb&w=800",
    vehicle_type: "Moto",
    brand: "Honda",
    model: "CB 600F",
    color: "Vermelho",
    year: 2019,
    city: "Curitiba",
    state: "PR",
    initial_bid_value: 15000,
    appraised_value: 20000,
    origin: "Extrajudicial",
    stage: "1ª Praça",
    end_date: "2025-08-01T11:00:00.000Z", // Data futura
    href: "https://example.com/leilao9",
    website: "Leiloeira MOTOS",
    website_image: "https://images.pexels.com/photos/3184301/pexels-photo-3184301.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2025-06-13T15:45:00.000Z",
    data_scraped: "2025-06-13T15:45:00.000Z",
    docs: ["Documento do Veículo"],
    format: "Presencial"
  },
  {
    _id: "10",
    type: "vehicle",
    image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=800",
    vehicle_type: "Moto",
    brand: "Yamaha",
    model: "MT-07",
    color: "Preto",
    year: 2020,
    city: "Porto Alegre",
    state: "RS",
    initial_bid_value: 18000,
    appraised_value: 24000,
    origin: "Judicial",
    stage: "2ª Praça",
    end_date: "2025-08-10T14:30:00.000Z", // Data futura
    href: "https://example.com/leilao10",
    website: "Leiloeira SUL",
    website_image: "https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2025-06-15T09:15:00.000Z",
    data_scraped: "2025-06-15T09:15:00.000Z",
    docs: ["Documento do Veículo", "Laudo"],
    format: "Online"
  },

  // VEÍCULOS - Caminhões
  {
    _id: "11",
    type: "vehicle",
    image: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800",
    vehicle_type: "Caminhão",
    brand: "Mercedes-Benz",
    model: "Atego 1719",
    color: "Branco",
    year: 2018,
    city: "São Paulo",
    state: "SP",
    initial_bid_value: 85000,
    appraised_value: 110000,
    origin: "Judicial",
    stage: "1ª Praça",
    end_date: "2025-08-15T16:00:00.000Z", // Data futura
    href: "https://example.com/leilao11",
    website: "Leiloeira PESADOS",
    website_image: "https://images.pexels.com/photos/3184303/pexels-photo-3184303.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2025-06-16T14:00:00.000Z",
    data_scraped: "2025-06-16T14:00:00.000Z",
    docs: ["Documento do Veículo", "Tacógrafo"],
    format: "Presencial"
  },

  // VEÍCULOS - Ônibus
  {
    _id: "12",
    type: "vehicle",
    image: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800",
    vehicle_type: "Ônibus",
    brand: "Mercedes-Benz",
    model: "OF-1721",
    color: "Branco",
    year: 2016,
    city: "Salvador",
    state: "BA",
    initial_bid_value: 95000,
    appraised_value: 125000,
    origin: "Público",
    stage: "1ª Praça",
    end_date: "2025-08-20T15:00:00.000Z", // Data futura
    href: "https://example.com/leilao12",
    website: "Leiloeira NORDESTE",
    website_image: "https://images.pexels.com/photos/3184305/pexels-photo-3184305.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2025-06-15T12:45:00.000Z",
    data_scraped: "2025-06-15T12:45:00.000Z",
    docs: ["Documento do Veículo", "ANTT"],
    format: "Híbrido"
  },

  // VEÍCULOS - Máquinas
  {
    _id: "13",
    type: "vehicle",
    image: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800",
    vehicle_type: "Máquina",
    brand: "Caterpillar",
    model: "320D",
    color: "Amarelo",
    year: 2015,
    city: "Goiânia",
    state: "GO",
    initial_bid_value: 180000,
    appraised_value: 230000,
    origin: "Judicial",
    stage: "3ª Praça",
    end_date: "2025-08-25T10:00:00.000Z", // Data futura
    href: "https://example.com/leilao13",
    website: "Leiloeira MÁQUINAS",
    website_image: "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2025-06-14T08:20:00.000Z",
    data_scraped: "2025-06-14T08:20:00.000Z",
    docs: ["Documento do Veículo", "Manual"],
    format: "Presencial"
  },

  // VEÍCULOS - Apoio (ex-reboques)
  {
    _id: "14",
    type: "vehicle",
    image: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800",
    vehicle_type: "Reboque",
    brand: "Randon",
    model: "SR 2E",
    color: "Cinza",
    year: 2019,
    city: "Caxias do Sul",
    state: "RS",
    initial_bid_value: 35000,
    appraised_value: 45000,
    origin: "Extrajudicial",
    stage: "1ª Praça",
    end_date: "2025-08-30T13:00:00.000Z", // Data futura
    href: "https://example.com/leilao14",
    website: "Leiloeira APOIO",
    website_image: "https://images.pexels.com/photos/3184307/pexels-photo-3184307.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2025-06-16T10:15:00.000Z",
    data_scraped: "2025-06-16T10:15:00.000Z",
    docs: ["Documento do Veículo"],
    format: "Online"
  },

  // VEÍCULOS - Embarcações
  {
    _id: "15",
    type: "vehicle",
    image: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800",
    vehicle_type: "Embarcação",
    brand: "Yamaha",
    model: "Lancha 24 pés",
    color: "Branco",
    year: 2018,
    city: "Santos",
    state: "SP",
    initial_bid_value: 65000,
    appraised_value: 85000,
    origin: "Particular",
    stage: "Praça única",
    end_date: "2025-09-01T16:30:00.000Z", // Data futura
    href: "https://example.com/leilao15",
    website: "Leiloeira NÁUTICA",
    website_image: "https://images.pexels.com/photos/3184308/pexels-photo-3184308.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2025-06-15T14:30:00.000Z",
    data_scraped: "2025-06-15T14:30:00.000Z",
    docs: ["Documento da Embarcação", "Marinha"],
    format: "Presencial"
  }
];

// ===== UTILITY FUNCTIONS =====

/**
 * Normaliza string para comparação (remove acentos, espaços extras, etc.)
 */
function normalizeString(str: string): string {
  if (!str || typeof str !== 'string') return '';
  
  return str
    .normalize('NFD') // Decompor caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' '); // Normalizar espaços
}

/**
 * Compara duas strings de forma robusta (case-insensitive, sem acentos)
 */
function compareStrings(str1: string, str2: string): boolean {
  return normalizeString(str1) === normalizeString(str2);
}

/**
 * Type guard para validar se um valor é um array de strings
 */
function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
}

/**
 * Type guard para validar se um valor é um range numérico
 */
function isNumberRange(value: unknown): value is [number, number] {
  return Array.isArray(value) && 
         value.length === 2 && 
         typeof value[0] === 'number' && 
         typeof value[1] === 'number';
}

export function getAuctionsByCategory(
  category: Category,
  type?: string,
  filters?: Filters,
  sort?: SortOption,
  searchQuery?: string
): AuctionSearchResult {
  // 🛡️ CORREÇÃO: Verificação defensiva para evitar erro #130
  if (!category || !Array.isArray(mockAuctions)) {
    return { auctions: [], totalSites: 0, newAuctions: 0 };
  }
  
  const now = DateUtils.getNow();
  
  // Filter by category and active auctions (end_date > now)
  let filteredAuctions = mockAuctions.filter((auction): auction is Auction => {
    // 🛡️ CORREÇÃO: Usar type guard para validação
    if (!isValidAuction(auction)) {
      return false;
    }
    
    // 🔧 CORREÇÃO: Usar DateUtils para parsing e comparação de datas
    const endDate = DateUtils.parse(auction.end_date);
    
    if (!endDate) {
      return false;
    }
    
    const isActive = DateUtils.isFuture(endDate);
    const matchesCategory = category === 'imoveis' ? auction.type === 'property' : auction.type === 'vehicle';
    
    if (!isActive || !matchesCategory) {
      return false;
    }

    // Filter by specific type if provided
    if (type && type !== 'todos') {
      if (category === 'veiculos') {
        const allowedTypes = MAPPING_CONFIG.VEHICLE_TYPE_MAP[type as keyof typeof MAPPING_CONFIG.VEHICLE_TYPE_MAP];
        if (allowedTypes && !allowedTypes.includes(auction.vehicle_type || '')) {
          return false;
        }
      } else {
        const allowedTypes = MAPPING_CONFIG.PROPERTY_TYPE_MAP[type as keyof typeof MAPPING_CONFIG.PROPERTY_TYPE_MAP];
        if (allowedTypes && !allowedTypes.includes(auction.property_type || '')) {
          return false;
        }
      }
    }
    
    return true;
  });

  // Apply filters
  if (filters && typeof filters === 'object') {
    filteredAuctions = filteredAuctions.filter((auction): boolean => {
      // 🛡️ CORREÇÃO: Verificar se auction ainda é válido
      if (!isValidAuction(auction)) {
        return false;
      }
      
      // Format filter - CORREÇÃO: Usar mapeamento centralizado
      if (filters.format) {
        const allowedFormats = MAPPING_CONFIG.FORMAT_MAP[filters.format as keyof typeof MAPPING_CONFIG.FORMAT_MAP];
        if (filters.format === 'leilao') {
          // Para leilão, aceitar Presencial, Online ou Híbrido
          if (!allowedFormats.includes(auction.format)) {
            return false;
          }
        } else if (allowedFormats && !allowedFormats.includes(auction.format)) {
          return false;
        }
      }

      // Origin filter (multiple choice) - CORREÇÃO: Usar mapeamento centralizado
      if (filters.origin && isStringArray(filters.origin) && filters.origin.length > 0) {
        const mappedOrigins = filters.origin.map(o => MAPPING_CONFIG.ORIGIN_MAP[o as keyof typeof MAPPING_CONFIG.ORIGIN_MAP] || o);
        if (!mappedOrigins.includes(auction.origin)) {
          return false;
        }
      }

      // Stage filter (multiple choice) - CORREÇÃO: Usar mapeamento centralizado
      if (filters.stage && isStringArray(filters.stage) && filters.stage.length > 0) {
        const mappedStages = filters.stage.map(s => MAPPING_CONFIG.STAGE_MAP[s as keyof typeof MAPPING_CONFIG.STAGE_MAP] || s);
        if (!mappedStages.includes(auction.stage)) {
          return false;
        }
      }

      // State filter
      if (filters.state && filters.state !== "all" && auction.state !== filters.state) {
        return false;
      }

      // City filter - 🔧 CORREÇÃO: Usar comparação robusta
      if (filters.city && filters.city !== "all") {
        const cityMatches = compareStrings(auction.city, filters.city);
        if (!cityMatches) {
          return false;
        }
      }

      // Property-specific filters
      if (auction.type === 'property') {
        // Useful area filter
        if (filters.useful_area_m2 && isNumberRange(filters.useful_area_m2) && auction.useful_area_m2) {
          const [min, max] = filters.useful_area_m2;
          if (auction.useful_area_m2 < min || auction.useful_area_m2 > max) {
            return false;
          }
        }
      }

      // Vehicle-specific filters
      if (auction.type === 'vehicle') {
        // Brand filter - CORREÇÃO: Usar comparação robusta
        if (filters.brand && filters.brand !== "all") {
          const brandMatches = compareStrings(auction.brand || '', filters.brand);
          if (!brandMatches) {
            return false;
          }
        }

        // Model filter - CORREÇÃO: Usar comparação robusta
        if (filters.model && filters.model !== "all") {
          const modelMatches = compareStrings(auction.model || '', filters.model);
          if (!modelMatches) {
            return false;
          }
        }

        // Color filter - CORREÇÃO: Usar comparação robusta
        if (filters.color && filters.color !== "all") {
          const colorMatches = compareStrings(auction.color || '', filters.color);
          if (!colorMatches) {
            return false;
          }
        }

        // Year filter
        if (filters.year && isNumberRange(filters.year) && auction.year) {
          const [min, max] = filters.year;
          if (auction.year < min || auction.year > max) {
            return false;
          }
        }
      }

      // Initial bid value filter
      if (filters.initial_bid_value && isNumberRange(filters.initial_bid_value)) {
        const [min, max] = filters.initial_bid_value;
        if (auction.initial_bid_value < min || auction.initial_bid_value > max) {
          return false;
        }
      }

      return true;
    });
  }

  // Apply search query
  if (searchQuery && typeof searchQuery === 'string' && searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    
    filteredAuctions = filteredAuctions.filter((auction): boolean => {
      // 🛡️ CORREÇÃO: Verificar se auction ainda é válido
      if (!isValidAuction(auction)) {
        return false;
      }
      
      const searchableText = [
        auction.property_type,
        auction.property_address,
        auction.vehicle_type,
        auction.brand,
        auction.model,
        auction.city,
        auction.state,
        auction.website
      ].filter((item): item is string => typeof item === 'string').join(' ').toLowerCase();
      
      return searchableText.includes(query);
    });
  }

  // Apply sorting
  if (sort && filteredAuctions.length > 0) {
    try {
      filteredAuctions.sort((a, b): number => {
        // 🛡️ CORREÇÃO: Verificar se ambos os auctions são válidos
        if (!isValidAuction(a) || !isValidAuction(b)) {
          return 0;
        }
        
        switch (sort) {
          case 'newest':
            // 🔧 CORREÇÃO: Usar DateUtils para comparação de datas
            const dateA = DateUtils.parse(a.updated);
            const dateB = DateUtils.parse(b.updated);
            if (!dateA || !dateB) return 0;
            return dateB.getTime() - dateA.getTime();
          case 'lowest-bid':
            return a.initial_bid_value - b.initial_bid_value;
          case 'highest-bid':
            return b.initial_bid_value - a.initial_bid_value;
          case 'highest-discount':
            const discountA = a.appraised_value ? ((a.appraised_value - a.initial_bid_value) / a.appraised_value) * 100 : 0;
            const discountB = b.appraised_value ? ((b.appraised_value - b.initial_bid_value) / b.appraised_value) * 100 : 0;
            return discountB - discountA;
          case 'nearest':
            // 🔧 CORREÇÃO: Usar DateUtils para comparação de datas
            const endA = DateUtils.parse(a.end_date);
            const endB = DateUtils.parse(b.end_date);
            if (!endA || !endB) return 0;
            return endA.getTime() - endB.getTime();
          default:
            return 0;
        }
      });
    } catch (error) {
      console.error('Erro ao ordenar leilões:', error);
    }
  }

  // Calculate statistics
  try {
    // 🔧 CORREÇÃO: Usar DateUtils e configuração centralizada para cálculo de "novos hoje"
    const newAuctions = filteredAuctions.filter((auction): boolean => {
      if (!isValidAuction(auction) || !auction.data_scraped) return false;
      return DateUtils.isWithinLastHours(auction.data_scraped, DATE_CONFIG.NEW_AUCTION_THRESHOLD_HOURS);
    }).length;

    const uniqueSites = new Set(filteredAuctions.map(auction => auction.website).filter((site): site is string => typeof site === 'string'));
    const totalSites = uniqueSites.size;

    return {
      auctions: filteredAuctions,
      totalSites,
      newAuctions
    };
  } catch (error) {
    console.error('Erro ao calcular estatísticas:', error);
    return { auctions: filteredAuctions, totalSites: 0, newAuctions: 0 };
  }
}