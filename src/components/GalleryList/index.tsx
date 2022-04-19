import { makeStyles } from "@material-ui/core";
import { ComponentChildren, h } from "preact";

const useStyles = makeStyles((theme) => ({
	root: {
		listStyleType: "none",
		display: "flex",
		flexWrap: "wrap",
		// flexFlow: "column"
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
