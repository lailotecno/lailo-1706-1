import { Auction, Category, SortOption, Filters } from '../types/auction';

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
    stage: "1ª Praça",
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
    appraised_value: 60000,
    origin: "Extrajudicial",
    stage: "2ª Praça",
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
    stage: "1ª Praça",
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
    model: "CB 600F",
    color: "Azul",
    year: 2019,
    city: "Belo Horizonte",
    state: "MG",
    initial_bid_value: 15000,
    appraised_value: 20000,
    origin: "Extrajudicial",
    stage: "1ª Praça",
    end_date: "2024-12-27T11:00:00Z",
    href: "https://example.com/leilao4",
    website: "Leiloeira GHI",
    website_image: "https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-13T15:45:00Z",
    data_scraped: "2024-12-13T15:45:00Z",
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
    appraised_value: 100000,
    origin: "Judicial",
    stage: "2ª Praça",
    end_date: "2024-12-29T09:00:00Z",
    href: "https://example.com/leilao5",
    website: "Leiloeira JKL",
    website_image: "https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-15T07:20:00Z",
    data_scraped: "2024-12-15T07:20:00Z",
    docs: ["Matrícula", "Certidões"],
    format: "Online"
  }
];

export function getAuctionsByCategory(
  category: Category,
  type?: string,
  filters?: Filters,
  sort?: SortOption,
  searchQuery?: string
): { auctions: Auction[]; totalCount: number; newCount: number; sitesCount: number } {
  const now = new Date();
  
  // Filter by category and active auctions (end_date >= now)
  let filteredAuctions = mockAuctions.filter(auction => {
    const endDate = new Date(auction.end_date);
    const isActive = endDate >= now;
    const matchesCategory = category === 'imoveis' ? auction.type === 'property' : auction.type === 'vehicle';
    
    return isActive && matchesCategory;
  });

  // Apply filters
  if (filters) {
    filteredAuctions = filteredAuctions.filter(auction => {
      // Format filter
      if (filters.format && auction.format !== filters.format) {
        return false;
      }

      // Origin filter (multiple choice)
      if (filters.origin && filters.origin.length > 0 && !filters.origin.includes(auction.origin)) {
        return false;
      }

      // Stage filter (multiple choice)
      if (filters.stage && filters.stage.length > 0 && !filters.stage.includes(auction.stage)) {
        return false;
      }

      // State filter
      if (filters.state && auction.state !== filters.state) {
        return false;
      }

      // City filter
      if (filters.city && auction.city !== filters.city) {
        return false;
      }

      // Property-specific filters
      if (auction.type === 'property') {
        // Useful area filter
        if (filters.useful_area_m2 && auction.useful_area_m2) {
          const [min, max] = filters.useful_area_m2;
          if (auction.useful_area_m2 < min || auction.useful_area_m2 > max) {
            return false;
          }
        }
      }

      // Vehicle-specific filters
      if (auction.type === 'vehicle') {
        // Brand filter
        if (filters.brand && auction.brand !== filters.brand) {
          return false;
        }

        // Model filter
        if (filters.model && auction.model !== filters.model) {
          return false;
        }

        // Color filter
        if (filters.color && auction.color !== filters.color) {
          return false;
        }

        // Year filter
        if (filters.year && auction.year) {
          const [min, max] = filters.year;
          if (auction.year < min || auction.year > max) {
            return false;
          }
        }
      }

      // Initial bid value filter
      if (filters.initial_bid_value) {
        const [min, max] = filters.initial_bid_value;
        if (auction.initial_bid_value < min || auction.initial_bid_value > max) {
          return false;
        }
      }

      return true;
    });
  }

  // Apply search query
  if (searchQuery && searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    filteredAuctions = filteredAuctions.filter(auction => {
      const searchableText = [
        auction.property_type,
        auction.property_address,
        auction.vehicle_type,
        auction.brand,
        auction.model,
        auction.city,
        auction.state,
        auction.website
      ].filter(Boolean).join(' ').toLowerCase();
      
      return searchableText.includes(query);
    });
  }

  // Apply sorting
  if (sort) {
    filteredAuctions.sort((a, b) => {
      switch (sort) {
        case 'newest':
          return new Date(b.updated).getTime() - new Date(a.updated).getTime();
        case 'lowest-bid':
          return a.initial_bid_value - b.initial_bid_value;
        case 'highest-bid':
          return b.initial_bid_value - a.initial_bid_value;
        case 'highest-discount':
          const discountA = a.appraised_value ? ((a.appraised_value - a.initial_bid_value) / a.appraised_value) * 100 : 0;
          const discountB = b.appraised_value ? ((b.appraised_value - b.initial_bid_value) / b.appraised_value) * 100 : 0;
          return discountB - discountA;
        case 'nearest':
          return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
        default:
          return 0;
      }
    });
  }

  // Calculate statistics
  const totalCount = filteredAuctions.length;
  
  // Count new auctions (updated in last 24 hours)
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const newCount = filteredAuctions.filter(auction => 
    new Date(auction.updated) >= twentyFourHoursAgo
  ).length;

  // Count unique sites
  const uniqueSites = new Set(filteredAuctions.map(auction => auction.website));
  const sitesCount = uniqueSites.size;

  return {
    auctions: filteredAuctions,
    totalCount,
    newCount,
    sitesCount
  };
}