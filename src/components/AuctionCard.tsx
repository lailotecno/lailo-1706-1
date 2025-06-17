import React, { useState, useMemo, useCallback } from 'react';
import { Auction, ViewMode } from '../types/auction';
import { AuctionCardHorizontalBase } from './cards/AuctionCardHorizontalBase';
import { AuctionCardHorizontalVehicle } from './cards/AuctionCardHorizontalVehicle';
import { AuctionCardVerticalBase } from './cards/AuctionCardVerticalBase';
import { AuctionCardVerticalVehicle } from './cards/AuctionCardVerticalVehicle';
import { DateUtils } from '../utils/dateUtils';

interface AuctionCardProps {
  auction: Auction;
  viewMode: ViewMode;
}

// 🚀 OTIMIZAÇÃO: React.memo para evitar re-renderizações desnecessárias
export const AuctionCard: React.FC<AuctionCardProps> = React.memo(({ auction, viewMode }) => {
  // 🛡️ CORREÇÃO: Verificação defensiva para evitar erro #130
  if (!auction || typeof auction !== 'object') {
    return null;
  }

  // Verificar propriedades essenciais
  if (!auction._id || !auction.type || !auction.image) {
    return null;
  }

  const [isFavorited, setIsFavorited] = useState(false);

  // 🚀 OTIMIZAÇÃO: Memoizar formatação de moeda
  const formatCurrency = useCallback((amount: number) => {
    if (typeof amount !== 'number' || isNaN(amount)) {
      return 'R$ 0';
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }, []);

  // 🚀 OTIMIZAÇÃO: Memoizar formatação de tempo usando DateUtils
  const formatTimeRemaining = useCallback((endDate: string) => {
    return DateUtils.formatTimeRemaining(endDate);
  }, []);

  // 🚀 OTIMIZAÇÃO: Memoizar cálculo de desconto
  const discount = useMemo(() => {
    if (!auction.appraised_value || typeof auction.appraised_value !== 'number' || 
        !auction.initial_bid_value || typeof auction.initial_bid_value !== 'number' ||
        auction.appraised_value <= auction.initial_bid_value) {
      return null;
    }
    const discountValue = ((auction.appraised_value - auction.initial_bid_value) / auction.appraised_value) * 100;
    return discountValue > 0 ? Math.round(discountValue) : null;
  }, [auction.appraised_value, auction.initial_bid_value]);

  // 🚀 OTIMIZAÇÃO: Memoizar verificação de "novo" usando DateUtils
  const isNew = useMemo(() => {
    return DateUtils.isWithinLast24Hours(auction.data_scraped);
  }, [auction.data_scraped]);

  // 🚀 OTIMIZAÇÃO: Memoizar handlers
  const handleToggleFavorite = useCallback(() => {
    setIsFavorited(prev => !prev);
  }, []);

  const handleLink = useCallback(() => {
    if (auction.href) {
      window.open(auction.href, '_blank');
    }
  }, [auction.href]);

  // 🚀 OTIMIZAÇÃO: Memoizar dados derivados
  const derivedData = useMemo(() => {
    const isVehicle = auction.type === 'vehicle';
    
    // Create tags array with only origem and etapa
    const tags = [];
    if (auction.origin) tags.push(auction.origin);
    if (auction.stage) tags.push(auction.stage);

    // Mock area for properties (this would come from database)
    const mockArea = isVehicle ? undefined : auction.useful_area_m2 ? `${auction.useful_area_m2}m²` : undefined;

    // Calculate discount text
    const discountText = discount ? `${discount}% OFF` : undefined;

    return {
      isVehicle,
      tags,
      mockArea,
      discountText
    };
  }, [auction.type, auction.origin, auction.stage, auction.useful_area_m2, discount]);

  // 🚀 OTIMIZAÇÃO: Memoizar props comuns
  const commonProps = useMemo(() => ({
    price: formatCurrency(auction.initial_bid_value || 0),
    imageUrl: auction.image || '',
    isFavorited,
    onToggleFavorite: handleToggleFavorite,
    onLink: handleLink,
    isNew: isNew,
    date: formatTimeRemaining(auction.end_date),
    tags: derivedData.tags,
    discount: derivedData.discountText,
  }), [
    auction.initial_bid_value,
    auction.image,
    auction.end_date,
    isFavorited,
    isNew,
    derivedData.tags,
    derivedData.discountText,
    formatCurrency,
    formatTimeRemaining,
    handleToggleFavorite,
    handleLink
  ]);

  if (viewMode === 'horizontal') {
    if (derivedData.isVehicle) {
      return (
        <AuctionCardHorizontalVehicle
          {...commonProps}
          brand={auction.brand || "Não informado"}
          model={auction.model || "Não informado"}
          color={auction.color || "Não informado"}
          year={auction.year?.toString() || "N/A"}
          cityState={`${auction.city || 'N/A'}/${auction.state || 'N/A'}`}
        />
      );
    } else {
      return (
        <AuctionCardHorizontalBase
          {...commonProps}
          titleLeft={auction.property_type || "Imóvel"}
          subtitle={`${auction.property_address || 'Endereço não informado'} – ${auction.city || 'N/A'}, ${auction.state || 'N/A'}`}
          area={derivedData.mockArea}
          appraisedValue={auction.appraised_value ? formatCurrency(auction.appraised_value) : undefined}
        />
      );
    }
  } else {
    if (derivedData.isVehicle) {
      return (
        <AuctionCardVerticalVehicle
          {...commonProps}
          brand={auction.brand || "Não informado"}
          model={auction.model || "Não informado"}
          color={auction.color || "Não informado"}
          year={auction.year?.toString() || "N/A"}
          cityState={`${auction.city || 'N/A'}/${auction.state || 'N/A'}`}
        />
      );
    } else {
      return (
        <AuctionCardVerticalBase
          {...commonProps}
          titleLeft={auction.property_type || "Imóvel"}
          subtitle={`${auction.property_address || 'Endereço não informado'} – ${auction.city || 'N/A'}, ${auction.state || 'N/A'}`}
          area={derivedData.mockArea}
          appraisedValue={auction.appraised_value ? formatCurrency(auction.appraised_value) : undefined}
        />
      );
    }
  }
});

// 🚀 OTIMIZAÇÃO: Definir displayName para debugging
AuctionCard.displayName = 'AuctionCard';