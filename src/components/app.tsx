import { FunctionalComponent, h } from "preact";
import fetchGalleries from "../util/fetchGalleries";
import { Gallery, GalleryPhoto } from "../types/Gallery";
import { useEffect, useState } from "preact/hooks";
// Thumbnails will trigger an overlay with ImageGallery on click
import ImageGallery from "react-image-gallery";

export function App() {
    const [galleries, setGalleries] = useState<Gallery[]>([]);

    useEffect(() => {
        (async () => {
            const data = await fetchGalleries();
            setGalleries([...data]);
        })();
    }, []);

    const gallery: GalleryPhoto[] | undefined = galleries.length
        ? galleries[0].photos
        : [];

    const dummy = [
        {
            original:
                "https://www.outbrain.com/techblog/wp-content/uploads/2017/05/road-sign-361513_960_720.jpg",
            thumbnail:
                "https://www.outbrain.com/techblog/wp-content/uploads/2017/05/road-sign-361513_960_720.jpg",
        },
        {
            original:
                "https://www.outbrain.com/techblog/wp-content/uploads/2017/05/road-sign-361513_960_720.jpg",
            thumbnail:
                "https://www.outbrain.com/techblog/wp-content/uploads/2017/05/road-sign-361513_960_720.jpg",
        },
        {
            original:
                "https://www.outbrain.com/techblog/wp-content/uploads/2017/05/road-sign-361513_960_720.jpg",
            thumbnail:
                "https://www.outbrain.com/techblog/wp-content/uploads/2017/05/road-sign-361513_960_720.jpg",
        },
    ];

    return (
        <div>
            <header>
                <h1>Gallery</h1>
            </header>
            <div>
                <ImageGallery items={dummy} />
            </div>
        </div>
    );
}
