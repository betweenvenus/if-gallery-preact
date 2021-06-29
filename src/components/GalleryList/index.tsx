// import { h } from "preact";
// import {
//   Card,
//   CardHeader,
//   CardMedia,
//   makeStyles,
// } from "@material-ui/core";
// import { decode } from "he";
// import { Gallery } from "../../types/Gallery";

import { makeStyles } from "@material-ui/core";
import { ComponentChildren, h } from "preact";
import { Gallery } from "../../types/Gallery";
import { fetchGalleries } from "../../util/api";
import SingleGallery from "./SingleGallery";

const useStyles = makeStyles((theme) => ({
	root: {
		listStyleType: "none",
		display: "flex",
		flexWrap: "wrap",

	}
}))


export default ({ children }: {children: ComponentChildren}) => {
	const classes = useStyles();
	return (
		<ul className={classes.root}>
			{ children }
		</ul>
	)
}
