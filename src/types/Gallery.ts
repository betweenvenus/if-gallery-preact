export type GalleryTaxonomy = "market" | "client";

export type GalleryAttribute = "featured" | "custom" | "unique";

export interface GalleryPhotoSizes {
  thumbnail: string;
  "thumbnail-width": number;
  "thumbnail-height": number;
  medium: string;
  "medium-width": number;
  "medium-height": number;
  medium_large: string;
  "medium_large-width": number;
  "medium_large-height": number;
  large: string;
  "large-width": number;
  "large-height": number;
}

export interface GalleryPhoto {
  photo: {
    id: number;
    title: string;
    url: string;
    alt: string;
    date: string;
    width: number;
    height: number;
    sizes: GalleryPhotoSizes;
  };
  // Description is an ACF field, not the image description.
  description: string;
}

export type Taxonomies = "market" | "client";

interface BaseWPTerm {
  name: string;
  slug: string;
  count: number;
  active?: boolean;
}

type WPTermWithID = BaseWPTerm & {
  id: number;
};

type WPTermWithTermID = BaseWPTerm & {
  term_id: number;
};

type WPTermBothIDs = WPTermWithID | WPTermWithTermID;

export type WPTerm<T extends Taxonomies> = WPTermBothIDs & {
  taxonomy: T;
};

export interface Gallery {
  title: {
    rendered: string;
  };
	date: string;
	slug: string;
  id: number;
  acf: {
		attributes: {custom_item: boolean, unique_item: boolean};
    photos: GalleryPhoto[];
		video: string;
  };
  terms: {
    market: WPTerm<"market">[];
    client: WPTerm<"client">[];
  };
}

export interface GroupedGallery {
  [term: string]: Gallery[];
}

export interface AllGalleries {
  original: Gallery[];
  grouped: GroupedGallery;
  filtered: GroupedGallery;
  current: number | null;
}
