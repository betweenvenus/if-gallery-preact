import { h } from "preact";
import { Gallery } from "../../types/Gallery";

interface GalleryListProps {
    galleries: Gallery[];
}

export default ({ galleries }: GalleryListProps) => {
    const GalleryItems = (galleries: Gallery[]) => {
        return galleries.map((gallery) => (
            <li>
                <img src={gallery.acf.photos[0].photo.url} />
            </li>
        ));
    };
    return (
        <ul className="gallery-thumbnails">
            {galleries && GalleryItems(galleries)}
        </ul>
    );
};
