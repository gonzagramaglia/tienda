import Link from 'next/link'
import { SiteSettings } from '@/types'

interface HeaderProps {
  settings: SiteSettings
}

export function Header({ settings }: HeaderProps) {
  const cleanPhone = settings.whatsappNumber.replace(/\D/g, '')

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      {/* Header Principal Medusa Style */}
      <header className="relative h-16 mx-auto border-b duration-200 bg-white/95 backdrop-blur-md border-ui-border-base">
        <nav className="content-container flex items-center justify-between w-full h-full text-small-regular text-ui-fg-subtle">
          {/* Logo / Brand */}
          <div className="flex items-center gap-x-4">
            <Link
              href="/"
              className="text-sm sm:text-base font-semibold tracking-[0.16em] text-ui-fg-base hover:text-black uppercase transition-colors"
            >
              Tienda de Gonza
            </Link>
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-soft bg-ui-bg-subtle text-ui-fg-muted border border-ui-border-base">
              Córdoba
            </span>
          </div>

          {/* Navegación y Botón Contacto Directo */}
          <div className="flex items-center gap-x-4 sm:gap-x-6 h-full justify-end">
            <span className="text-ui-fg-muted text-small-regular hidden sm:inline-block">
              Efectivo o Transferencia
            </span>

            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('¡Hola Gonza! Vi tus productos en la web y quería consultarte.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 px-3 sm:px-4 rounded-rounded bg-ui-fg-base hover:bg-black text-white text-small-semi flex items-center justify-center transition-colors shadow-sm"
            >
              <span className="sm:hidden">Contactar</span>
              <span className="hidden sm:inline">Contacto directo</span>
            </a>
          </div>
        </nav>
      </header>
    </div>
  )
}
