import { Gallery, GroupedGallery, WPTerm } from "../../types/Gallery";
import { Select, InputLabel, MenuItem, FormControl } from "@material-ui/core";
import { h } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import styles from "./style.scss";
import MarketChip from "./MarketChip";
import { filterGalleriesByTerms } from "../../util/util";
import { groupBy } from "lodash";

const filterGalleriesByMarket = (
  gallery: Gallery,
  markets: WPTerm<"market">[]
) => {
  const galleryMarkets: WPTerm<"market">[] = gallery.terms.market;
  for (const market of galleryMarkets) {
    if (galleryMarkets.find((m) => m.slug === market.slug)?.active) return true;
  }
};

interface FilterContainerProps {
  setGalleries: StateUpdater<GroupedGallery>;
  allGalleries: GroupedGallery;
  allMarkets: WPTerm<"market">[];
  allClients: WPTerm<"client">[];
  filterMode: "market" | "client";
  setFilterMode: StateUpdater<"market" | "client">;
}

export default ({
  allMarkets,
  allGalleries,
  setGalleries,
  filterMode,
  setFilterMode,
  allClients,
}: FilterContainerProps) => {
  const [marketsList, setMarketsList] = useState<WPTerm<"market">[]>([]);

  const [activeTerms, setActiveTerms] = useState<string[]>([]);

  useEffect(() => {
    setActiveTerms(
      marketsList.filter(({ active }) => active).map(({ slug }) => slug)
    );
  }, [marketsList]);

  useEffect(() => {
    setGalleries(filterGalleriesByTerms(allGalleries, activeTerms));
  }, [activeTerms]);

  const setAllMarketsActive = (market: WPTerm<"market">): WPTerm<"market"> => {
    return { ...market, active: true };
  };

  const toggleMarketVisibility = (market: WPTerm<"market">) => {
    const marketCopy = { ...market };
    marketCopy.active = !marketCopy.active;
    setMarketsList([...marketsList.filter((m) => m !== market), marketCopy]);
  };

  useEffect(
    () => setMarketsList(allMarkets.map(setAllMarketsActive)),
    [allMarkets]
  );

  const toggleMarket = (market: any) => {
    toggleMarketVisibility(market);
  };

  const marketChips = (markets: WPTerm<"market">[]) =>
    markets
      .sort((a, b) => ((a.slug as any) > (b.slug as any) ? 1 : -1))
      .map((market) => (
        <span onClick={() => toggleMarket(market)}>
          <MarketChip market={market} />
        </span>
      ));

  const groupedClients = groupBy(allClients, "name[0]");

  switch (filterMode) {
    case "market":
      return (
        <article class={styles.filterContainer}>
          <FormControl className={styles.formControl}>
            <InputLabel id="filter-selector">Choose a filter</InputLabel>
            <Select
              labelId="filter-selector"
              value={filterMode}
              onChange={(e) => setFilterMode(e.target.value as "market" | "client")}
            >
              <MenuItem value={"market"} className={styles.filterSelectItem}>
                Markets
              </MenuItem>
            </Select>
          </FormControl>
          <div class={styles.marketChipsContainer}>
            {marketsList.length > 0 && marketChips(marketsList)}
          </div>
        </article>
      );
    case "client":
      return (
        <article class={styles.filterContainer}>
          <FormControl className={styles.formControl}>
            <InputLabel id="filter-selector">Choose a filter</InputLabel>
            <Select
              labelId="filter-selector"
              value={filterMode}
              onChange={(e) => setFilterMode(e.target.value as "market" | "client")}
            >
              <MenuItem value={"market"} className={styles.filterSelectItem}>
                Markets
              </MenuItem>
              <MenuItem value={"client"} className={styles.filterSelectItem}>
                Clients
              </MenuItem>
            </Select>
            <div>
              {Object.entries(groupedClients).map(([key, clients]) => (
                <div>
                  <strong>{key}</strong>
                  <ul>
                    {clients.map((c) => (
                      <li>{c.name}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </FormControl>
        </article>
      );
    default:
      return <div>No filter selected! How did you do that?</div>;
  }
};
