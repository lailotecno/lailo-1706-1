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
  tags,
  date,
  imageUrl,
  isFavorited = false,
  onToggleFavorite,
  onLink,
  discount,
  isNew,
  area,
  appraisedValue,
}: AuctionCardHorizontalBaseProps) {
  return (
    <div className="group w-full bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300 p-3 md:p-4 cursor-pointer">
      <div className="flex gap-3 md:gap-4 mb-3">
        {/* CORREÇÃO LAYOUT SHIFT: Container com aspect-ratio fixo */}
        <div className="relative w-20 md:w-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
          <div className="aspect-[4/3] w-full">
            <img
              src={imageUrl}
              alt={titleLeft}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          {/* Badge "Novo" sempre presente no DOM, mas controlado por visibilidade */}
          <div className={`absolute top-1.5 left-1.5 md:top-2 md:left-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-[10px] font-bold uppercase px-1.5 py-0.5 md:px-2 md:py-0.5 rounded-md shadow-sm transition-opacity duration-200 ${
            isNew ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            Novo
          </div>
        </div>

        <div className="flex-1 space-y-1 min-w-0">
          {badge && (
            <span className="inline-block text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 md:px-2.5 md:py-0.5 rounded-full font-medium">
              {badge}
            </span>
          )}

          <div className="flex items-start justify-between gap-2">
            {/* CORREÇÃO: Altura FIXA em vez de mínima para eliminar layout shift */}
            <div className="flex-1 min-w-0 h-[68px] flex flex-col justify-between">
              {/* CORREÇÃO: Título e botão favoritar na mesma linha */}
              <div className="flex items-start justify-between gap-2 flex-shrink-0">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
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
                  
                  <p className="text-[11px] md:text-xs text-gray-600 line-clamp-1 leading-tight">
                    {subtitle}
                  </p>
                </div>

                {/* CORREÇÃO: Botão favoritar alinhado com o título */}
                {onToggleFavorite && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleFavorite()
                    }}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200 active:scale-95 flex-shrink-0"
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

              {/* CORREÇÃO: Posição fixa na parte inferior + DESKTOP: +4px de espaçamento */}
              <div className="flex items-baseline gap-1.5 flex-shrink-0 mt-1 md:mt-2">
                <span className="text-[15px] md:text-lg font-bold text-gray-900 leading-tight">
                  {price}
                </span>
                {appraisedValue && (
                  <span className="text-[10px] md:text-xs text-gray-500">
                    {appraisedValue}
                  </span>
                )}
                {discount && (
                  <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-[10px] md:text-xs font-bold uppercase px-1.5 py-0.5 md:px-2 md:py-0.5 rounded-md shadow-sm">
                    {discount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-100 mb-3"></div>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {tags && tags.map((tag, index) => (
            <span 
              key={index} 
              className="text-[10px] md:text-xs bg-gray-50 text-gray-700 px-2 py-1 md:px-2.5 md:py-1 rounded-md font-medium border border-gray-100"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {date && (
            <div className="text-[10px] md:text-xs text-gray-500 font-medium">
              {date}
            </div>
          )}
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
  )
}