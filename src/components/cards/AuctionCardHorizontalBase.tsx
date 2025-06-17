import { ArrowUpRight, Heart } from 'lucide-react'

interface AuctionCardHorizontalBaseProps {
  titleLeft: string
  titleRight?: string
  subtitle: string
  price: string
  badge?: string
  tags?: string[]
  date?: string
  imageUrl: string
  isFavorited?: boolean
  onToggleFavorite?: () => void
  onLink?: () => void
  discount?: string
  isNew?: boolean
  area?: string
  appraisedValue?: string
}

export function AuctionCardHorizontalBase({
  titleLeft,
  titleRight,
  subtitle,
  price,
  badge,
  tags = [],
  date,
  imageUrl,
  isFavorited = false,
  onToggleFavorite,
  onLink,
  discount,
  isNew = false,
  area,
  appraisedValue,
}: AuctionCardHorizontalBaseProps) {
  return (
    <div className="group w-full bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300 p-3 md:p-4 cursor-pointer">
      <div className="flex gap-3 md:gap-4 mb-3">
        {/* Imagem com aspect-ratio fixo */}
        <div className="relative w-20 md:w-24 aspect-[4/3] rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
          <img
            src={imageUrl}
            alt={titleLeft}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Badge "Novo" - sempre presente no DOM */}
          <div className={`absolute top-1.5 left-1.5 md:top-2 md:left-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-[10px] font-bold uppercase px-1.5 py-0.5 md:px-2 md:py-0.5 rounded-md shadow-sm transition-opacity duration-200 ${
            isNew ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            Novo
          </div>
        </div>

        {/* Conteúdo textual com altura fixa */}
        <div className="flex-1 min-w-0 h-[68px] flex flex-col justify-between">
          {/* Badge - wrapper com altura fixa */}
          <div className="h-[16px] flex-shrink-0">
            {badge && (
              <span className="inline-block text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 md:px-2.5 md:py-0.5 rounded-full font-medium">
                {badge}
              </span>
            )}
          </div>

          {/* Linha 1: Título + Área */}
          <div className="h-[16px] flex items-center gap-1.5 flex-shrink-0">
            <h3 className="text-[13px] md:text-sm font-bold text-gray-900 leading-tight flex-shrink-0">
              {titleLeft}
            </h3>
            {area && (
              <>
                <span className="text-gray-300 font-light text-[10px] md:text-xs">•</span>
                <span className="text-[10px] md:text-xs text-gray-500 font-medium whitespace-nowrap">
                  {area}
                </span>
              </>
            )}
            {titleRight && (
              <>
                <span className="text-gray-300 font-light text-[10px] md:text-xs">•</span>
                <span className="text-[10px] md:text-xs text-gray-500 font-medium whitespace-nowrap">
                  {titleRight}
                </span>
              </>
            )}
          </div>
          
          {/* Linha 2: Subtítulo */}
          <div className="h-[14px] flex-shrink-0">
            <p className="text-[11px] md:text-xs text-gray-600 line-clamp-1 leading-tight">
              {subtitle}
            </p>
          </div>

          {/* Linha 3: Preço + Desconto */}
          <div className="h-[18px] flex items-baseline gap-1.5 flex-shrink-0">
            <span className="text-[15px] md:text-lg font-bold text-gray-900 leading-tight">
              {price}
            </span>
            {/* Wrapper para valor avaliado - sempre presente */}
            <div className="h-[14px] flex items-center">
              {appraisedValue && (
                <span className="text-[10px] md:text-xs text-gray-500">
                  {appraisedValue}
                </span>
              )}
            </div>
            {/* Wrapper para desconto - sempre presente */}
            <div className="h-[18px] flex items-center">
              {discount && (
                <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-[10px] md:text-xs font-bold uppercase px-1.5 py-0.5 md:px-2 md:py-0.5 rounded-md shadow-sm">
                  {discount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Botão de favorito - posição fixa */}
        <div className="w-[36px] h-[36px] flex-shrink-0 flex items-start justify-center">
          {onToggleFavorite && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggleFavorite()
              }}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200 active:scale-95"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isFavorited
                    ? 'fill-blue-500 text-blue-500'
                    : 'text-gray-400 hover:text-blue-500'
                }`}
              />
            </button>
          )}
        </div>
      </div>

      {/* Divider - sempre presente */}
      <div className="h-px bg-gray-100 mb-3"></div>

      {/* Footer com altura fixa */}
      <div className="h-[24px] flex items-center justify-between">
        {/* Tags - wrapper com altura fixa */}
        <div className="flex-1 h-[24px] flex items-center">
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 2).map((tag, index) => (
              <span 
                key={index} 
                className="text-[10px] md:text-xs bg-gray-50 text-gray-700 px-2 py-1 md:px-2.5 md:py-1 rounded-md font-medium border border-gray-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Data e botão - wrapper com altura fixa */}
        <div className="h-[24px] flex items-center gap-2 flex-shrink-0">
          {/* Wrapper para data - sempre presente */}
          <div className="h-[24px] flex items-center">
            {date && (
              <div className="text-[10px] md:text-xs text-gray-500 font-medium">
                {date}
              </div>
            )}
          </div>
          {/* Wrapper para botão - sempre presente */}
          <div className="w-[28px] h-[24px] flex items-center justify-center">
            {onLink && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onLink()
                }}
                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 active:scale-95"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}