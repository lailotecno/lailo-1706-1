import React, { useState } from 'react';
import { Auction, ViewMode } from '../types/auction';
import { AuctionCardHorizontalBase } from './cards/AuctionCardHorizontalBase';
import { AuctionCardHorizontalVehicle } from './cards/AuctionCardHorizontalVehicle';
import { AuctionCardVerticalBase } from './cards/AuctionCardVerticalBase';
import { AuctionCardVerticalVehicle } from './cards/AuctionCardVerticalVehicle';

interface AuctionCardProps {
  auction: Auction;
  viewMode: ViewMode;
}

export const AuctionCard: React.FC<AuctionCardProps> = ({ auction, viewMode }) => {
  // 🛡️ CORREÇÃO: Verificação defensiva para evitar erro #130
  if (!auction || typeof auction !== 'object') {
    console.warn('⚠️ AuctionCard: auction prop é inválido:', auction);
    return null;
  }

  // Verificar propriedades essenciais
  if (!auction._id || !auction.type || !auction.image) {
    console.warn('⚠️ AuctionCard: auction está incompleto:', auction);
    return null;
  }

  const [isFavorited, setIsFavorited] = useState(false);

  const formatCurrency = (amount: number) => {
    if (typeof amount !== 'number' || isNaN(amount)) {
      return 'R$ 0';
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatTimeRemaining = (endDate: string) => {
    if (!endDate) return '0h';
    
    try {
      const now = new Date();
      const end = new Date(endDate);
      
      if (isNaN(end.getTime())) {
        return '0h';
      }
      
      const diff = end.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      if (days > 0) {
        return `${days}d ${hours}h`;
      }
      return `${hours}h`;
    } catch (error) {
      console.warn('⚠️ Erro ao formatar data:', endDate, error);
      return '0h';
    }
  };

  const calculateDiscount = () => {
    if (!auction.appraised_value || typeof auction.appraised_value !== 'number' || 
        !auction.initial_bid_value || typeof auction.initial_bid_value !== 'number' ||
        auction.appraised_value <= auction.initial_bid_value) {
      return null;
    }
    const discount = ((auction.appraised_value - auction.initial_bid_value) / auction.appraised_value) * 100;
    return discount > 0 ? Math.round(discount) : null;
  };

  const isNew = () => {
    if (!auction.data_scraped) return false;
    
    try {
      const now = new Date();
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const scrapedDate = new Date(auction.data_scraped);
      
      if (isNaN(scrapedDate.getTime())) {
        return false;
      }
      
      return scrapedDate >= twentyFourHoursAgo;
    } catch (error) {
      console.warn('⚠️ Erro ao verificar se é novo:', auction.data_scraped, error);
      return false;
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleLink = () => {
    if (auction.href) {
      window.open(auction.href, '_blank');
    }
  };

  const isVehicle = auction.type === 'vehicle';

  // Create tags array with only origem and etapa
  const tags = [];
  if (auction.origin) tags.push(auction.origin);
  if (auction.stage) tags.push(auction.stage);

  // Mock area for properties (this would come from database)
  const mockArea = isVehicle ? undefined : auction.useful_area_m2 ? `${auction.useful_area_m2}m²` : undefined;

  // Calculate discount
  const discount = calculateDiscount();
  const discountText = discount ? `${discount}% OFF` : undefined;

  // Common props for all card types
  const commonProps = {
    price: formatCurrency(auction.initial_bid_value || 0),
    imageUrl: auction.image || '',
    isFavorited,
    onToggleFavorite: handleToggleFavorite,
    onLink: handleLink,
    isNew: isNew(),
    date: formatTimeRemaining(auction.end_date),
    tags: tags,
    discount: discountText,
  };

  if (viewMode === 'horizontal') {
    if (isVehicle) {
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
          area={mockArea}
          appraisedValue={auction.appraised_value ? formatCurrency(auction.appraised_value) : undefined}
        />
      );
    }
  } else {
    if (isVehicle) {
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
          area={mockArea}
          appraisedValue={auction.appraised_value ? formatCurrency(auction.appraised_value) : undefined}
        />
      );
    }
  }
};