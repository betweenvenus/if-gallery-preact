import styles from "./style.scss";
import { h } from "preact";
import { GroupedGallery } from "../../types/Gallery";
import {
  Card,
  CardHeader,
  CardMedia,
  makeStyles,
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

export default () => {
  const GalleryItems = (galleries: Gallery[]) => {
    const classes = useStyles();

    return Object.keys(galleries).map((term: any) => {
        return (
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
        );
    });
  };
  return (
    <ul className="gallery-thumbnails">
      {galleries && GalleryItems(galleries)}
    </ul>
  );
};
