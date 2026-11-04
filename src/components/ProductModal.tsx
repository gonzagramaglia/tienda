'use client'

import { useEffect } from 'react'
import { Product } from '@/types'
import { StatusBadge } from './StatusBadge'
import { ProductGallery } from './ProductGallery'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { buildMercadoLibreLink } from '@/lib/mercadolibre'

interface ProductModalProps {
  product: Product | null
  whatsappNumber: string
  onClose: () => void
}

export function ProductModal({ product, whatsappNumber, onClose }: ProductModalProps) {
  useEffect(() => {
    if (!product) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    // Bloquear scroll de fondo
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [product, onClose])

  if (!product) return null

  const isSold = product.status === 'vendido'
  const formattedPrice = `${product.currency === 'USD' ? 'US$' : '$'} ${new Intl.NumberFormat('es-AR').format(product.price)}`

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
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-ui-border-base max-h-[92vh] flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-ui-bg-subtle/90 hover:bg-ui-border-base text-ui-fg-base flex items-center justify-center transition-colors shadow-sm"
        >
          <span className="text-xl leading-none">&times;</span>
        </button>

        {/* Contenido scrolleable */}
        <div className="overflow-y-auto p-5 sm:p-8">
          <div className="flex flex-col small:flex-row small:items-start gap-y-6 small:gap-x-8">
            {/* Galería de imágenes */}
            <div className="w-full small:w-1/2">
              <ProductGallery images={product.images} title={product.title} />
            </div>

            {/* Info y Acciones */}
            <div className="w-full small:w-1/2 flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-2">
                  <StatusBadge status={product.status} />
                  {product.condition && (
                    <span className="text-[11px] text-ui-fg-muted uppercase tracking-wider">
                      {product.condition}
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-normal text-ui-fg-base leading-tight pr-6">
                  {product.title}
                </h2>

                <div className="text-xl font-semibold text-ui-fg-base">
                  {formattedPrice}
                </div>

                {product.description && (
                  <p className="text-sm text-ui-fg-subtle whitespace-pre-line leading-relaxed pt-2 border-t border-ui-border-base mt-2">
                    {product.description}
                  </p>
                )}
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col gap-y-2 pt-4 border-t border-ui-border-base mt-2">
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
          </div>
        </div>
      </div>
    </div>
  )
}
