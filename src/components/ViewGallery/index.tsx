import styles from "./style.scss";
import { h } from "preact";
import ImageGallery from "react-image-gallery";
import { Backdrop } from "@material-ui/core";
import { Gallery } from "../../types/Gallery";
import { CircularProgress } from "@material-ui/core";
import { StateUpdater, useState } from "preact/hooks";

const convertToImageGalleryFormat = (
  gallery: Gallery
): { original: string; thumbnail: string }[] => {
  return gallery.acf.photos.map(({ photo }) => {
    return {
      thumbnail: photo.sizes.medium,
      original: photo.sizes.large,
    };
  });
};

export default ({
  gallery,
  setCurrentGallery,
}: {
  gallery: Gallery | undefined;
  setCurrentGallery: StateUpdater<number | null>;
}) => {
  const [open, setOpen] = useState(true);
  const toggleBackdrop = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
    setCurrentGallery(null);
  };
  if (gallery) {
    return (
      <Backdrop
        className={styles.singleGalleryView}
        open={open}
        onClick={toggleBackdrop}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={styles.singleGalleryContainer}
        >
          <h1 className={styles.galleryHeading}>{gallery.title.rendered}</h1>
          <ImageGallery items={convertToImageGalleryFormat(gallery)} />
        </div>
      </Backdrop>
    );
  } else {
    return <CircularProgress />;
  }
};
