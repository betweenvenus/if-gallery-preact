import { h } from "preact";
import { fetchGalleries, fetchAllMarkets } from "../util/api";
import { useEffect, useState } from "preact/hooks";
import { Gallery, WPTerm } from "../types/Gallery";
import FilterContainer from "./FilterContainer";
import GalleryList from "./GalleryList";


export function App() {
    const [galleries, setGalleries] = useState<Gallery[]>([]);
		const [galleryItems, setGalleryItems] = useState<Gallery[]>([]);
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
						setGalleryItems(galleryData);
            setMarkets(marketData);
        };
        setData();
    }, []);

    return (
        <div>
            <header>
                <h1>Gallery</h1>
            </header>
            <FilterContainer setGalleries={setGalleries} allMarkets={markets} />
						<GalleryList galleries={galleryItems} />
        </div>
    );
}
