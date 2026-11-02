interface MercadoLibreLinkParams {
  productTitle: string
  mercadolibreUrl?: string
}

export function buildMercadoLibreLink({
  productTitle,
  mercadolibreUrl,
}: MercadoLibreLinkParams): { url: string; isDirectLink: boolean } {
  if (mercadolibreUrl && mercadolibreUrl.trim().startsWith('http')) {
    return {
      url: mercadolibreUrl.trim(),
      isDirectLink: true,
    }
  }

  // Si no hay link directo a una publicación propia, genera el enlace de búsqueda en Mercado Libre Argentina
  // para que el comprador pueda comparar precios reales de mercado.
  const cleanTitle = productTitle.replace(/[^\w\s]/gi, '').trim()
  const searchUrl = `https://listado.mercadolibre.com.ar/${encodeURIComponent(cleanTitle)}`

  return {
    url: searchUrl,
    isDirectLink: false,
  }
}

