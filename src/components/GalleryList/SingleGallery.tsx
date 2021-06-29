import { h } from "preact";
import { createPortal } from "preact/compat";
import { useState } from "preact/hooks";
import { Card, CardHeader, CardMedia, makeStyles } from "@material-ui/core";
import { decode } from "he";
import { Gallery } from "../../types/Gallery";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    cursor: "pointer",
    transition: "opacity .25s ease-out",
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

const showGallery = (show: boolean) =>
  show && createPortal(<div>hello world</div>, document.body);

export default (gallery: Gallery) => {
  const classes = useStyles();
  // const [currentGallery, setCurrentGallery]
  const [active, setActive] = useState(false);
  return (
  // <article onClick={() => setCurrentGallery(gallery.id)}>
    <article onClick={() => setActive(true)}>
			{/* @ts-ignore */}
      <Card variant="outlined" className={classes.root}>
			{/* @ts-ignore */}
        <CardMedia image={gallery.acf.photos[0].photo.sizes.medium} />
			{/* @ts-ignore */}
        <CardHeader title={decode(gallery.title.rendered)} />
      </Card>
      {showGallery(active)}
    </article>
  );
};
