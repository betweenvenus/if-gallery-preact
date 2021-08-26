import { h } from "preact";
import { createPortal } from "preact/compat";
import { StateUpdater, useState } from "preact/hooks";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Chip,
  makeStyles,
} from "@material-ui/core";
import { decode } from "he";
import { Gallery } from "../../types/Gallery";
import ViewGallery from "../ViewGallery";
import styles from "./style.scss";
import StarIcon from "@material-ui/icons/Star";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
    cursor: "pointer",
    transition: "opacity .25s ease-out",
    margin: "40px",
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
}));

const showGallery = (
  show: boolean,
  gallery: Gallery,
  setSelectedGallery: StateUpdater<number>
) =>
  show &&
  createPortal(
    <ViewGallery gallery={gallery} setSelectedGallery={setSelectedGallery} />,
    document.body
  );

export default ({
  gallery,
  selectedGallery,
  setSelectedGallery,
  attribute,
}: {
  gallery: Gallery;
  selectedGallery: number;
  setSelectedGallery: StateUpdater<number>;
  attribute: string;
}) => {
  //@ts-ignore
  const classes = useStyles();
  if (
    attribute === "all" ||
    (typeof gallery.acf.attributes !== "undefined" &&
      gallery.acf.attributes[attribute])
  ) {
    return (
      <article
        className={classes.root}
        onClick={() => setSelectedGallery(gallery.id)}
      >
        <Card className={styles.galleryCard}>
          <CardMedia
            className={classes.media}
            image={gallery.acf.photos[0].photo.sizes.large}
          />
          <CardContent>
            <span className={styles.clientName}>
              {gallery.terms.client.length > 0 && gallery.terms.client[0].name}
            </span>
            <CardHeader
              className={styles.cardHeader}
              title={decode(gallery.title.rendered)}
            />
            {gallery.terms.market.map((m) => (
              <Chip label={decode(m.name)} color="primary" />
            ))}
            {gallery.acf.attributes && gallery.acf.attributes.custom_item ? (
              <div className={styles.customItem}>
                <StarIcon /> Custom product
              </div>
            ) : (
              ""
            )}
            {gallery.acf.attributes && gallery.acf.attributes.unique_item ? (
              <div className={styles.customItem}>
                <EmojiEventsIcon /> Unique item
              </div>
            ) : (
              ""
            )}
          </CardContent>
        </Card>
        {showGallery(
          selectedGallery === gallery.id,
          gallery,
          setSelectedGallery
        )}
      </article>
    );
  } else { 
		return <span></span>
	}
};
