import styles from "./style.scss";
import { h } from "preact";
import ImageGallery from "react-image-gallery";
import { Backdrop } from "@material-ui/core";
import { Gallery } from "../../types/Gallery";
import { CircularProgress } from "@material-ui/core";
import { useState } from "preact/hooks";

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
  setCurrentGallery: (val: number | null) => void;
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
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(!open);
            setCurrentGallery(null);
          }
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={styles.singleGalleryContainer}
        >
          <h1 className={styles.galleryHeading}>{gallery.title.rendered}</h1>
          <ImageGallery
            items={convertToImageGalleryFormat(gallery)}
          />
        </div>
      </Backdrop>
    );
  } else {
    return <CircularProgress />;
  }
};
