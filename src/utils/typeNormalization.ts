// Slugs oficiais de veículos - NOVA ORDEM SEM SUCATA
export const VEHICLE_TYPES = [
  'todos',
  'carros',
  'motos',
  'caminhoes',
  'onibus',
  'maquinas',
  'apoio', // Mudou de 'reboques' para 'apoio'
  'embarcacoes',
  'recreativos',
  'nao-informado'
] as const;

// Slugs oficiais de propriedades
export const PROPERTY_TYPES = [
  'todos',
  'apartamentos',
  'casas',
  'comerciais',
  'compactos',
  'condominios',
  'galpoes',
  'garagem',
  'hospedagem',
  'industriais',
  'mistos',
  'predios',
  'rurais',
  'terrenos-e-lotes', // Mudou de 'terrenos' para 'terrenos-e-lotes'
  'nao-informado'
] as const;

export type VehicleType = typeof VEHICLE_TYPES[number];
export type PropertyType = typeof PROPERTY_TYPES[number];

/**
 * Normaliza o tipo de veículo para um dos slugs oficiais
 * Qualquer valor inválido retorna 'nao-informado'
 */
export function normalizeVehicleType(type: string | null | undefined): VehicleType {
  if (!type || typeof type !== 'string') {
    return 'nao-informado';
  }
  
  const normalizedType = type.toLowerCase().trim();
  
  // Mapeamento para compatibilidade com slugs antigos
  if (normalizedType === 'reboques') {
    return 'apoio';
  }
  
  // Redirecionar 'sucata' para 'nao-informado' já que foi removido
  if (normalizedType === 'sucata') {
    return 'nao-informado';
  }
  
  if (VEHICLE_TYPES.includes(normalizedType as VehicleType)) {
    return normalizedType as VehicleType;
  }
  
  return 'nao-informado';
}

/**
 * Normaliza o tipo de propriedade para um dos slugs oficiais
 * Qualquer valor inválido retorna 'nao-informado'
 */
export function normalizePropertyType(type: string | null | undefined): PropertyType {
  if (!type || typeof type !== 'string') {
    return 'nao-informado';
  }
  
  const normalizedType = type.toLowerCase().trim();
  
  // Mapeamento para compatibilidade com slug antigo
  if (normalizedType === 'terrenos') {
    return 'terrenos-e-lotes';
  }
  
  if (PROPERTY_TYPES.includes(normalizedType as PropertyType)) {
    return normalizedType as PropertyType;
  }
  
  return 'nao-informado';
}

/**
 * Valida se um tipo de veículo é válido
 */
export function isValidVehicleType(type: string): type is VehicleType {
  // Aceitar tanto o slug novo quanto os antigos para compatibilidade
  if (type === 'reboques') return true;
  if (type === 'sucata') return true; // Redirecionar para 'nao-informado'
  return VEHICLE_TYPES.includes(type as VehicleType);
}

/**
 * Valida se um tipo de propriedade é válido
 */
export function isValidPropertyType(type: string): type is PropertyType {
  // Aceitar tanto o slug novo quanto o antigo para compatibilidade
  if (type === 'terrenos') return true;
  return PROPERTY_TYPES.includes(type as PropertyType);
}

/**
 * Obtém o label amigável para um tipo de veículo
 */
export function getVehicleTypeLabel(type: VehicleType): string {
  const labels: Record<VehicleType, string> = {
    'todos': 'Todos',
    'carros': 'Carros',
    'motos': 'Motos',
    'caminhoes': 'Caminhões',
    'onibus': 'Ônibus',
    'maquinas': 'Máquinas',
    'apoio': 'Apoio', // Mudou de 'Reboques' para 'Apoio'
    'embarcacoes': 'Embarcações',
    'recreativos': 'Recreativos',
    'nao-informado': 'Não Informado'
  };
  
  return labels[type];
}

/**
 * Obtém o label amigável para um tipo de propriedade
 */
export function getPropertyTypeLabel(type: PropertyType): string {
  const labels: Record<PropertyType, string> = {
    'todos': 'Todos',
    'apartamentos': 'Apartamentos',
    'casas': 'Casas',
    'comerciais': 'Comerciais',
    'compactos': 'Compactos',
    'condominios': 'Condomínios',
    'galpoes': 'Galpões',
    'garagem': 'Garagem',
    'hospedagem': 'Hospedagem',
    'industriais': 'Industriais',
    'mistos': 'Mistos',
    'predios': 'Prédios',
    'rurais': 'Rurais',
    'terrenos-e-lotes': 'Terrenos e Lotes', // Mudou de 'Terrenos' para 'Terrenos e Lotes'
    'nao-informado': 'Não Informado'
  };
  
  return labels[type];
}