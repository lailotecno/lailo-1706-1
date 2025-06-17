import { Auction, Category, SortOption, Filters } from '../types/auction';

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
    end_date: "2024-12-25T16:00:00Z",
    href: "https://example.com/leilao1",
    website: "Leiloeira ABC",
    website_image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-15T12:00:00Z",
    data_scraped: "2024-12-15T12:00:00Z",
    docs: ["Matrícula", "Condomínio"],
    format: "Presencial"
  },
  {
    _id: "2",
    type: "property",
    image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800",
    property_type: "Apartamento",
    useful_area_m2: 120,
    property_address: "Rua Augusta, 500",
    city: "São Paulo",
    state: "SP",
    initial_bid_value: 350000,
    appraised_value: 450000,
    origin: "Extrajudicial",
    stage: "2ª Praça",
    end_date: "2024-12-28T10:00:00Z",
    href: "https://example.com/leilao2",
    website: "Leiloeira XYZ",
    website_image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-16T08:30:00Z",
    data_scraped: "2024-12-16T08:30:00Z",
    docs: ["Matrícula", "IPTU", "Condomínio"],
    format: "Online"
  },

  // IMÓVEIS - Casas
  {
    _id: "3",
    type: "property",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
    property_type: "Casa",
    useful_area_m2: 250,
    property_address: "Rua das Flores, 123",
    city: "Rio de Janeiro",
    state: "RJ",
    initial_bid_value: 450000,
    appraised_value: 600000,
    origin: "Judicial",
    stage: "1ª Praça",
    end_date: "2024-12-30T14:00:00Z",
    href: "https://example.com/leilao3",
    website: "Leiloeira DEF",
    website_image: "https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-15T15:20:00Z",
    data_scraped: "2024-12-15T15:20:00Z",
    docs: ["Matrícula", "IPTU"],
    format: "Híbrido"
  },
  {
    _id: "4",
    type: "property",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
    property_type: "Casa",
    useful_area_m2: 180,
    property_address: "Av. Copacabana, 800",
    city: "Rio de Janeiro",
    state: "RJ",
    initial_bid_value: 380000,
    appraised_value: 480000,
    origin: "Particular",
    stage: "Praça única",
    end_date: "2024-12-27T11:00:00Z",
    href: "https://example.com/leilao4",
    website: "Leiloeira GHI",
    website_image: "https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-16T09:45:00Z",
    data_scraped: "2024-12-16T09:45:00Z",
    docs: ["Matrícula", "Certidões"],
    format: "Presencial"
  },

  // IMÓVEIS - Comerciais
  {
    _id: "5",
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
    end_date: "2024-12-29T16:00:00Z",
    href: "https://example.com/leilao5",
    website: "Leiloeira JKL",
    website_image: "https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-14T14:10:00Z",
    data_scraped: "2024-12-14T14:10:00Z",
    docs: ["Matrícula", "Alvará"],
    format: "Online"
  },

  // IMÓVEIS - Terrenos e Lotes
  {
    _id: "6",
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
    end_date: "2024-12-26T09:00:00Z",
    href: "https://example.com/leilao6",
    website: "Leiloeira MNO",
    website_image: "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-15T07:20:00Z",
    data_scraped: "2024-12-15T07:20:00Z",
    docs: ["Matrícula", "Certidões"],
    format: "Presencial"
  },

  // IMÓVEIS - Galpões
  {
    _id: "7",
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
    end_date: "2024-12-31T15:00:00Z",
    href: "https://example.com/leilao7",
    website: "Leiloeira PQR",
    website_image: "https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-16T11:30:00Z",
    data_scraped: "2024-12-16T11:30:00Z",
    docs: ["Matrícula", "Alvará", "Bombeiros"],
    format: "Híbrido"
  },

  // VEÍCULOS - Carros
  {
    _id: "8",
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
    end_date: "2024-12-28T14:00:00Z",
    href: "https://example.com/leilao8",
    website: "Leiloeira AUTO",
    website_image: "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-14T10:30:00Z",
    data_scraped: "2024-12-14T10:30:00Z",
    docs: ["Documento do Veículo", "Laudo"],
    format: "Online"
  },
  {
    _id: "9",
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
    end_date: "2024-12-27T11:00:00Z",
    href: "https://example.com/leilao9",
    website: "Leiloeira VEÍCULOS",
    website_image: "https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-15T16:45:00Z",
    data_scraped: "2024-12-15T16:45:00Z",
    docs: ["Documento do Veículo"],
    format: "Presencial"
  },
  {
    _id: "10",
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
    end_date: "2024-12-30T10:00:00Z",
    href: "https://example.com/leilao10",
    website: "Leiloeira PREMIUM",
    website_image: "https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-16T13:20:00Z",
    data_scraped: "2024-12-16T13:20:00Z",
    docs: ["Documento do Veículo", "Manual"],
    format: "Híbrido"
  },

  // VEÍCULOS - Motos
  {
    _id: "11",
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
    end_date: "2024-12-27T11:00:00Z",
    href: "https://example.com/leilao11",
    website: "Leiloeira MOTOS",
    website_image: "https://images.pexels.com/photos/3184301/pexels-photo-3184301.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-13T15:45:00Z",
    data_scraped: "2024-12-13T15:45:00Z",
    docs: ["Documento do Veículo"],
    format: "Presencial"
  },
  {
    _id: "12",
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
    end_date: "2024-12-29T14:30:00Z",
    href: "https://example.com/leilao12",
    website: "Leiloeira SUL",
    website_image: "https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-15T09:15:00Z",
    data_scraped: "2024-12-15T09:15:00Z",
    docs: ["Documento do Veículo", "Laudo"],
    format: "Online"
  },

  // VEÍCULOS - Caminhões
  {
    _id: "13",
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
    end_date: "2024-12-31T16:00:00Z",
    href: "https://example.com/leilao13",
    website: "Leiloeira PESADOS",
    website_image: "https://images.pexels.com/photos/3184303/pexels-photo-3184303.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-16T14:00:00Z",
    data_scraped: "2024-12-16T14:00:00Z",
    docs: ["Documento do Veículo", "Tacógrafo"],
    format: "Presencial"
  },
  {
    _id: "14",
    type: "vehicle",
    image: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800",
    vehicle_type: "Caminhão",
    brand: "Volvo",
    model: "FH 540",
    color: "Azul",
    year: 2017,
    city: "Campinas",
    state: "SP",
    initial_bid_value: 120000,
    appraised_value: 150000,
    origin: "Extrajudicial",
    stage: "2ª Praça",
    end_date: "2024-12-28T09:00:00Z",
    href: "https://example.com/leilao14",
    website: "Leiloeira TRANSPORTE",
    website_image: "https://images.pexels.com/photos/3184304/pexels-photo-3184304.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-14T11:30:00Z",
    data_scraped: "2024-12-14T11:30:00Z",
    docs: ["Documento do Veículo", "ANTT"],
    format: "Online"
  },

  // VEÍCULOS - Ônibus
  {
    _id: "15",
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
    end_date: "2024-12-30T15:00:00Z",
    href: "https://example.com/leilao15",
    website: "Leiloeira NORDESTE",
    website_image: "https://images.pexels.com/photos/3184305/pexels-photo-3184305.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-15T12:45:00Z",
    data_scraped: "2024-12-15T12:45:00Z",
    docs: ["Documento do Veículo", "ANTT"],
    format: "Híbrido"
  },

  // VEÍCULOS - Máquinas
  {
    _id: "16",
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
    end_date: "2024-12-29T10:00:00Z",
    href: "https://example.com/leilao16",
    website: "Leiloeira MÁQUINAS",
    website_image: "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-14T08:20:00Z",
    data_scraped: "2024-12-14T08:20:00Z",
    docs: ["Documento do Veículo", "Manual"],
    format: "Presencial"
  },

  // VEÍCULOS - Apoio (ex-reboques)
  {
    _id: "17",
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
    end_date: "2024-12-26T13:00:00Z",
    href: "https://example.com/leilao17",
    website: "Leiloeira APOIO",
    website_image: "https://images.pexels.com/photos/3184307/pexels-photo-3184307.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-16T10:15:00Z",
    data_scraped: "2024-12-16T10:15:00Z",
    docs: ["Documento do Veículo"],
    format: "Online"
  },

  // VEÍCULOS - Embarcações
  {
    _id: "18",
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
    end_date: "2024-12-27T16:30:00Z",
    href: "https://example.com/leilao18",
    website: "Leiloeira NÁUTICA",
    website_image: "https://images.pexels.com/photos/3184308/pexels-photo-3184308.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-15T14:30:00Z",
    data_scraped: "2024-12-15T14:30:00Z",
    docs: ["Documento da Embarcação", "Marinha"],
    format: "Presencial"
  },

  // VEÍCULOS - Recreativos
  {
    _id: "19",
    type: "vehicle",
    image: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800",
    vehicle_type: "Recreativo",
    brand: "Polaris",
    model: "RZR 1000",
    color: "Verde",
    year: 2020,
    city: "Brasília",
    state: "DF",
    initial_bid_value: 42000,
    appraised_value: 55000,
    origin: "Judicial",
    stage: "2ª Praça",
    end_date: "2024-12-28T12:00:00Z",
    href: "https://example.com/leilao19",
    website: "Leiloeira RECREATIVO",
    website_image: "https://images.pexels.com/photos/3184309/pexels-photo-3184309.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-14T16:00:00Z",
    data_scraped: "2024-12-14T16:00:00Z",
    docs: ["Documento do Veículo"],
    format: "Online"
  },

  // VEÍCULOS - Não Informado
  {
    _id: "20",
    type: "vehicle",
    image: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800",
    vehicle_type: "Não Informado",
    brand: "Não Informado",
    model: "Não Informado",
    color: "Não Informado",
    year: 2010,
    city: "Fortaleza",
    state: "CE",
    initial_bid_value: 8000,
    appraised_value: 12000,
    origin: "Judicial",
    stage: "3ª Praça",
    end_date: "2024-12-25T14:00:00Z",
    href: "https://example.com/leilao20",
    website: "Leiloeira GERAL",
    website_image: "https://images.pexels.com/photos/3184310/pexels-photo-3184310.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-13T09:30:00Z",
    data_scraped: "2024-12-13T09:30:00Z",
    docs: ["Documento do Veículo"],
    format: "Presencial"
  },

  // IMÓVEIS ADICIONAIS - Mais variedade

  // Compactos
  {
    _id: "21",
    type: "property",
    image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800",
    property_type: "Compacto",
    useful_area_m2: 35,
    property_address: "Rua Compact, 200",
    city: "São Paulo",
    state: "SP",
    initial_bid_value: 120000,
    appraised_value: 150000,
    origin: "Particular",
    stage: "1ª Praça",
    end_date: "2024-12-26T11:00:00Z",
    href: "https://example.com/leilao21",
    website: "Leiloeira COMPACTOS",
    website_image: "https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-16T07:45:00Z",
    data_scraped: "2024-12-16T07:45:00Z",
    docs: ["Matrícula", "Condomínio"],
    format: "Online"
  },

  // Condomínios
  {
    _id: "22",
    type: "property",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
    property_type: "Condomínio",
    useful_area_m2: 2000,
    property_address: "Condomínio Residencial, s/n",
    city: "Ribeirão Preto",
    state: "SP",
    initial_bid_value: 1200000,
    appraised_value: 1500000,
    origin: "Judicial",
    stage: "2ª Praça",
    end_date: "2025-01-05T10:00:00Z",
    href: "https://example.com/leilao22",
    website: "Leiloeira GRANDES",
    website_image: "https://images.pexels.com/photos/3184312/pexels-photo-3184312.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-15T13:20:00Z",
    data_scraped: "2024-12-15T13:20:00Z",
    docs: ["Matrícula", "Convenção", "IPTU"],
    format: "Presencial"
  },

  // Garagem
  {
    _id: "23",
    type: "property",
    image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=800",
    property_type: "Garagem",
    useful_area_m2: 25,
    property_address: "Subsolo Edifício Central",
    city: "Porto Alegre",
    state: "RS",
    initial_bid_value: 35000,
    appraised_value: 45000,
    origin: "Extrajudicial",
    stage: "1ª Praça",
    end_date: "2024-12-27T09:30:00Z",
    href: "https://example.com/leilao23",
    website: "Leiloeira GARAGENS",
    website_image: "https://images.pexels.com/photos/3184313/pexels-photo-3184313.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-14T12:15:00Z",
    data_scraped: "2024-12-14T12:15:00Z",
    docs: ["Matrícula", "Convenção"],
    format: "Online"
  },

  // Hospedagem
  {
    _id: "24",
    type: "property",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
    property_type: "Hospedagem",
    useful_area_m2: 600,
    property_address: "Av. Turística, 1500",
    city: "Florianópolis",
    state: "SC",
    initial_bid_value: 850000,
    appraised_value: 1100000,
    origin: "Judicial",
    stage: "1ª Praça",
    end_date: "2024-12-30T16:00:00Z",
    href: "https://example.com/leilao24",
    website: "Leiloeira TURISMO",
    website_image: "https://images.pexels.com/photos/3184314/pexels-photo-3184314.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-16T15:30:00Z",
    data_scraped: "2024-12-16T15:30:00Z",
    docs: ["Matrícula", "Alvará Turismo", "Bombeiros"],
    format: "Híbrido"
  },

  // Industriais
  {
    _id: "25",
    type: "property",
    image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=800",
    property_type: "Industrial",
    useful_area_m2: 1200,
    property_address: "Distrito Industrial, 500",
    city: "São José dos Campos",
    state: "SP",
    initial_bid_value: 680000,
    appraised_value: 850000,
    origin: "Extrajudicial",
    stage: "2ª Praça",
    end_date: "2024-12-31T14:00:00Z",
    href: "https://example.com/leilao25",
    website: "Leiloeira INDUSTRIAL",
    website_image: "https://images.pexels.com/photos/3184315/pexels-photo-3184315.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-15T10:45:00Z",
    data_scraped: "2024-12-15T10:45:00Z",
    docs: ["Matrícula", "Alvará Industrial", "Ambiental"],
    format: "Presencial"
  },

  // Mistos
  {
    _id: "26",
    type: "property",
    image: "https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg?auto=compress&cs=tinysrgb&w=800",
    property_type: "Misto",
    useful_area_m2: 400,
    property_address: "Rua Mista, 300",
    city: "Recife",
    state: "PE",
    initial_bid_value: 320000,
    appraised_value: 420000,
    origin: "Judicial",
    stage: "1ª Praça",
    end_date: "2024-12-28T13:00:00Z",
    href: "https://example.com/leilao26",
    website: "Leiloeira NORDESTE",
    website_image: "https://images.pexels.com/photos/3184316/pexels-photo-3184316.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-14T14:20:00Z",
    data_scraped: "2024-12-14T14:20:00Z",
    docs: ["Matrícula", "Alvará Comercial"],
    format: "Online"
  },

  // Prédios
  {
    _id: "27",
    type: "property",
    image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800",
    property_type: "Prédio",
    useful_area_m2: 1500,
    property_address: "Centro Comercial, 100",
    city: "Campinas",
    state: "SP",
    initial_bid_value: 980000,
    appraised_value: 1250000,
    origin: "Particular",
    stage: "Praça única",
    end_date: "2025-01-02T15:00:00Z",
    href: "https://example.com/leilao27",
    website: "Leiloeira PRÉDIOS",
    website_image: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-16T12:00:00Z",
    data_scraped: "2024-12-16T12:00:00Z",
    docs: ["Matrícula", "Habite-se", "Bombeiros"],
    format: "Presencial"
  },

  // Rurais
  {
    _id: "28",
    type: "property",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
    property_type: "Rural",
    useful_area_m2: 50000,
    property_address: "Fazenda Rural, Km 15",
    city: "Uberlândia",
    state: "MG",
    initial_bid_value: 450000,
    appraised_value: 600000,
    origin: "Judicial",
    stage: "3ª Praça",
    end_date: "2024-12-29T11:00:00Z",
    href: "https://example.com/leilao28",
    website: "Leiloeira RURAL",
    website_image: "https://images.pexels.com/photos/3184318/pexels-photo-3184318.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-13T11:30:00Z",
    data_scraped: "2024-12-13T11:30:00Z",
    docs: ["Matrícula", "ITR", "INCRA"],
    format: "Híbrido"
  },

  // Imóveis Não Informado
  {
    _id: "29",
    type: "property",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
    property_type: "Não Informado",
    useful_area_m2: 100,
    property_address: "Endereço não informado",
    city: "Manaus",
    state: "AM",
    initial_bid_value: 75000,
    appraised_value: 95000,
    origin: "Judicial",
    stage: "2ª Praça",
    end_date: "2024-12-26T10:30:00Z",
    href: "https://example.com/leilao29",
    website: "Leiloeira NORTE",
    website_image: "https://images.pexels.com/photos/3184319/pexels-photo-3184319.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-14T09:00:00Z",
    data_scraped: "2024-12-14T09:00:00Z",
    docs: ["Matrícula"],
    format: "Online"
  },

  // Mais veículos para completar as categorias

  // Mais carros de diferentes marcas
  {
    _id: "30",
    type: "vehicle",
    image: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800",
    vehicle_type: "Carro",
    brand: "Ford",
    model: "Focus",
    color: "Cinza",
    year: 2018,
    city: "Brasília",
    state: "DF",
    initial_bid_value: 32000,
    appraised_value: 42000,
    origin: "Extrajudicial",
    stage: "1ª Praça",
    end_date: "2024-12-25T15:00:00Z",
    href: "https://example.com/leilao30",
    website: "Leiloeira CAPITAL",
    website_image: "https://images.pexels.com/photos/3184320/pexels-photo-3184320.jpeg?auto=compress&cs=tinysrgb&w=200",
    updated: "2024-12-16T16:00:00Z",
    data_scraped: "2024-12-16T16:00:00Z",
    docs: ["Documento do Veículo", "Manual"],
    format: "Online"
  }
];

export function getAuctionsByCategory(
  category: Category,
  type?: string,
  filters?: Filters,
  sort?: SortOption,
  searchQuery?: string
): { auctions: Auction[]; totalSites: number; newAuctions: number } {
  const now = new Date();
  
  // Filter by category and active auctions (end_date >= now)
  let filteredAuctions = mockAuctions.filter(auction => {
    const endDate = new Date(auction.end_date);
    const isActive = endDate >= now;
    const matchesCategory = category === 'imoveis' ? auction.type === 'property' : auction.type === 'vehicle';
    
    if (!isActive || !matchesCategory) return false;

    // Filter by specific type if provided
    if (type && type !== 'todos') {
      if (category === 'veiculos') {
        // Map vehicle types
        const typeMap: Record<string, string[]> = {
          'carros': ['Carro'],
          'motos': ['Moto'],
          'caminhoes': ['Caminhão'],
          'onibus': ['Ônibus'],
          'maquinas': ['Máquina'],
          'apoio': ['Reboque'],
          'embarcacoes': ['Embarcação'],
          'recreativos': ['Recreativo'],
          'nao-informado': ['Não Informado']
        };
        
        const allowedTypes = typeMap[type];
        if (allowedTypes && !allowedTypes.includes(auction.vehicle_type || '')) {
          return false;
        }
      } else {
        // Map property types
        const typeMap: Record<string, string[]> = {
          'apartamentos': ['Apartamento'],
          'casas': ['Casa'],
          'comerciais': ['Comercial'],
          'compactos': ['Compacto'],
          'condominios': ['Condomínio'],
          'galpoes': ['Galpão'],
          'garagem': ['Garagem'],
          'hospedagem': ['Hospedagem'],
          'industriais': ['Industrial'],
          'mistos': ['Misto'],
          'predios': ['Prédio'],
          'rurais': ['Rural'],
          'terrenos-e-lotes': ['Terreno'],
          'nao-informado': ['Não Informado']
        };
        
        const allowedTypes = typeMap[type];
        if (allowedTypes && !allowedTypes.includes(auction.property_type || '')) {
          return false;
        }
      }
    }
    
    return true;
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
      if (filters.state && filters.state !== "all" && auction.state !== filters.state) {
        return false;
      }

      // City filter
      if (filters.city && filters.city !== "all" && auction.city !== filters.city) {
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
        if (filters.brand && filters.brand !== "all" && auction.brand !== filters.brand) {
          return false;
        }

        // Model filter
        if (filters.model && filters.model !== "all" && auction.model !== filters.model) {
          return false;
        }

        // Color filter
        if (filters.color && filters.color !== "all" && auction.color !== filters.color) {
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
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const newAuctions = filteredAuctions.filter(auction => 
    new Date(auction.updated) >= twentyFourHoursAgo
  ).length;

  const uniqueSites = new Set(filteredAuctions.map(auction => auction.website));
  const totalSites = uniqueSites.size;

  return {
    auctions: filteredAuctions,
    totalSites,
    newAuctions
  };
}