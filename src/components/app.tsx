import { Fragment, h } from "preact";
import { fetchGalleries, fetchAllMarkets } from "../util/api";
import { useEffect, useState } from "preact/hooks";
import ImageGallery from "react-image-gallery";
import { Backdrop, Button, makeStyles } from "@material-ui/core";
import { Suspense, lazy } from "preact/compat";
import { Gallery, WPTerm } from "../types/Gallery";
import FilterContainer from "./FilterContainer/FilterContainer";

const GalleryItems = (galleries: Gallery[]) => {
  return galleries.map((gallery) => (
    <li><img src={gallery.acf.photos[0].photo.url} /></li>
  )) 
};

export function App() {
    const [galleries, setGalleries] = useState<Gallery[]>([]);
    const [markets, setMarkets] = useState<WPTerm<"market">[]>([]);
    const [clients, setClients] = useState<WPTerm<"client">[]>([]);

    useEffect(() => {
        const setData = async () => {
            const data = await Promise.all([
                fetchGalleries(),
                fetchAllMarkets(),
            ]);
            const [galleryData, marketData] = data;
            setGalleries(galleryData);
            setMarkets(marketData);
        };
        setData();
    }, []);

    const useStyles = makeStyles((theme) => ({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: "#fff",
            backgroundColor: "rgba(0, 0, 0, 0.85)",
        },
    }));

    const classes = useStyles();

    return (
        <div>
            <header>
                <h1>Gallery</h1>
            </header>
            <FilterContainer markets={markets} />
            <ul className="gallery-thumbnails">
              {galleries &&  GalleryItems(galleries)}
            </ul>
        </div>
    );
}
