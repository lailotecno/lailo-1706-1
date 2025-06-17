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