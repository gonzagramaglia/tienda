import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, getProducts, getSiteSettings } from '@/sanity/client'
import { ProductGallery } from '@/components/ProductGallery'
import { StatusBadge } from '@/components/StatusBadge'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { buildMercadoLibreLink } from '@/lib/mercadolibre'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return { title: 'Producto no encontrado' }
  }

  const formattedPrice = `${product.currency === 'USD' ? 'US$' : '$'} ${new Intl.NumberFormat('es-AR').format(product.price)}`

  return {
    title: `${product.title} - ${formattedPrice}`,
    description: product.description || product.title,
  }
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({
    slug: product.slug.current,
  }))
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params
  const [product, settings] = await Promise.all([
    getProductBySlug(slug),
    getSiteSettings(),
  ])

  if (!product) {
    notFound()
  }

  const isSold = product.status === 'vendido'
  const formattedPrice = `${product.currency === 'USD' ? 'US$' : '$'} ${new Intl.NumberFormat('es-AR').format(product.price)}`

  const whatsappUrl = buildWhatsAppLink({
    phoneNumber: settings.whatsappNumber,
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
    <div className="content-container pt-3 sm:pt-4 pb-8 sm:pb-12">
      {/* Volver */}
      <div className="mb-3 sm:mb-4">
        <Link
          href="/"
          className="text-xs text-ui-fg-subtle hover:text-ui-fg-base transition-colors inline-block py-1"
        >
          ← Volver
        </Link>
      </div>

      <div className="flex flex-col small:flex-row small:items-start gap-y-8 small:gap-x-12">
        {/* Galería Central */}
        <div className="w-full flex-1">
          <ProductGallery images={product.images} title={product.title} />
        </div>

        {/* Info y Acciones */}
        <div className="flex flex-col small:sticky small:top-24 small:max-w-[340px] w-full gap-y-6">
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-2">
              <StatusBadge status={product.status} />
              {product.condition && (
                <span className="text-[11px] text-ui-fg-muted uppercase tracking-wider">
                  {product.condition}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-normal text-ui-fg-base leading-tight">
              {product.title}
            </h1>

            <div className="text-xl font-semibold text-ui-fg-base mt-1">
              {formattedPrice}
            </div>

            {product.description && (
              <p className="text-sm text-ui-fg-subtle whitespace-pre-line leading-relaxed pt-2">
                {product.description}
              </p>
            )}
          </div>

          {/* Dos Botones */}
          <div className="flex flex-col gap-y-2 pt-4 border-t border-ui-border-base">
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
  )
}
