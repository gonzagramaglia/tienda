'use client'

import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { Product } from '@/types'
import { getProducts, isSanityConfigured } from '@/sanity/client'
import { ProductCard } from './ProductCard'
import { ProductModal } from './ProductModal'

interface CatalogViewProps {
  products: Product[]
  whatsappNumber: string
}

export function CatalogView({ products: initialProducts, whatsappNumber }: CatalogViewProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [search, setSearch] = useState('')
  // Por defecto sólo muestra productos disponibles
  const [selectedStatus, setSelectedStatus] = useState<'disponible' | 'vendidos_reservados'>('disponible')
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Abrir modal y actualizar URL
  const handleSelectProduct = useCallback((product: Product) => {
    setSelectedProduct(product)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.set('producto', product.slug.current)
      window.history.pushState({ slug: product.slug.current }, '', url.toString())
    }
  }, [])

  // Cerrar modal y limpiar URL
  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      if (url.searchParams.has('producto')) {
        url.searchParams.delete('producto')
        window.history.pushState(null, '', url.toString())
      }
    }
  }, [])

  // Soporte para botón atrás/adelante del navegador
  useEffect(() => {
    const handlePopState = () => {
      const url = new URL(window.location.href)
      const slug = url.searchParams.get('producto')
      if (slug) {
        const found = products.find((p) => p.slug.current === slug)
        if (found) setSelectedProduct(found)
      } else {
        setSelectedProduct(null)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [products])

  // Carga en vivo desde Sanity y chequeo de URL inicial (?producto=slug)
  useEffect(() => {
    if (isSanityConfigured) {
      getProducts().then((live) => {
        if (live && live.length > 0) {
          setProducts(live)

          // Si había un ?producto en la URL al cargar
          if (typeof window !== 'undefined') {
            const url = new URL(window.location.href)
            const slug = url.searchParams.get('producto')
            if (slug) {
              const found = live.find((p) => p.slug.current === slug)
              if (found) setSelectedProduct(found)
            }
          }
        }
      })
    } else {
      // Si estamos con mockProducts
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href)
        const slug = url.searchParams.get('producto')
        if (slug) {
          const found = initialProducts.find((p) => p.slug.current === slug)
          if (found) setSelectedProduct(found)
        }
      }
    }
  }, [initialProducts])

  const counts = useMemo(() => {
    const disponibles = products.filter((p) => p.status === 'disponible').length
    const noDisponibles = products.filter((p) => p.status !== 'disponible').length
    return { disponibles, noDisponibles }
  }, [products])

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Filtro de estado: por defecto solo disponibles
      if (selectedStatus === 'disponible' && p.status !== 'disponible') {
        return false
      }
      if (selectedStatus === 'vendidos_reservados' && p.status === 'disponible') {
        return false
      }

      // Filtro de búsqueda mejorado
      if (search.trim()) {
        const query = search.toLowerCase().trim()
        const titleMatch = p.title.toLowerCase().includes(query)
        const descMatch = p.description?.toLowerCase().includes(query)
        const catMatch = p.category?.toLowerCase().includes(query)
        const condMatch = p.condition?.toLowerCase().includes(query)
        if (!titleMatch && !descMatch && !catMatch && !condMatch) {
          return false
        }
      }

      return true
    })
  }, [products, search, selectedStatus])

  return (
    <div id="catalogo" className="space-y-8 scroll-mt-24">
      {/* Barra de Filtros y Búsqueda: Sticky debajo del header (top-16 = 64px) */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md -mx-6 px-6 py-3 border-b border-ui-border-base shadow-sm transition-all">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Barra de Búsqueda Mejorada (ancho completo en desktop) */}
          <div className="relative flex-1 w-full group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ui-fg-muted group-focus-within:text-ui-fg-base transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 1114 0z" />
              </svg>
            </div>

            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, descripción, modelo..."
              className="w-full h-10 pl-10 pr-20 rounded-rounded border border-ui-border-base bg-ui-bg-subtle/50 hover:bg-white focus:bg-white text-small-regular text-ui-fg-base placeholder:text-ui-fg-muted focus:outline-none focus:border-ui-fg-base focus:ring-1 focus:ring-ui-fg-base transition-all"
            />

            <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch('')
                    searchInputRef.current?.focus()
                  }}
                  className="w-5 h-5 rounded-full bg-ui-border-base hover:bg-ui-border-strong text-ui-fg-subtle flex items-center justify-center text-[10px] transition-colors"
                  title="Limpiar búsqueda"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Selector de Filtro Estilo Segmented Control */}
          <div className="inline-flex h-10 p-1 bg-ui-bg-subtle rounded-rounded border border-ui-border-base items-center shrink-0">
            <button
              type="button"
              onClick={() => setSelectedStatus('disponible')}
              className={`h-full px-3.5 rounded-soft text-small-semi transition-all flex items-center gap-1.5 ${
                selectedStatus === 'disponible'
                  ? 'bg-white text-ui-fg-base shadow-sm border border-ui-border-base/80 font-semibold'
                  : 'text-ui-fg-muted hover:text-ui-fg-base font-normal'
              }`}
            >
              <span>Artículos disponibles</span>
              <span className="text-[11px] font-normal text-ui-fg-muted">
                ({counts.disponibles})
              </span>
            </button>

            {counts.noDisponibles > 0 && (
              <button
                type="button"
                onClick={() => setSelectedStatus('vendidos_reservados')}
                className={`h-full px-3.5 rounded-soft text-small-semi transition-all flex items-center gap-1.5 ${
                  selectedStatus === 'vendidos_reservados'
                    ? 'bg-white text-ui-fg-base shadow-sm border border-ui-border-base/80 font-semibold'
                    : 'text-ui-fg-muted hover:text-ui-fg-base font-normal'
                }`}
                title="Ver artículos que ya fueron reservados o vendidos"
              >
                <span>Reservados o vendidos</span>
                <span className="text-[11px] font-normal text-ui-fg-muted">
                  ({counts.noDisponibles})
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid de Productos Estilo Medusa */}
      {filteredProducts.length > 0 ? (
        <ul
          className="grid grid-cols-1 xsmall:grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-10"
          data-testid="products-list"
        >
          {filteredProducts.map((product) => (
            <li key={product._id}>
              <ProductCard
                product={product}
                whatsappNumber={whatsappNumber}
                onSelect={handleSelectProduct}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="py-20 text-center border border-ui-border-base rounded-large bg-ui-bg-subtle">
          <p className="text-large-semi text-ui-fg-base">No hay artículos con ese criterio</p>
          <p className="text-small-regular text-ui-fg-subtle mt-1.5 max-w-sm mx-auto">
            {search
              ? `No encontramos coincidencias para "${search}".`
              : 'En este momento todos los artículos fueron vendidos.'}
          </p>
          <button
            onClick={() => {
              setSearch('')
              setSelectedStatus('disponible')
            }}
            className="mt-5 px-4 py-2 text-small-semi text-ui-fg-base border border-ui-border-base rounded-rounded bg-white hover:bg-ui-bg-subtle transition-colors"
          >
            Ver todos los disponibles
          </button>
        </div>
      )}

      {/* Modal con detalle del producto */}
      <ProductModal
        product={selectedProduct}
        whatsappNumber={whatsappNumber}
        onClose={handleCloseModal}
      />
    </div>
  )
}
