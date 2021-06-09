export interface SingleGallery {
  title: string;
  id: number;
  thumbnail: string;
  photos: GalleryPhoto[];
  date: Date | string; // Probably wrong type
  video?: string;
  // filters: {
  //   markets: string[];
  //   clients: string[];
  //   date: string;
  // };
  attributes?: {
    custom: boolean;
    unique: boolean;
    featured: boolean;
  };
}

export interface GalleryAttributes {
  // Consider specifying the terms
  markets: string[];
  clients: string[];
}

export interface GalleryPhoto {
  title: string;
  url: string;
  alt: string;
  caption: string; // Unsure if alt and caption will be the same
  thumbnail: string;
}

/**
 * Represents the format of the "terms"
 * field on responses from the API as it's
 * configured currently.
 */
interface APITermResponse {
  term_id: number;
  name: string;
  slug: string;
}

interface APIPhotoResponse {
  photo: {
    id: number;
    title: string;
    width: number;
    height: number;
  };
}

export interface GalleriesUglyResponse {
  id: number;
  title: {
    rendered: string;
  };
  terms: {
    market: APITermResponse[];
    client: APITermResponse[];
  };
  date: string;
  acf: {
    photos: APIPhotoResponse[];
  };
}

/**
 * Types describing gallery taxonomies and attributes
 * (attributes are usually just ACF booleans)
 */

export type GalleryTaxonomy = "market" | "client";

export type GalleryAttribute = "featured" | "custom" | "unique";
