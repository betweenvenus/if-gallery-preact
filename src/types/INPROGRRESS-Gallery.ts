export interface Gallery {
  title: string,
  photos: GalleryPhoto[]
  date: Date | string, // Probably wrong type
  video?: string,
  filters: {
    markets: string[],
    clients: string[],
    date: string
  },
  attributes?: {
    custom: boolean,
    unique: boolean,
    featured: boolean
  }
}

export interface GalleryPhoto {
  id: number,
  title: string,
  url: string,
  alt: string,
  caption: string, // Unsure if alt and caption will be the same
  thumbnail: string,
}

export interface GalleriesUglyResponse {
  title: { rendered: string },
  gallery_title: string,
  photos: GalleryPhoto[],
  // Add type just for _embedded
  _embedded: object
}