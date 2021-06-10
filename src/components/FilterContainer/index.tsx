import { Gallery, WPTerm } from "../../types/Gallery";
import {
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import { h } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import styles from "./style.scss";
import MarketChip from "./MarketChip";

const filterTypes = {
  markets: "",
  clients: "",
};

const sortingTypes = {
  date: "",
  alphabetical: "",
};

interface FilterContainerProps {
  setGalleries: StateUpdater<Gallery[]>;
  allMarkets: WPTerm<"market">[];
}

export default ({ allMarkets, setGalleries }: FilterContainerProps) => {

  const marketChips = (markets: WPTerm<"market">[]) =>
    allMarkets.map((market) => <MarketChip active={true} market={market} />);

  return (
    <article class={styles.filterContainer}>
      <FormControl className={styles.formControl}>
        <InputLabel id="filter-selector">Choose a filter</InputLabel>
        <Select>
          <MenuItem>market</MenuItem>
          <MenuItem>client</MenuItem>
        </Select>
      </FormControl>
      <div class={styles.marketChipsContainer}>
        {allMarkets.length > 0 && marketChips(allMarkets)}
      </div>
    </article>
  );
};
