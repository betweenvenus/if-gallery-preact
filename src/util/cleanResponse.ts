import { GalleriesUglyResponse, Gallery } from "../types/Gallery";

export default async (res: GalleriesUglyResponse[]): Promise<Gallery[]> => {
  const data = res.map(obj => {
    return {
      title: obj.gallery_title,
      photos: obj.photos
    }
  });
  return data;
}