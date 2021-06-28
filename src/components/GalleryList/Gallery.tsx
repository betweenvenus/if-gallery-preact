import { h } from "preact";
import { useState } from "preact/hooks";
import {
  Card,
  CardHeader,
  CardMedia,
  makeStyles,
} from "@material-ui/core";
import { decode } from "he";
import { Gallery } from "../../types/Gallery";

export default (gallery: Gallery) => {
	// const [currentGallery, setCurrentGallery]
  <article onClick={() => setCurrentGallery(gallery.id)}>
    <Card variant="outlined" className={classes.root}>
      <CardMedia
        image={gallery.acf.photos[0].photo.sizes.medium}
      />
      <CardHeader title={decode(gallery.title.rendered)} />
    </Card>
  </article>;
};
