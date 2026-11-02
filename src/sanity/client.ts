import { createClient } from 'next-sanity'
import { Product, SiteSettings } from '@/types'
import { defaultSiteSettings, mockProducts } from '@/data/mockProducts'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const isSanityConfigured = Boolean(projectId && projectId !== 'demo' && projectId !== 'mock-project-id')

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false, // set to false for fresh product availability
    })
  : null

export async function getProducts(): Promise<Product[]> {
  if (!client) {
    return mockProducts
  }

  try {
    const query = `*[_type == "product"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      price,
      currency,
      status,
      condition,
      category,
      featured,
      description,
      mercadolibreUrl,
      whatsappCustomMessage,
      images[] {
        _key,
        alt,
        asset->{
          _id,
          url
        }
      }
    }`
    const products = await client.fetch<Product[]>(query)
    return products && products.length > 0 ? products : mockProducts
  } catch (error) {
    console.warn('Error fetching products from Sanity, using mock data:', error)
    return mockProducts
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!client) {
    const found = mockProducts.find((p) => p.slug.current === slug)
    return found || null
  }

  try {
    const query = `*[_type == "product" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      price,
      currency,
      status,
      condition,
      category,
      featured,
      description,
      mercadolibreUrl,
      whatsappCustomMessage,
      images[] {
        _key,
        alt,
        asset->{
          _id,
          url
        }
      }
    }`
    const product = await client.fetch<Product | null>(query, { slug })
    if (product) return product
    return mockProducts.find((p) => p.slug.current === slug) || null
  } catch (error) {
    console.warn(`Error fetching product ${slug} from Sanity:`, error)
    return mockProducts.find((p) => p.slug.current === slug) || null
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!client) {
    return defaultSiteSettings
  }

  try {
    const query = `*[_type == "siteSettings"][0] {
      title,
      subtitle,
      whatsappNumber,
      location
    }`
    const settings = await client.fetch<SiteSettings | null>(query)
    return settings || defaultSiteSettings
  } catch (error) {
    return defaultSiteSettings
  }
}

