import {
  AllGalleries,
  GroupedGallery,
  WPTerm,
} from "../../../types/Gallery";
import { Select, InputLabel, MenuItem, FormControl, Link } from "@material-ui/core";
import { h } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import styles from "./style.scss";
import MarketChip from "../MarketFilter/MarketChip";
import { groupBy } from "lodash";

interface FilterContainerProps {
  setGalleries: StateUpdater<AllGalleries>;
  allGalleries: GroupedGallery;
  allMarkets: WPTerm<"market">[];
  allClients: WPTerm<"client">[];
  filterMode: "market" | "client";
  setFilterMode: StateUpdater<"market" | "client">;
}

export default ({
  allMarkets,
  filterMode,
  setFilterMode,
  allClients,
}: FilterContainerProps) => {
  const [marketsList, setMarketsList] = useState<WPTerm<"market">[]>([]);
  const [, setActiveTerms] = useState<string[]>([]);

  useEffect(() => {
    setActiveTerms(
      marketsList.filter(({ active }) => active).map(({ slug }) => slug)
    );
  }, [marketsList]);

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
					test
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
              onChange={(e) =>
                setFilterMode((e?.target as HTMLInputElement).value as "market" | "client")
              }
            >
              <MenuItem value={"market"} className={styles.filterSelectItem}>
                Markets
              </MenuItem>
              <MenuItem value={"client"} className={styles.filterSelectItem}>
                Clients
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
              onChange={(e) =>
                setFilterMode((e?.target as HTMLInputElement).value as "market" | "client")
              }
            >
              <MenuItem value={"market"} className={styles.filterSelectItem}>
                Markets
              </MenuItem>
              <MenuItem value={"client"} className={styles.filterSelectItem}>
                Clients
              </MenuItem>
            </Select>
          </FormControl>
            <div className={styles.clientFilters}>
              {Object.entries(groupedClients).map(([key, clients]) => (
                <div className={styles.clientFilterSection}>
                  <h2>{key}</h2>
                  <ul>
                    {clients.map((c) => (
                      <li>
												<Link onClick={(e: Event) => e.preventDefault()}>
													{c.name}
												</Link>
											</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
        </article>
      );
    default:
      return <div>No filter selected! How did you do that?</div>;
  }
};
