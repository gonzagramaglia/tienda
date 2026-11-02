import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

const imageBuilder = projectId
  ? createImageUrlBuilder({
      projectId,
      dataset,
    })
  : null

export const urlForImage = (source: Image | any) => {
  if (!imageBuilder || !source?.asset) {
    // Return direct URL if available (e.g. for mock/external images)
    return source?.url || source?.asset?.url || '/placeholder.svg'
  }
  return imageBuilder.image(source).auto('format').fit('max').url()
}
