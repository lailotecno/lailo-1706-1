import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Car, 
  Bike, 
  Truck, 
  Bus, 
  Ship, 
  Wrench, 
  Home, 
  Building, 
  TreePine, 
  Store, 
  Warehouse, 
  Mountain, 
  Building2, 
  HelpCircle,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Category } from '../types/auction';
import { 
  VEHICLE_TYPES, 
  PROPERTY_TYPES, 
  VehicleType, 
  PropertyType,
  getVehicleTypeLabel,
  getPropertyTypeLabel,
  isValidVehicleType,
  isValidPropertyType
} from '../utils/typeNormalization';

interface TypeNavigationTabsProps {
  category: Category;
}

interface TabItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  route: string;
}

// 🚀 OTIMIZAÇÃO: React.memo para evitar re-renderizações desnecessárias
export const TypeNavigationTabs: React.FC<TypeNavigationTabsProps> = React.memo(({ category }) => {
  const navigate = useNavigate();
  const { tipo } = useParams<{ tipo: string }>();
  
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  // 🚀 OTIMIZAÇÃO: Memoizar normalização do tipo atual
  const getCurrentType = useCallback((): string => {
    if (!tipo) return 'todos';
    
    if (category === 'veiculos') {
      // Mapear slugs antigos para novos se necessário
      if (tipo === 'reboques') return 'apoio';
      if (tipo === 'sucata') return 'nao-informado'; // Redirecionar sucata para não informado
      return isValidVehicleType(tipo) ? tipo : 'todos';
    } else {
      // Mapear slug antigo para novo se necessário
      if (tipo === 'terrenos') return 'terrenos-e-lotes';
      return isValidPropertyType(tipo) ? tipo : 'todos';
    }
  }, [tipo, category]);

  const currentType = getCurrentType();

  // Redirecionar se o tipo for inválido ou se for um slug antigo
  useEffect(() => {
    if (tipo && tipo !== currentType) {
      navigate(`/buscador/${category}/${currentType}`, { replace: true });
    }
  }, [tipo, currentType, category, navigate]);

  // 🚀 OTIMIZAÇÃO: Memoizar ícones para evitar recriações
  const vehicleIcons = useMemo((): Record<VehicleType, React.ComponentType<{ className?: string }>> => ({
    'todos': MoreHorizontal,
    'carros': Car,
    'motos': Bike,
    'caminhoes': Truck,
    'onibus': Bus,
    'maquinas': Wrench,
    'apoio': Truck, // Ícone para 'Apoio' (ex-reboques)
    'embarcacoes': Ship,
    'recreativos': Car,
    'nao-informado': HelpCircle,
  }), []);

  const propertyIcons = useMemo((): Record<PropertyType, React.ComponentType<{ className?: string }>> => ({
    'todos': MoreHorizontal,
    'apartamentos': Building,
    'casas': Home,
    'comerciais': Store,
    'compactos': Building2,
    'condominios': Building,
    'galpoes': Warehouse,
    'garagem': Car,
    'hospedagem': Building,
    'industriais': Warehouse,
    'mistos': Building2,
    'predios': Building,
    'rurais': TreePine,
    'terrenos-e-lotes': Mountain, // Ícone para 'Terrenos e Lotes'
    'nao-informado': HelpCircle,
  }), []);

  // 🚀 OTIMIZAÇÃO: Memoizar tabs para evitar recriações desnecessárias
  const tabs = useMemo((): TabItem[] => {
    if (category === 'veiculos') {
      return VEHICLE_TYPES.map(type => ({
        id: type,
        label: getVehicleTypeLabel(type),
        icon: vehicleIcons[type],
        route: `/buscador/veiculos/${type}`
      }));
    } else {
      return PROPERTY_TYPES.map(type => ({
        id: type,
        label: getPropertyTypeLabel(type),
        icon: propertyIcons[type],
        route: `/buscador/imoveis/${type}`
      }));
    }
  }, [category, vehicleIcons, propertyIcons]);

  // 🚀 OTIMIZAÇÃO: Memoizar handlers de scroll
  const handleScrollLeft = useCallback(() => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  }, []);

  const handleScrollRight = useCallback(() => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  }, []);

  const handleTabClick = useCallback((route: string) => {
    navigate(route);
  }, [navigate]);

  // 🚀 OTIMIZAÇÃO: Memoizar componente TabButton
  const TabButton = React.memo<{ tab: TabItem; isActive: boolean }>(({ tab, isActive }) => {
    const handleClick = useCallback(() => {
      handleTabClick(tab.route);
    }, [tab.route]);

    return (
      <button
        onClick={handleClick}
        className={`
          px-3 py-2 text-sm font-medium transition-all duration-200 
          whitespace-nowrap flex-shrink-0 rounded-xl
          ${isActive
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }
        `}
      >
        {tab.label}
      </button>
    );
  });

  TabButton.displayName = 'TabButton';

  return (
    <div className="w-full">
      {/* Desktop version - SEMPRE VISÍVEL a partir de 768px */}
      <div className="hidden min-[768px]:block">
        <div className="relative w-full">
          {/* Container das tabs com scroll - SEM PADDING À ESQUERDA */}
          <div 
            ref={tabsContainerRef}
            className="absolute inset-0 flex flex-nowrap overflow-x-auto scrollbar-hide gap-2 py-3"
            style={{
              /* Máscara CSS para esconder o conteúdo que transborda à direita */
              maskImage: 'linear-gradient(to right, black 0%, black calc(100% - 100px), transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, black 0%, black calc(100% - 100px), transparent 100%)'
            }}
          >
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                tab={tab}
                isActive={currentType === tab.id}
              />
            ))}
          </div>
          
          {/* Botões de scroll - POSIÇÃO ABSOLUTA FIXA no canto direito */}
          <div className="absolute top-0 right-0 bottom-0 w-24 flex items-center justify-end gap-1 bg-gradient-to-l from-white via-white/95 to-transparent z-20 pr-2">
            <button
              onClick={handleScrollLeft}
              className="w-8 h-8 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow active:scale-95"
              title="Rolar para a esquerda"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={handleScrollRight}
              className="w-8 h-8 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow active:scale-95"
              title="Rolar para a direita"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          {/* Espaçador para manter a altura do container */}
          <div className="h-14 w-full"></div>
        </div>
      </div>

      {/* Mobile version - APENAS abaixo de 768px - SEM PADDING À ESQUERDA */}
      <div className="max-[767px]:block min-[768px]:hidden">
        <div className="flex overflow-x-auto scrollbar-hide gap-2 py-3" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {tabs.map((tab) => (
            <div key={tab.id} className="flex-shrink-0">
              <TabButton
                tab={tab}
                isActive={currentType === tab.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

// 🚀 OTIMIZAÇÃO: Definir displayName para debugging
TypeNavigationTabs.displayName = 'TypeNavigationTabs';