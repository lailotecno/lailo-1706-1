import { Auction } from '../types/auction';
import { normalizeVehicleType, normalizePropertyType } from '../utils/typeNormalization';
import { SortOption } from '../types/auction';

// Helper function to normalize strings for comparison
// FIXED: Now properly handles diacritics and special characters while preserving spaces and numbers
const normalizeString = (str: string): string => {
  return str
    .normalize('NFD') // Decompose characters with diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove only punctuation, keep letters, numbers and spaces
    .replace(/\s+/g, ' ') // Normalize multiple spaces to single space
    .trim();
};

// FIXED: Mapeamento de etapas para traduzir valores dos filtros para valores dos dados mock
const etapaMapping: Record<string, string> = {
  'primeira': '1ª Praça',
  'segunda': '2ª Praça',
  'terceira': '3ª Praça',
  'praca-unica': 'Praça única'
};

// Generate more mock data to demonstrate pagination
const generateMockVeiculos = (): Auction[] => {
  const baseVeiculos = [
    {
      id: '1',
      title: 'BMW X5 2018',
      description: 'Estado de Conservação Excelente',
      currentBid: 180000,
      minimumBid: 150000,
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      imageUrl: 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'São Paulo/SP',
      site: 'SuperLeilões',
      category: 'Veículos',
      isNew: true,
      bidsCount: 23,
      color: 'Preto',
      year: '2018',
      origem: 'Judicial',
      etapa: '1ª Praça',
      vehicleType: normalizeVehicleType('carros'),
      formato: 'leilao',
      appraisedValue: 220000
    },
    {
      id: '2',
      title: 'Honda Civic 2020',
      description: 'Único Dono',
      currentBid: 95000,
      minimumBid: 85000,
      endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
      imageUrl: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Brasília/DF',
      site: 'Leilões Online',
      category: 'Veículos',
      bidsCount: 41,
      color: 'Prata',
      year: '2020',
      origem: 'Extrajudicial',
      etapa: '2ª Praça',
      vehicleType: normalizeVehicleType('carros'),
      formato: 'venda-direta',
      appraisedValue: 110000
    },
    {
      id: '3',
      title: 'Toyota Corolla 2019',
      description: 'Automático',
      currentBid: 78000,
      minimumBid: 70000,
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      imageUrl: 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Rio de Janeiro/RJ',
      site: 'Lance Certo',
      category: 'Veículos',
      isNew: true,
      bidsCount: 56,
      color: 'Branco',
      year: '2019',
      origem: 'Particular',
      etapa: 'Praça única',
      vehicleType: normalizeVehicleType('carros'),
      formato: 'leilao',
      appraisedValue: 95000
    },
    {
      id: '4',
      title: 'Volkswagen Tiguan 2017',
      description: 'SUV Completo',
      currentBid: 125000,
      minimumBid: 110000,
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      imageUrl: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Curitiba/PR',
      site: 'Mega Leilões',
      category: 'Veículos',
      bidsCount: 34,
      color: 'Azul',
      year: '2017',
      origem: 'Público',
      etapa: '3ª Praça',
      vehicleType: normalizeVehicleType('carros'),
      formato: 'leilao',
      appraisedValue: 150000
    }
  ];

  // Generate additional vehicles to reach 100+ items
  const additionalVeiculos: Auction[] = [];
  const carBrands = ['Toyota', 'Honda', 'Volkswagen', 'Ford', 'Chevrolet', 'Hyundai', 'Nissan', 'Fiat', 'Renault', 'Peugeot'];
  const carModels = ['Sedan', 'Hatch', 'SUV', 'Pickup', 'Crossover'];
  const colors = ['Preto', 'Branco', 'Prata', 'Azul', 'Vermelho', 'Cinza'];
  const locations = ['São Paulo/SP', 'Rio de Janeiro/RJ', 'Belo Horizonte/MG', 'Brasília/DF', 'Curitiba/PR', 'Porto Alegre/RS'];
  const sites = ['SuperLeilões', 'Leilões Online', 'Lance Certo', 'Mega Leilões', 'Sodré Santoro', 'Frazão Leilões'];
  const origens = ['Judicial', 'Extrajudicial', 'Particular', 'Público'];
  const etapas = ['Praça única', '1ª Praça', '2ª Praça', '3ª Praça'];
  const vehicleTypes = ['carros', 'motos', 'caminhoes', 'embarcacoes', 'maquinas', 'onibus', 'apoio', 'recreativos'];
  const formatos = ['leilao', 'venda-direta'];
  const images = [
    'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=600'
  ];

  for (let i = 5; i <= 100; i++) {
    const brand = carBrands[Math.floor(Math.random() * carBrands.length)];
    const model = carModels[Math.floor(Math.random() * carModels.length)];
    const year = (2015 + Math.floor(Math.random() * 9)).toString();
    const color = colors[Math.floor(Math.random() * colors.length)];
    const price = 30000 + Math.floor(Math.random() * 200000);
    const km = 10000 + Math.floor(Math.random() * 100000);
    const vehicleType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
    const formato = formatos[Math.floor(Math.random() * formatos.length)];
    const appraisedValue = Math.random() > 0.3 ? price + Math.floor(Math.random() * 50000) : undefined;
    
    additionalVeiculos.push({
      id: i.toString(),
      title: `${brand} ${model} ${year}`,
      description: `${km.toLocaleString('pt-BR')} km`,
      currentBid: price,
      minimumBid: Math.floor(price * 0.8),
      endDate: new Date(Date.now() + Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000),
      imageUrl: images[Math.floor(Math.random() * images.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      site: sites[Math.floor(Math.random() * sites.length)],
      category: 'Veículos',
      isNew: Math.random() > 0.8,
      bidsCount: Math.floor(Math.random() * 100) + 1,
      color,
      year,
      origem: origens[Math.floor(Math.random() * origens.length)],
      etapa: etapas[Math.floor(Math.random() * etapas.length)],
      vehicleType: normalizeVehicleType(vehicleType),
      formato,
      appraisedValue
    });
  }

  return [...baseVeiculos, ...additionalVeiculos];
};

const generateMockImoveis = (): Auction[] => {
  const baseImoveis = [
    {
      id: '101',
      title: 'Apartamento 3 Quartos',
      description: 'Vista Mar Copacabana',
      currentBid: 850000,
      minimumBid: 800000,
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      imageUrl: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Rio de Janeiro/RJ',
      site: 'Leilões BR',
      category: 'Imóveis',
      bidsCount: 45,
      origem: 'Judicial',
      etapa: '1ª Praça',
      propertyType: normalizePropertyType('apartamentos'),
      formato: 'leilao',
      appraisedValue: 1200000
    },
    {
      id: '102',
      title: 'Casa 4 Quartos',
      description: 'Condomínio Fechado Alphaville',
      currentBid: 1200000,
      minimumBid: 1100000,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      imageUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'São Paulo/SP',
      site: 'Sodré Santoro',
      category: 'Imóveis',
      isNew: true,
      bidsCount: 67,
      origem: 'Extrajudicial',
      etapa: '2ª Praça',
      propertyType: normalizePropertyType('casas'),
      formato: 'venda-direta',
      appraisedValue: 1500000
    },
    {
      id: '103',
      title: 'Cobertura Duplex',
      description: 'Barra da Tijuca',
      currentBid: 1800000,
      minimumBid: 1600000,
      endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      imageUrl: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Rio de Janeiro/RJ',
      site: 'Frazão Leilões',
      category: 'Imóveis',
      bidsCount: 89,
      origem: 'Particular',
      etapa: 'Praça única',
      propertyType: normalizePropertyType('apartamentos'),
      formato: 'leilao',
      appraisedValue: 2200000
    },
    {
      id: '104',
      title: 'Apartamento Studio',
      description: 'Vila Madalena',
      currentBid: 420000,
      minimumBid: 380000,
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      imageUrl: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'São Paulo/SP',
      site: 'Zukerman',
      category: 'Imóveis',
      isNew: true,
      bidsCount: 23,
      origem: 'Público',
      etapa: '3ª Praça',
      propertyType: normalizePropertyType('compactos'),
      formato: 'leilao'
    }
  ];

  // Generate additional properties
  const additionalImoveis: Auction[] = [];
  const propertyTypes = ['apartamentos', 'casas', 'comerciais', 'compactos', 'condominios', 'galpoes', 'terrenos-e-lotes'];
  const neighborhoods = ['Copacabana', 'Ipanema', 'Vila Madalena', 'Moema', 'Leblon', 'Barra da Tijuca', 'Alphaville', 'Jardins'];
  const locations = ['São Paulo/SP', 'Rio de Janeiro/RJ', 'Belo Horizonte/MG', 'Brasília/DF', 'Curitiba/PR', 'Porto Alegre/RS'];
  const sites = ['Leilões BR', 'Sodré Santoro', 'Frazão Leilões', 'Zukerman', 'SuperLeilões', 'Mega Leilões'];
  const origens = ['Judicial', 'Extrajudicial', 'Particular', 'Público'];
  const etapas = ['Praça única', '1ª Praça', '2ª Praça', '3ª Praça'];
  const formatos = ['leilao', 'venda-direta'];
  const images = [
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=600'
  ];

  for (let i = 105; i <= 200; i++) {
    const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const neighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
    const rooms = Math.floor(Math.random() * 4) + 1;
    const price = 200000 + Math.floor(Math.random() * 2000000);
    const area = 40 + Math.floor(Math.random() * 200);
    const formato = formatos[Math.floor(Math.random() * formatos.length)];
    const appraisedValue = Math.random() > 0.3 ? price + Math.floor(Math.random() * 500000) : undefined;
    
    additionalImoveis.push({
      id: i.toString(),
      title: `${propertyType === 'apartamentos' ? 'Apartamento' : propertyType === 'casas' ? 'Casa' : 'Imóvel'} ${rooms} Quartos`,
      description: `${neighborhood}`,
      currentBid: price,
      minimumBid: Math.floor(price * 0.85),
      endDate: new Date(Date.now() + Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000),
      imageUrl: images[Math.floor(Math.random() * images.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      site: sites[Math.floor(Math.random() * sites.length)],
      category: 'Imóveis',
      isNew: Math.random() > 0.8,
      bidsCount: Math.floor(Math.random() * 100) + 1,
      origem: origens[Math.floor(Math.random() * origens.length)],
      etapa: etapas[Math.floor(Math.random() * etapas.length)],
      propertyType: normalizePropertyType(propertyType),
      formato,
      appraisedValue
    });
  }

  return [...baseImoveis, ...additionalImoveis];
};

export const mockVeiculos = generateMockVeiculos();
export const mockImoveis = generateMockImoveis();

// Helper function to extract state from location
const getStateFromLocation = (location: string): string => {
  const parts = location.split('/');
  return parts[1] || '';
};

// Helper function to extract city from location
const getCityFromLocation = (location: string): string => {
  const parts = location.split('/');
  return parts[0] || '';
};

// Helper function to extract brand from title (for vehicles)
const getBrandFromTitle = (title: string): string => {
  return title.split(' ')[0]?.toLowerCase() || '';
};

// Helper function to extract model from title (for vehicles)
const getModelFromTitle = (title: string): string => {
  const parts = title.split(' ');
  return parts.slice(1, -1).join(' ').toLowerCase() || '';
};

// Filter and sort function
export const getAuctionsByCategory = (
  category: 'veiculos' | 'imoveis', 
  type?: string,
  filters?: any,
  sortOption?: SortOption,
  searchQuery?: string
): Auction[] => {
  let auctions = category === 'veiculos' ? mockVeiculos : mockImoveis;
  
  // Filter by type if specified
  if (type && type !== 'todos') {
    if (category === 'veiculos') {
      auctions = auctions.filter(auction => auction.vehicleType === type);
    } else {
      auctions = auctions.filter(auction => auction.propertyType === type);
    }
  }
  
  // Apply filters if provided
  if (filters) {
    auctions = auctions.filter(auction => {
      // Estado filter
      if (filters.estado && filters.estado !== "all" && getStateFromLocation(auction.location) !== filters.estado) {
        return false;
      }
      
      // Cidade filter
      if (filters.cidade && filters.cidade !== "all" && getCityFromLocation(auction.location) !== filters.cidade) {
        return false;
      }
      
      // Formato filter
      if (filters.formato && auction.formato !== filters.formato) {
        return false;
      }
      
      // Origem filter (multiple selection) - FIXED: Use improved normalization
      if (filters.origem && Array.isArray(filters.origem) && filters.origem.length > 0) {
        if (!auction.origem) {
          return false;
        }
        
        const normalizedAuctionOrigem = normalizeString(auction.origem);
        const normalizedFilterOrigens = filters.origem.map((filterOrigem: string) => normalizeString(filterOrigem));
        const hasMatchingOrigem = normalizedFilterOrigens.includes(normalizedAuctionOrigem);
        
        if (!hasMatchingOrigem) {
          return false;
        }
      }
      
      // Etapa filter (multiple selection) - FIXED: Use mapping to translate filter values to mock data values
      if (filters.etapa && Array.isArray(filters.etapa) && filters.etapa.length > 0) {
        if (!auction.etapa) {
          return false;
        }
        
        const normalizedAuctionEtapa = normalizeString(auction.etapa);
        
        // FIXED: Traduzir valores dos filtros para valores dos dados mock antes da normalização
        const normalizedFilterEtapas = filters.etapa.map((filterEtapa: string) => {
          const mappedValue = etapaMapping[filterEtapa] || filterEtapa;
          return normalizeString(mappedValue);
        });
        
        const hasMatchingEtapa = normalizedFilterEtapas.includes(normalizedAuctionEtapa);
        
        if (!hasMatchingEtapa) {
          return false;
        }
      }
      
      // Category-specific filters
      if (category === 'veiculos') {
        // Marca filter
        if (filters.marca && filters.marca !== "all" && getBrandFromTitle(auction.title) !== filters.marca.toLowerCase()) {
          return false;
        }
        
        // Modelo filter
        if (filters.modelo && filters.modelo !== "all" && getModelFromTitle(auction.title) !== filters.modelo.toLowerCase()) {
          return false;
        }
        
        // Cor filter - FIXED: Normalize color comparison
        if (filters.cor && filters.cor !== "all" && auction.color?.toLowerCase() !== filters.cor.toLowerCase()) {
          return false;
        }
        
        // Ano range filter
        if (filters.ano) {
          const year = parseInt(auction.year || '0');
          if (year < filters.ano[0] || year > filters.ano[1]) {
            return false;
          }
        }
        
        // Preço range filter
        if (filters.preco) {
          if (auction.currentBid < filters.preco[0] || auction.currentBid > filters.preco[1]) {
            return false;
          }
        }
      } else {
        // Área range filter (for properties)
        if (filters.area) {
          // Mock area calculation based on price (for demo purposes)
          const mockArea = Math.floor(auction.currentBid / 10000);
          if (mockArea < filters.area[0] || mockArea > filters.area[1]) {
            return false;
          }
        }
        
        // Valor range filter
        if (filters.valor) {
          if (auction.currentBid < filters.valor[0] || auction.currentBid > filters.valor[1]) {
            return false;
          }
        }
      }
      
      return true;
    });
  }
  
  // Apply search filter
  if (searchQuery && searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    auctions = auctions.filter(auction => 
      auction.title.toLowerCase().includes(query) ||
      auction.description.toLowerCase().includes(query) ||
      auction.location.toLowerCase().includes(query)
    );
  }
  
  // Apply sorting
  if (sortOption) {
    auctions = [...auctions].sort((a, b) => {
      switch (sortOption) {
        case 'newest':
          return b.endDate.getTime() - a.endDate.getTime();
        case 'lowest-bid':
          return a.currentBid - b.currentBid;
        case 'highest-bid':
          return b.currentBid - a.currentBid;
        case 'highest-discount':
          const discountA = a.appraisedValue ? ((a.appraisedValue - a.currentBid) / a.appraisedValue) * 100 : 0;
          const discountB = b.appraisedValue ? ((b.appraisedValue - b.currentBid) / b.appraisedValue) * 100 : 0;
          return discountB - discountA;
        case 'nearest':
          return a.endDate.getTime() - b.endDate.getTime();
        default:
          return 0;
      }
    });
  }
  
  return auctions;
};