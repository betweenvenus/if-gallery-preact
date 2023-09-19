import { Chip } from "@material-ui/core";
import { WPTerm } from "../../../types/Gallery";
import { decode } from "he";
import { h } from "preact";
import styles from "../FilterContainer/style.scss";

interface MarketChipProps {
  market: WPTerm<"market">;
}

export default ({ market }: MarketChipProps) => {
  return (
    <Chip
      className={styles.marketChip}
      label={decode(market.name)}
      color="primary"
      clickable
    />
  );
};
