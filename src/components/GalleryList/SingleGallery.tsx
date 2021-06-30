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
import { useEffect } from "preact/hooks";
import StarIcon from '@material-ui/icons/Star';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

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
}: {
  gallery: Gallery;
  selectedGallery: number;
  setSelectedGallery: StateUpdater<number>;
}) => {
  //@ts-ignore
  const classes = useStyles();
  // const [currentGallery, setCurrentGallery]
  const [active, setActive] = useState(false);
  // useEffect(() => {
  // 	// console.log(selectedGallery === gallery.id);
  // 	console.log(gallery.id);
  // }, [selectedGallery])
	useEffect(() => {
		console.log(gallery)
	}, [])
  return (
    // <article onClick={() => setCurrentGallery(gallery.id)}>
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
            {gallery.terms.client[0].name}
          </span>
          <CardHeader className={styles.cardHeader} title={decode(gallery.title.rendered)} />
          {gallery.terms.market.map((m) => (
            <Chip label={decode(m.name)} color="primary"  />
          ))}
					{gallery.acf.attributes?.custom_item ?  <div className={styles.customItem}><StarIcon /> This item is custom made!</div>: ""}
					{gallery.acf.attributes?.custom_item ?  <div className={styles.customItem}><EmojiEventsIcon /> See unique and unusual products here!</div>: ""}
        </CardContent>
      </Card>
      {showGallery(selectedGallery === gallery.id, gallery, setSelectedGallery)}
    </article>
  );
};
