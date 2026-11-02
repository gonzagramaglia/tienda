import Link from 'next/link'
import { SiteSettings } from '@/types'

interface FooterProps {
  settings: SiteSettings
}

export function Footer({ settings }: FooterProps) {
  const cleanPhone = settings.whatsappNumber.replace(/\D/g, '')

  return (
    <footer className="border-t border-ui-border-base w-full bg-white mt-6 sm:mt-8">
      <div className="content-container flex flex-col w-full">
        {/* Cuerpo principal del Footer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10 sm:py-12">
          {/* Columna 1: Presentación de Gonza */}
          <div className="md:col-span-5 flex flex-col gap-y-3">
            <Link
              href="/"
              className="text-sm font-semibold tracking-[0.16em] text-ui-fg-base hover:text-black uppercase"
            >
              {settings.title}
            </Link>
            <p className="text-small-regular text-ui-fg-subtle max-w-sm leading-relaxed">
              {settings.subtitle || 'Cosas personales cuidadas y en excelente estado. Venta directa sin comisiones ni intermediarios.'}
            </p>
            <div className="flex items-center gap-2 text-small-regular text-ui-fg-muted mt-1">
              <span>Zona Ciudad Universitaria, Córdoba Capital</span>
            </div>
          </div>

          {/* Columna 2: Modalidad y Confianza */}
          <div className="md:col-span-4 flex flex-col gap-y-2">
            <span className="text-small-semi text-ui-fg-base uppercase tracking-wider">
              Cómo funciona
            </span>
            <ul className="text-small-regular text-ui-fg-subtle space-y-2 mt-1">
              <li className="flex items-start gap-2">
                <span className="text-ui-fg-base font-semibold">✓</span>
                <span><strong>Retiro en persona:</strong> Nos encontramos por Ciudad Universitaria (o punto a convenir en Cba).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ui-fg-base font-semibold">✓</span>
                <span><strong>Tranquilidad:</strong> Revisás y probás el artículo antes de pagarlo.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ui-fg-base font-semibold">✓</span>
                <span><strong>Medios de pago:</strong> Efectivo o transferencia al momento de retirar.</span>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto directo */}
          <div className="md:col-span-3 flex flex-col gap-y-2">
            <span className="text-small-semi text-ui-fg-base uppercase tracking-wider">
              Contacto directo
            </span>
            <p className="text-small-regular text-ui-fg-subtle mt-1">
              Escribime por WhatsApp para coordinar día y horario:
            </p>
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('¡Hola Gonza! Vi tu tienda online.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center mt-2 px-3.5 py-2 rounded-rounded bg-ui-bg-subtle hover:bg-ui-border-base border border-ui-border-base text-ui-fg-base text-small-semi transition-colors w-fit"
            >
              +54 9 351 549-0431
            </a>
            <span className="text-[11px] text-ui-fg-muted mt-1">Respondo durante el día</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
