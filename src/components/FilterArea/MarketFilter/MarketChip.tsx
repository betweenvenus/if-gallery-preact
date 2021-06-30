import { Chip } from "@material-ui/core";
import { WPTerm } from "../../../types/Gallery";
import { decode } from "he";
import { h } from "preact";
import styles from "../FilterContainer/style.scss";
import { useEffect } from "react";

interface MarketChipProps {
  market: WPTerm<"market">;
}

export default ({ market }: MarketChipProps) => {
	useEffect(() => {
		// console.log(market)
	}, [market]);
  const color = market.active ? "primary" : "default";
  return (
    <Chip
      className={styles.marketChip}
      label={decode(market.name)}
      color={color}
      clickable
			// className={styles.marketChip}
    />
  );
};
