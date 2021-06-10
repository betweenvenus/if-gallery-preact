import { h } from "preact";

interface GalleryThumbnailProps {
  title: string;
  url: string;
  galleryId: number;
  galleryAttributes: string[]; // Specify this
}

export default ({ title, url, galleryId, galleryAttributes }: GalleryThumbnailProps) => {
  return (
    <div className="gallery-thumb">
      <img src={url} alt={title} />
    </div>
  );
} 