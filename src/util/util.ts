import { GroupedGallery, WPTerm } from "../types/Gallery";

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


