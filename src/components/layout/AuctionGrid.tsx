import React from 'react';
import { Auction, ViewMode } from '../../types/auction';
import { AuctionCard } from '../AuctionCard';

interface AuctionGridProps {
  auctions: Auction[];
  viewMode: ViewMode;
}

export const AuctionGrid: React.FC<AuctionGridProps> = ({ auctions, viewMode }) => {
  return (
    <div className={
      viewMode === 'horizontal'
        ? 'space-y-3 w-full min-h-[400px]'
        : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 w-full min-h-[400px]'
    }>
      {auctions.map((auction) => (
        <AuctionCard
          key={auction._id}
          auction={auction}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};