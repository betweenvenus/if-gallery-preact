import { useState, useEffect } from "preact/hooks";
import { GroupedGallery } from "../types/Gallery";

export const filterGalleriesByTerms = (
  galleries: GroupedGallery,
  terms: string[]
): GroupedGallery | {} => {
  return Object.keys(galleries).reduce((obj, slug) => {
		if (terms.includes(slug)) {
			obj[slug] = galleries[slug];
		}
		return obj;
	}, {} as any);
};

export const useGalleryData = () => {
	
}

export const useQueryString = (url: string) => {
	const encodedURL = new URL(url);
	const [query, setQuery] = useState(encodedURL.search);
	return query;
}

export const useSelectGallery = (id: number) => {
	const [selectedGallery, setSelectedGallery] = useState(0);

}
