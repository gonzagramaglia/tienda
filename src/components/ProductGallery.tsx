'use client'

import Image from 'next/image'
import { ProductImage } from '@/types'
import { urlForImage } from '@/sanity/image'

interface ProductGalleryProps {
  images: ProductImage[]
  title: string
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle rounded-large border border-ui-border-base flex items-center justify-center text-ui-fg-muted text-small-regular">
        Sin fotos disponibles
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-6">
      {images.map((image, index) => {
        const imageUrl = urlForImage(image)
        return (
          <div
            key={image._key || index}
            className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle rounded-large border border-ui-border-base"
          >
            <Image
              src={imageUrl}
              alt={image.alt || `${title} imagen ${index + 1}`}
              priority={index === 0}
              fill
              sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
              className="object-cover object-center"
            />
          </div>
        )
      })}
    </div>
  )
}
