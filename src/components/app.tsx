import { h } from "preact";
import { fetchGalleries, fetchAllMarkets, fetchAllClients } from "../util/api";
import { useEffect, useState, useMemo } from "preact/hooks";
import { AllGalleries, Gallery, WPTerm } from "../types/Gallery";
import FilterContainer from "./FilterArea/FilterContainer";
import GalleryList from "./GalleryList";
import ViewGallery from "./ViewGallery";
import { groupBy } from "lodash";

const getGalleryById = (galleries: Gallery[], id: number) => {
  return galleries.find((g) => g.id === id);
};

export function App() {
  const [galleries, setGalleries] = useState<AllGalleries>({
    original: [],
    grouped: {},
    filtered: {},
    current: null,
  });

  const setCurrentGallery = (val: number | null) => {
    setGalleries((prev) => {
      return { ...prev, current: val };
    });
  };

  const [markets, setMarkets] = useState<WPTerm<"market">[]>([]);
  const [clients, setClients] = useState<WPTerm<"client">[]>([]);
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

      setGalleries({
        original: galleryData,
        grouped: groupBy(galleryData, "terms.market[0].slug"),
        filtered: {},
        current: null,
      });

      setMarkets(marketData);
      setClients(clientData);
    };
    setData();
  }, []);


  return (
    <div>
      <FilterContainer
        allMarkets={markets}
        allGalleries={galleries.grouped}
        setGalleries={setGalleries}
        filterMode={filterMode}
        setFilterMode={setFilterMode}
        allClients={clients}
      />
      <GalleryList
        galleries={galleries.filtered}
        setCurrentGallery={setCurrentGallery}
      />
      {galleries.current && (
        <ViewGallery
          gallery={getGalleryById(galleries.original, galleries.current)}
          setCurrentGallery={setCurrentGallery}
        />
      )}
    </div>
  );
}
