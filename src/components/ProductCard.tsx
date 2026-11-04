import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'
import { StatusBadge } from './StatusBadge'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { buildMercadoLibreLink } from '@/lib/mercadolibre'
import { urlForImage } from '@/sanity/image'

interface ProductCardProps {
  product: Product
  whatsappNumber: string
  onSelect?: (product: Product) => void
}

export function ProductCard({ product, whatsappNumber, onSelect }: ProductCardProps) {
  const isSold = product.status === 'vendido'
  const coverImage = product.images?.[0]
  const imageUrl = coverImage ? urlForImage(coverImage) : '/placeholder.svg'

  const formattedPrice = `${product.currency === 'USD' ? 'US$' : '$'} ${new Intl.NumberFormat('es-AR').format(product.price)}`

  const handleSelect = (e: React.MouseEvent) => {
    if (onSelect) {
      e.preventDefault()
      onSelect(product)
    }
  }

  const whatsappUrl = buildWhatsAppLink({
    phoneNumber: whatsappNumber,
    productTitle: product.title,
    price: product.price,
    currency: product.currency,
    customMessage: product.whatsappCustomMessage,
  })

  const { url: mlUrl } = buildMercadoLibreLink({
    productTitle: product.title,
    mercadolibreUrl: product.mercadolibreUrl,
  })

  return (
    <div className={`group flex flex-col ${isSold ? 'opacity-60' : ''}`}>
      {/* Imagen */}
      <Link
        href={`/producto/${product.slug.current}`}
        onClick={handleSelect}
        className="relative w-full overflow-hidden bg-ui-bg-subtle border border-ui-border-base rounded-large aspect-[1/1] sm:aspect-[11/14] block cursor-pointer"
      >
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 z-10">
          <StatusBadge status={product.status} />
        </div>
      </Link>

      {/* Info: Nombre y Precio */}
      <div className="flex items-baseline justify-between gap-x-2 mt-3">
        <Link
          href={`/producto/${product.slug.current}`}
          onClick={handleSelect}
          className="text-ui-fg-base text-sm font-normal line-clamp-1 hover:opacity-75 transition-opacity cursor-pointer"
        >
          {product.title}
        </Link>
        <span className="text-ui-fg-base font-semibold text-sm whitespace-nowrap">
          {formattedPrice}
        </span>
      </div>

      {/* Dos Botones */}
      <div className="flex flex-col gap-y-2 mt-4 pt-3 border-t border-ui-border-base">
        <a
          href={isSold ? undefined : whatsappUrl}
          target={isSold ? undefined : '_blank'}
          rel={isSold ? undefined : 'noopener noreferrer'}
          aria-disabled={isSold}
          className={`w-full h-10 px-4 rounded-rounded text-small-semi flex items-center justify-center transition-colors ${
            isSold
              ? 'bg-ui-bg-disabled text-ui-fg-disabled cursor-not-allowed border border-ui-border-base'
              : 'bg-ui-fg-base hover:bg-black text-white shadow-sm'
          }`}
        >
          {isSold ? 'Producto vendido' : 'Coordinar compra por WhatsApp'}
        </a>

        <a
          href={mlUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-10 px-4 rounded-rounded text-small-semi bg-white hover:bg-ui-bg-subtle text-ui-fg-base border border-ui-border-base flex items-center justify-center transition-colors"
          title="Comparar precio en Mercado Libre"
        >
          Comparar precio en Mercado Libre
        </a>
      </div>
    </div>
  )
}
