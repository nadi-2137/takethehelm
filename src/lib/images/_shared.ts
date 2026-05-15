export type { ImageMetadata } from 'astro'

export type AppImage = {
  src: ImageMetadata
  alt: string
}

export function defineImage(src: ImageMetadata, alt: string): AppImage {
  return { src, alt }
}
