import { Chip } from "@material-ui/core";
import { WPTerm } from "../../types/Gallery";
import { decode } from "he";
import { h } from "preact";
import styles from "./style.scss";

interface MarketChipProps {
	market: WPTerm<"market">;
	active: boolean;
}

  const toggle = () => {
    // active ? setColor("default") : setColor("primary");
    // setActive(!active);
  };

export default ({ market, active }: MarketChipProps) => {
	const color = active ? "primary" : "default";
  return (
    <Chip
      className={styles.marketChip}
      label={decode(market.name)}
      color={color}
      clickable
    />
  );
}