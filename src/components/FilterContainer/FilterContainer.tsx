import { WPTerm } from "../../types/Gallery";
import { Chip, makeStyles } from "@material-ui/core";
import { h } from "preact";
import { decode } from "he";
import { useEffect } from "preact/hooks";

interface FilterContainerProps {
    markets: WPTerm<"market">[];
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(0.5),
        },
    },
}));

export default ({ markets }: FilterContainerProps) => {
    const classes = useStyles();
    const marketChips = (markets: WPTerm<"market">[]) =>
        markets.map((market) => (
            // @ts-ignore
            <Chip label={decode(market.name)} color="primary" clickable></Chip>
        ));
    return (
        <article className={classes.root}>
            {markets.length > 0 && marketChips(markets)}
        </article>
    );
};
