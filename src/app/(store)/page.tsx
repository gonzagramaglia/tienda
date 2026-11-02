import { getProducts, getSiteSettings } from '@/sanity/client'
import { CatalogView } from '@/components/CatalogView'

export const revalidate = 60

export default async function HomePage() {
  const [products, settings] = await Promise.all([
    getProducts(),
    getSiteSettings(),
  ])

  return (
    <div className="content-container pt-3 sm:pt-4 pb-4 sm:pb-6">
      {/* Encabezado Venta de Garage */}
      <div className="flex flex-col gap-y-1.5 mb-6 border-b border-ui-border-base pb-5">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-ui-fg-muted">
            Venta de Garage en Ciudad Universitaria
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-ui-fg-base tracking-tight">
          {settings.title}
        </h1>
        <p className="text-sm sm:text-base text-ui-fg-subtle max-w-2xl leading-relaxed pt-0.5">
          {settings.subtitle || 'Artículos personales cuidados en excelente estado. Se prueban y retiran en persona por la zona de Ciudad Universitaria, Córdoba Capital.'}
        </p>
      </div>

      <CatalogView
        products={products}
        whatsappNumber={settings.whatsappNumber}
      />
    </div>
  )
}
