/**
 * Fold all of these functions into api.ts later on
 */
import { SingleGallery, GalleriesUglyResponse } from "../types/Gallery";

const baseURL = "https://innovativefitness.ahn2k5uj-liquidwebsites.com";

export const cleanResponse = async (
  res: GalleriesUglyResponse[]
): Promise<SingleGallery[]> => {
  const data = res.map((obj) => {
    return {
      title: obj.title.rendered,
      id: obj.id,
      date: obj.date,
      //@ts-ignore
      thumbnail: obj.acf.photos[0].photo.sizes.medium_large,
    };
  });
  //@ts-ignore
  return data;
};

export const galleryQuery = new URLSearchParams({
  _fields: [
    "title",
    "gallery_title",
    "photos",
    "_links",
    "acf",
  ].join(","),
  _embed: "1",
  _embedded: "1",
  "per_page": "100"
});

export const fetchGalleries = async (): Promise<SingleGallery[]> => {
  try {
    const res = await fetch(
      `${baseURL}/wp-json/wp/v2/galleries?${galleryQuery.toString()}`
    );
    const json = await res.json();
    return cleanResponse(json);
  } catch (e) {
    throw new Error(e);
  }
};

// const marketQuery = new URLSearchParams({
//   _fields: "name",
//   hide_empty: "false",
//   per_page: "100",
// });
// const galleryEndpoint = `${baseURL}/wp-json/wp/v2/galleries?${galleryQuery.toString()}`;
// const marketEndpoint = `${baseURL}/wp-json/wp/v2/market?${marketQuery.toString()}`;

// export default async () =>
//   ([galleries, markets] = await fetchData([
//     galleryEndpoint,
//     marketEndpoint,
//   ])));
