import { Auction } from '../types/auction';

export type Category = 'imoveis' | 'veiculos';
export type SortOption = 'recent' | 'price_asc' | 'price_desc' | 'discount' | 'ending_soon';

export interface ImoveisFiltersState {
  format?: string;
  origin: string[];
  stage: string[];
  state?: string;
  city?: string;
  useful_area_m2: [number, number];
  initial_bid_value: [number, number];
}

export interface VeiculosFiltersState {
  format?: string;
  origin: string[];
  stage: string[];
  state?: string;
  city?: string;
  brand?: string;
  model?: string;
  color?: string;
  year: [number, number];
  initial_bid_value: [number, number];
}

const mockAuctionsRaw = [
  // Mock property auctions
  {
    _id: '1',
    type: 'property',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
    property_type: 'Apartamento',
    useful_area_m2: 85,
    property_address: 'Rua das Flores, 123',
    city: 'São Paulo',
    state: 'SP',
    initial_bid_value: 250000,
    appraised_value: 320000,
    origin: 'Judicial',
    stage: 'Primeira Praça',
    end_date: new Date('2024-12-30T10:00:00'),
    href: 'https://example.com/auction/1',
    website: 'Leiloeira ABC',
    website_image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100',
    updated: new Date(),
    data_scraped: new Date(),
    docs: ['Matrícula', 'Certidões'],
    format: 'Presencial'
  },
  {
    _id: '2',
    type: 'property',
    image: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=800',
    property_type: 'Casa',
    useful_area_m2: 120,
    property_address: 'Avenida Central, 456',
    city: 'Rio de Janeiro',
    state: 'RJ',
    initial_bid_value: 180000,
    appraised_value: 220000,
    origin: 'Extrajudicial',
    stage: 'Segunda Praça',
    end_date: new Date('2024-12-28T14:00:00'),
    href: 'https://example.com/auction/2',
    website: 'Leilões XYZ',
    website_image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100',
    updated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    data_scraped: new Date(),
    docs: ['Escritura', 'IPTU'],
    format: 'Online'
  },
  // Mock vehicle auctions
  {
    _id: '3',
    type: 'vehicle',
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800',
    vehicle_type: 'Carro',
    brand: 'Toyota',
    model: 'Corolla',
    color: 'Prata',
    year: 2020,
    city: 'Belo Horizonte',
    state: 'MG',
    initial_bid_value: 45000,
    appraised_value: 55000,
    origin: 'Seguradora',
    stage: 'Primeira Praça',
    end_date: new Date('2024-12-29T16:00:00'),
    href: 'https://example.com/auction/3',
    website: 'Auto Leilões',
    website_image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100',
    updated: new Date(),
    data_scraped: new Date(),
    docs: ['Documento', 'Laudo'],
    format: 'Presencial'
  },
  {
    _id: '4',
    type: 'vehicle',
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
    vehicle_type: 'Moto',
    brand: 'Honda',
    model: 'CB 600F',
    color: 'Azul',
    year: 2019,
    city: 'Porto Alegre',
    state: 'RS',
    initial_bid_value: 15000,
    appraised_value: 18000,
    origin: 'Judicial',
    stage: 'Segunda Praça',
    end_date: new Date('2024-12-31T11:00:00'),
    href: 'https://example.com/auction/4',
    website: 'Moto Leilões',
    website_image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100',
    updated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    data_scraped: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    docs: ['Documento', 'Vistoria'],
    format: 'Online'
  },
  {
    _id: '5',
    type: 'property',
    image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
    property_type: 'Sobrado',
    useful_area_m2: 200,
    property_address: 'Rua dos Pinheiros, 789',
    city: 'Curitiba',
    state: 'PR',
    initial_bid_value: 350000,
    appraised_value: 420000,
    origin: 'Judicial',
    stage: 'Primeira Praça',
    end_date: new Date('2025-01-02T09:00:00'),
    href: 'https://example.com/auction/5',
    website: 'Imóveis Leilão',
    website_image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100',
    updated: new Date(),
    data_scraped: new Date(),
    docs: ['Matrícula', 'Certidões', 'Planta'],
    format: 'Híbrido'
  }
];

function mapToAuction(rawAuction: any): Auction {
  return {
    ...rawAuction,
    end_date: rawAuction.end_date instanceof Date ? rawAuction.end_date : new Date(rawAuction.end_date),
    updated: rawAuction.updated instanceof Date ? rawAuction.updated : new Date(rawAuction.updated),
    data_scraped: rawAuction.data_scraped instanceof Date ? rawAuction.data_scraped : new Date(rawAuction.data_scraped)
  };
}

export const mockAuctions: Auction[] = mockAuctionsRaw.map(mapToAuction);

export function getAuctionsByCategory(
  category: Category,
  type: string,
  filters: ImoveisFiltersState | VeiculosFiltersState,
  sortOption: SortOption,
  searchQuery?: string
): {
  auctions: Auction[];
  totalAuctions: number;
  newAuctions: number;
  totalSites: number;
} {
  const now = new Date();
  
  // Filter by category and active auctions only
  let filteredAuctions = mockAuctions.filter(auction => {
    const isActive = auction.end_date >= now;
    const matchesCategory = category === 'imoveis' ? auction.type === 'property' : auction.type === 'vehicle';
    return isActive && matchesCategory;
  });

  // Apply search query
  if (searchQuery && searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    filteredAuctions = filteredAuctions.filter(auction => {
      if (auction.type === 'property') {
        return (
          auction.property_type?.toLowerCase().includes(query) ||
          auction.property_address?.toLowerCase().includes(query) ||
          auction.city?.toLowerCase().includes(query) ||
          auction.state?.toLowerCase().includes(query)
        );
      } else {
        return (
          auction.brand?.toLowerCase().includes(query) ||
          auction.model?.toLowerCase().includes(query) ||
          auction.vehicle_type?.toLowerCase().includes(query) ||
          auction.city?.toLowerCase().includes(query) ||
          auction.state?.toLowerCase().includes(query)
        );
      }
    });
  }

  // Apply filters
  if (category === 'imoveis') {
    const imoveisFilters = filters as ImoveisFiltersState;
    filteredAuctions = filteredAuctions.filter(auction => {
      if (auction.type !== 'property') return false;

      // Format filter
      if (imoveisFilters.format && auction.format !== imoveisFilters.format) {
        return false;
      }

      // Origin filter
      if (imoveisFilters.origin.length > 0 && !imoveisFilters.origin.includes(auction.origin)) {
        return false;
      }

      // Stage filter
      if (imoveisFilters.stage.length > 0 && !imoveisFilters.stage.includes(auction.stage)) {
        return false;
      }

      // State filter
      if (imoveisFilters.state && auction.state !== imoveisFilters.state) {
        return false;
      }

      // City filter
      if (imoveisFilters.city && auction.city !== imoveisFilters.city) {
        return false;
      }

      // Area filter
      if (auction.useful_area_m2 !== undefined) {
        const [minArea, maxArea] = imoveisFilters.useful_area_m2;
        if (auction.useful_area_m2 < minArea || auction.useful_area_m2 > maxArea) {
          return false;
        }
      }

      // Price filter
      const [minPrice, maxPrice] = imoveisFilters.initial_bid_value;
      if (auction.initial_bid_value < minPrice || auction.initial_bid_value > maxPrice) {
        return false;
      }

      return true;
    });
  } else {
    const veiculosFilters = filters as VeiculosFiltersState;
    filteredAuctions = filteredAuctions.filter(auction => {
      if (auction.type !== 'vehicle') return false;

      // Format filter
      if (veiculosFilters.format && auction.format !== veiculosFilters.format) {
        return false;
      }

      // Origin filter
      if (veiculosFilters.origin.length > 0 && !veiculosFilters.origin.includes(auction.origin)) {
        return false;
      }

      // Stage filter
      if (veiculosFilters.stage.length > 0 && !veiculosFilters.stage.includes(auction.stage)) {
        return false;
      }

      // State filter
      if (veiculosFilters.state && auction.state !== veiculosFilters.state) {
        return false;
      }

      // City filter
      if (veiculosFilters.city && auction.city !== veiculosFilters.city) {
        return false;
      }

      // Brand filter
      if (veiculosFilters.brand && auction.brand !== veiculosFilters.brand) {
        return false;
      }

      // Model filter
      if (veiculosFilters.model && auction.model !== veiculosFilters.model) {
        return false;
      }

      // Color filter
      if (veiculosFilters.color && auction.color !== veiculosFilters.color) {
        return false;
      }

      // Year filter
      if (auction.year !== undefined) {
        const [minYear, maxYear] = veiculosFilters.year;
        if (auction.year < minYear || auction.year > maxYear) {
          return false;
        }
      }

      // Price filter
      const [minPrice, maxPrice] = veiculosFilters.initial_bid_value;
      if (auction.initial_bid_value < minPrice || auction.initial_bid_value > maxPrice) {
        return false;
      }

      return true;
    });
  }

  // Apply sorting
  switch (sortOption) {
    case 'recent':
      filteredAuctions.sort((a, b) => b.updated.getTime() - a.updated.getTime());
      break;
    case 'price_asc':
      filteredAuctions.sort((a, b) => a.initial_bid_value - b.initial_bid_value);
      break;
    case 'price_desc':
      filteredAuctions.sort((a, b) => b.initial_bid_value - a.initial_bid_value);
      break;
    case 'discount':
      filteredAuctions.sort((a, b) => {
        const discountA = a.appraised_value ? ((a.appraised_value - a.initial_bid_value) / a.appraised_value) * 100 : 0;
        const discountB = b.appraised_value ? ((b.appraised_value - b.initial_bid_value) / b.appraised_value) * 100 : 0;
        return discountB - discountA;
      });
      break;
    case 'ending_soon':
      filteredAuctions.sort((a, b) => a.end_date.getTime() - b.end_date.getTime());
      break;
  }

  // Calculate statistics
  const totalAuctions = filteredAuctions.length;
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const newAuctions = filteredAuctions.filter(auction => auction.updated >= twentyFourHoursAgo).length;
  const uniqueWebsites = new Set(filteredAuctions.map(auction => auction.website));
  const totalSites = uniqueWebsites.size;

  return {
    auctions: filteredAuctions,
    totalAuctions,
    newAuctions,
    totalSites
  };
}