export interface Gallery {
  title: string,
  photos: GalleryPhoto[]
}

export interface GalleryPhoto {
  id: number,
  url: string,
  title: string,
  thumbnail: string,
}

export interface GalleriesUglyResponse {
  title: { rendered: string },
  gallery_title: string,
  photos: GalleryPhoto[],
  // Add type just for _embedded
  _embedded: object
}