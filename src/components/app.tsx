import { h } from "preact";
import { fetchGalleries, fetchAllMarkets, fetchAllClients } from "../util/api";
import { useEffect, useState } from "preact/hooks";
import { Gallery, GroupedGallery, WPTerm } from "../types/Gallery";
import FilterContainer from "./FilterContainer";
import GalleryList from "./GalleryList";
import ViewGallery from "./ViewGallery";
import { groupBy } from "lodash";

const getGalleryById = (galleries: Gallery[], id: number) => {
  return galleries.find((g) => g.id === id);
};

export function App() {
	const [galleriesArray, setGalleriesArray] = useState<Gallery[]>([]);
  const [galleries, setGalleries] = useState<GroupedGallery>({});
  const [galleryItems, setGalleryItems] = useState<GroupedGallery>({});
  const [excludedGalleries, setExcludedGalleries] = useState<Gallery[]>([]);
  const [markets, setMarkets] = useState<WPTerm<"market">[]>([]);
  const [clients, setClients] = useState<WPTerm<"client">[]>([]);
  const [currentGallery, setCurrentGallery] = useState<number | null>(null);
  const [filterMode, setFilterMode] = useState<"market" | "client">("market");
  const [sortMode, setSortMode] =
    useState<"date" | "alphabetical">("alphabetical");

  useEffect(() => {
    const setData = async () => {
      const data = await Promise.all([
        fetchGalleries(),
        fetchAllMarkets(),
        fetchAllClients(),
      ]);
      const [galleryData, marketData, clientData] = data;
      setGalleries(groupBy(galleryData, "terms.market[0].slug"));
			setGalleriesArray(galleryData);
      setGalleryItems(galleries);
      setMarkets(marketData);
      setClients(clientData);
    };
    setData();
  }, []);

  return (
    <div>
      <header>
        <h1>Gallery</h1>
      </header>
      <FilterContainer
        allMarkets={markets}
        allGalleries={galleries}
        setGalleries={setGalleryItems}
				filterMode={filterMode}
				setFilterMode={setFilterMode}
				allClients={clients}
				
      />
      <GalleryList
        galleries={galleryItems}
        setCurrentGallery={setCurrentGallery}
      />
      {currentGallery && (
        <ViewGallery
          gallery={getGalleryById(galleriesArray, currentGallery)}
          setCurrentGallery={setCurrentGallery}
        />
      )}
    </div>
  );
}
