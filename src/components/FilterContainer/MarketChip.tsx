import { Chip } from "@material-ui/core";
import { WPTerm } from "../../types/Gallery";
import { decode } from "he";
import { h } from "preact";
import styles from "./style.scss";
import { StateUpdater } from "preact/hooks";
import { useEffect } from "react";

interface MarketChipProps {
  market: WPTerm<"market">;
}

export default ({ market }: MarketChipProps) => {
  const color = market.active ? "primary" : "default";
  return (
    <Chip
      className={styles.marketChip}
      label={decode(market.name)}
      color={color}
      clickable
    />
  );
};
