import { Auction, SortOption, Category } from '../types/auction';
import { normalizeVehicleType, normalizePropertyType } from '../utils/typeNormalization';

export const mockAuctions: Auction[] = [
  {
    _id: "1",
    type: "property",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
    property_type: "Casa",
    useful_area_m2: 120,
    property_address: "Rua das Flores, 123",
    city: "São Paulo",
    state: "SP",
    initial_bid_value: 250000,
    appraised_value: 350000,
    origin: "Judicial",
    stage: "1º Leilão",
    end_date: "2024-12-30T10:00:00Z",
    href: "https://example.com/leilao1",
    website: "Leiloeira ABC",
    website_image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-15T08:00:00Z",
    data_scraped: "2024-12-15T08:00:00Z",
    docs: ["Matrícula", "IPTU"],
    format: "Presencial"
  },
  {
    _id: "2",
    type: "vehicle",
    image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800",
    vehicle_type: "Carro",
    brand: "Toyota",
    model: "Corolla",
    color: "Prata",
    year: 2020,
    city: "Rio de Janeiro",
    state: "RJ",
    initial_bid_value: 45000,
    appraised_value: 65000,
    origin: "Extrajudicial",
    stage: "2º Leilão",
    end_date: "2024-12-28T14:00:00Z",
    href: "https://example.com/leilao2",
    website: "Leiloeira XYZ",
    website_image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-14T10:30:00Z",
    data_scraped: "2024-12-14T10:30:00Z",
    docs: ["Documento do Veículo", "Laudo"],
    format: "Online"
  },
  {
    _id: "3",
    type: "property",
    image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800",
    property_type: "Apartamento",
    useful_area_m2: 85,
    property_address: "Av. Paulista, 1000",
    city: "São Paulo",
    state: "SP",
    initial_bid_value: 180000,
    appraised_value: 220000,
    origin: "Judicial",
    stage: "1º Leilão",
    end_date: "2024-12-25T16:00:00Z",
    href: "https://example.com/leilao3",
    website: "Leiloeira DEF",
    website_image: "https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-15T12:00:00Z",
    data_scraped: "2024-12-15T12:00:00Z",
    docs: ["Matrícula", "Condomínio"],
    format: "Híbrido"
  },
  {
    _id: "4",
    type: "vehicle",
    image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800",
    vehicle_type: "Moto",
    brand: "Honda",
    model: "CB 600F Hornet",
    color: "Vermelha",
    year: 2019,
    city: "Belo Horizonte",
    state: "MG",
    initial_bid_value: 15000,
    appraised_value: 22000,
    origin: "Extrajudicial",
    stage: "1º Leilão",
    end_date: "2024-12-27T11:00:00Z",
    href: "https://example.com/leilao4",
    website: "Leiloeira GHI",
    website_image: "https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-15T09:15:00Z",
    data_scraped: "2024-12-15T09:15:00Z",
    docs: ["Documento do Veículo"],
    format: "Presencial"
  },
  {
    _id: "5",
    type: "property",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
    property_type: "Terreno",
    useful_area_m2: 500,
    property_address: "Rua do Campo, 456",
    city: "Curitiba",
    state: "PR",
    initial_bid_value: 80000,
    appraised_value: 120000,
    origin: "Judicial",
    stage: "2º Leilão",
    end_date: "2024-12-29T09:00:00Z",
    href: "https://example.com/leilao5",
    website: "Leiloeira JKL",
    website_image: "https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-13T14:20:00Z",
    data_scraped: "2024-12-13T14:20:00Z",
    docs: ["Matrícula", "Certidões"],
    format: "Online"
  }
];

export function getAuctionsByCategory(
  category: Category,
  specificType: string | null,
  filters: any,
  sortOption: SortOption,
  searchQuery: string
): { auctions: Auction[], totalCount: number, newCount: number, siteCount: number } {
  const now = new Date();
  
  // Filter auctions by category and active status (end_date >= now)
  let filteredAuctions = mockAuctions.filter(auction => {
    const endDate = new Date(auction.end_date);
    return auction.type === category && endDate >= now;
  });

  // Apply specific type filter
  if (specificType) {
    filteredAuctions = filteredAuctions.filter(auction => {
      if (category === 'property') {
        return normalizePropertyType(auction.property_type || '') === normalizePropertyType(specificType);
      } else {
        return normalizeVehicleType(auction.vehicle_type || '') === normalizeVehicleType(specificType);
      }
    });
  }

  // Apply search query filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredAuctions = filteredAuctions.filter(auction => {
      if (category === 'property') {
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
          auction.city?.toLowerCase().includes(query) ||
          auction.state?.toLowerCase().includes(query)
        );
      }
    });
  }

  // Apply filters
  if (filters.format && filters.format !== 'all') {
    filteredAuctions = filteredAuctions.filter(auction => auction.format === filters.format);
  }

  if (filters.origin && filters.origin.length > 0) {
    filteredAuctions = filteredAuctions.filter(auction => 
      filters.origin.includes(auction.origin)
    );
  }

  if (filters.stage && filters.stage.length > 0) {
    filteredAuctions = filteredAuctions.filter(auction => 
      filters.stage.includes(auction.stage)
    );
  }

  if (filters.state) {
    filteredAuctions = filteredAuctions.filter(auction => auction.state === filters.state);
  }

  if (filters.city) {
    filteredAuctions = filteredAuctions.filter(auction => auction.city === filters.city);
  }

  // Apply category-specific filters
  if (category === 'property') {
    if (filters.useful_area_m2 && (filters.useful_area_m2[0] > 0 || filters.useful_area_m2[1] < 1000)) {
      filteredAuctions = filteredAuctions.filter(auction => {
        const area = auction.useful_area_m2 || 0;
        return area >= filters.useful_area_m2[0] && area <= filters.useful_area_m2[1];
      });
    }
  } else if (category === 'vehicle') {
    if (filters.brand) {
      filteredAuctions = filteredAuctions.filter(auction => auction.brand === filters.brand);
    }

    if (filters.model) {
      filteredAuctions = filteredAuctions.filter(auction => auction.model === filters.model);
    }

    if (filters.color) {
      filteredAuctions = filteredAuctions.filter(auction => auction.color === filters.color);
    }

    if (filters.year && (filters.year[0] > 1990 || filters.year[1] < 2024)) {
      filteredAuctions = filteredAuctions.filter(auction => {
        const year = auction.year || 0;
        return year >= filters.year[0] && year <= filters.year[1];
      });
    }
  }

  // Apply price filter
  if (filters.initial_bid_value && (filters.initial_bid_value[0] > 0 || filters.initial_bid_value[1] < 1000000)) {
    filteredAuctions = filteredAuctions.filter(auction => {
      const price = auction.initial_bid_value || 0;
      return price >= filters.initial_bid_value[0] && price <= filters.initial_bid_value[1];
    });
  }

  // Apply sorting
  filteredAuctions.sort((a, b) => {
    switch (sortOption) {
      case 'recent':
        return new Date(b.updated).getTime() - new Date(a.updated).getTime();
      case 'price-asc':
        return (a.initial_bid_value || 0) - (b.initial_bid_value || 0);
      case 'price-desc':
        return (b.initial_bid_value || 0) - (a.initial_bid_value || 0);
      case 'discount':
        const discountA = a.appraised_value && a.initial_bid_value 
          ? ((a.appraised_value - a.initial_bid_value) / a.appraised_value) * 100 
          : 0;
        const discountB = b.appraised_value && b.initial_bid_value 
          ? ((b.appraised_value - b.initial_bid_value) / b.appraised_value) * 100 
          : 0;
        return discountB - discountA;
      case 'ending-soon':
        return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
      default:
        return 0;
    }
  });

  // Calculate statistics
  const totalCount = filteredAuctions.length;
  
  // Count new auctions (updated in last 24 hours)
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const newCount = filteredAuctions.filter(auction => 
    new Date(auction.updated) >= twentyFourHoursAgo
  ).length;

  // Count unique sites
  const uniqueSites = new Set(filteredAuctions.map(auction => auction.website));
  const siteCount = uniqueSites.size;

  return {
    auctions: filteredAuctions,
    totalCount,
    newCount,
    siteCount
  };
}