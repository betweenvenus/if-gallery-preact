import styles from "./style.scss";
import { h } from "preact";
import { StateUpdater } from "preact/hooks";
import { Gallery, GroupedGallery } from "../../types/Gallery";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  makeStyles,
	Divider
} from "@material-ui/core";
import { decode } from "he";

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

interface GalleryListProps {
  galleries: GroupedGallery;
  setCurrentGallery: (val: number | null) => void;
}

export default ({
  galleries,
  setCurrentGallery,
}: GalleryListProps) => {
  const GalleryItems = (galleries: GroupedGallery) => {
    const classes = useStyles();

    return Object.keys(galleries).map((term: any) => {
        return (
          <section className={styles.gallerySection}>
            <h1 className={styles.gallerySectionHeading}>{galleries[term][0].terms.market[0].name}</h1>
            <ul>
              {galleries[term].map((gallery) => {
                return (
                  <li onClick={() => setCurrentGallery(gallery.id)}>
                    <Card variant="outlined" className={classes.root}>
                      <CardMedia
                        image={gallery.acf.photos[0].photo.sizes.medium}
                        className={classes.media}
                      />
                      <CardHeader title={decode(gallery.title.rendered)} />
                    </Card>
                  </li>
                );
              })}
            </ul>
          </section>
        );
    });
  };
  return (
    <ul className="gallery-thumbnails">
      {galleries && GalleryItems(galleries)}
    </ul>
  );
};
