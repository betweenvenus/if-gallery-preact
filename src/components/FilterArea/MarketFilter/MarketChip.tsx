import { Chip } from "@material-ui/core";
import { WPTerm } from "../../../types/Gallery";
import { decode } from "he";
import { h } from "preact";
import styles from "../FilterContainer/style.scss";

interface MarketChipProps {
  market: WPTerm<"market">;
}

export default ({ market }: MarketChipProps) => {
	/**
	 * If client actually liked the "filter" feature, toggle
	 * the chip color like this:
   * const color = market.active ? "primary" : "default";
	 * ...
	 * <Chip color={color} ... />
	 */
  return (
    <Chip
      className={styles.marketChip}
      label={decode(market.name)}
      color="primary"
      clickable
    />
  );
};
