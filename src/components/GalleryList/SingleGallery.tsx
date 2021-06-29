import { h } from "preact";
import { createPortal } from "preact/compat";
import { useState } from "preact/hooks";
import { Card, CardHeader, CardMedia, Chip, makeStyles } from "@material-ui/core";
import { decode } from "he";
import { Gallery } from "../../types/Gallery";
import { useEffect } from "react";
import ViewGallery from "../ViewGallery";

const useStyles = makeStyles((theme) => ({
  root: {
		width: 350,
    cursor: "pointer",
    transition: "opacity .25s ease-out",
		margin: "40px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "red",
  },
}));

const showGallery = (show: boolean, gallery: Gallery) =>
  show && createPortal(<ViewGallery gallery={gallery} />, document.body);

export default ({gallery}: {gallery: Gallery}) => {
  const classes = useStyles();
  // const [currentGallery, setCurrentGallery]
  const [active, setActive] = useState(false);
  return (
  // <article onClick={() => setCurrentGallery(gallery.id)}>
    <article className={classes.root} onClick={() => setActive(true)}>
      <Card variant="outlined">
        <CardMedia className={classes.media} image={gallery.acf.photos[0].photo.sizes.large} />
				<span>{gallery.terms.client[0].name}</span>
        <CardHeader title={decode(gallery.title.rendered)} />
				{gallery.terms.market.map((m) => <Chip label={m.name} color="primary" size="small" />)}
      </Card>
      {showGallery(active, gallery)}
    </article>
  );
};
