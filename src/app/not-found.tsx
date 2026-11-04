'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function NotFound() {
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const pathname = window.location.pathname
    // Captura rutas como /producto/[slug] o /tienda/producto/[slug]
    const match = pathname.match(/\/producto\/([^/?#]+)/)
    if (match && match[1]) {
      const slug = match[1]
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (pathname.startsWith('/tienda') ? '/tienda' : '')
      // Redirige al catálogo con el parámetro para abrir el modal del producto de inmediato
      window.location.replace(`${basePath}/?producto=${encodeURIComponent(slug)}`)
      return
    }

    setChecking(false)
  }, [])

  if (checking) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-8 h-8 border-2 border-ui-border-base border-t-ui-fg-base rounded-full animate-spin mb-4" />
        <p className="text-sm text-ui-fg-muted">Cargando producto...</p>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-extrabold text-slate-900">404</h1>
      <h2 className="text-xl font-semibold text-slate-700 mt-2">Página no encontrada</h2>
      <p className="text-sm text-slate-500 mt-1 max-w-sm">
        El producto o la sección que estás buscando no existe o fue dada de baja.
      </p>
      <Link
        href="/"
        className="mt-6 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-medium hover:bg-slate-800 transition-colors"
      >
        Volver a la portada
      </Link>
    </div>
  )
}
