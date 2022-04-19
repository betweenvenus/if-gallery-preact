import styles from "./style.scss";
import { h } from "preact";
import ImageGallery from "react-image-gallery";
import { Backdrop } from "@material-ui/core";
import { Gallery } from "../../types/Gallery";
import { CircularProgress } from "@material-ui/core";
import { StateUpdater, useState } from "preact/hooks";

const convertToImageGalleryFormat = (
  gallery: Gallery
): { original: string; thumbnail: string, embedUrl?: string }[] => {
  const photosMap = gallery.acf.photos.map(({ photo }): {
		thumbnail: string,
		original: string,
		embedUrl?: string,
		renderItem?: (item: any) => JSX.Element
	} => {
    return {
      thumbnail: photo.sizes.medium,
      original: photo.sizes.large,
    };
  });
	if (gallery.acf.video) {
		const videoID = gallery.acf.video.split('?v=').pop();
		const videoEmbed = `https://www.youtube.com/embed/${videoID}`;
		photosMap.unshift({
			thumbnail: "https://innovativefit.com/wp-content/uploads/2021/09/if-video-placeholder.png",
			original: "",
			embedUrl: videoEmbed,
			renderItem: (item) => (
				<iframe width="100%" height="500px" src={videoEmbed} title="YouTube video player" frameBorder="0" autoplay="true" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			),
		});
	}
	return photosMap;
};

export default ({
  gallery,
  setSelectedGallery,
}: {
  gallery: Gallery | undefined;
  setSelectedGallery: StateUpdater<number>;
}) => {
  const [open, setOpen] = useState(true);
  const toggleBackdrop = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
    setSelectedGallery(0);
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
            setSelectedGallery(0);
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
