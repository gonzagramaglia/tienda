export type ProductStatus = 'disponible' | 'reservado' | 'vendido'

export interface ProductImage {
  _key?: string
  alt?: string
  asset?: {
    _ref?: string
    _id?: string
    url?: string
  }
  url?: string
}

export interface Product {
  _id: string
  title: string
  slug: {
    current: string
  }
  price: number
  currency: 'ARS' | 'USD'
  status: ProductStatus
  condition?: string
  category?: string
  images: ProductImage[]
  description?: string
  mercadolibreUrl?: string
  whatsappCustomMessage?: string
  featured?: boolean
  _createdAt?: string
}

export interface SiteSettings {
  title: string
  subtitle?: string
  whatsappNumber: string
  location?: string
}

