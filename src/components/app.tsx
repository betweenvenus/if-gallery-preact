import { FunctionComponent, h } from "preact";
import { fetchGalleries } from "../util/api";
import { SingleGallery, GalleryPhoto } from "../types/Gallery";
import { useEffect, useState } from "preact/hooks";
import ImageGallery from "react-image-gallery";
import { Backdrop, Button, makeStyles } from "@material-ui/core";

const foo = () => alert("clicked something");

const OpenGallery: FunctionComponent<{ gallery: SingleGallery }> = ({
  gallery,
}) => {
  const items = [
    {
      original: gallery.thumbnail,
      thumbnail: gallery.thumbnail,
    },
    {
      original: gallery.thumbnail,
      thumbnail: gallery.thumbnail,
    },
    {
      original: gallery.thumbnail,
      thumbnail: gallery.thumbnail,
    },
    {
      original: gallery.thumbnail,
      thumbnail: gallery.thumbnail,
    },
    {
      original: gallery.thumbnail,
      thumbnail: gallery.thumbnail,
    },
  ];
  return <ImageGallery items={items} />;
};

export function App() {
  const [galleries, setGalleries] = useState<SingleGallery[]>([]);

  useEffect(() => {
    (async () => {
      const data = await fetchGalleries();
      setGalleries([...data]);
    })();
  }, []);

  const dummy = [
    {
      original: "https://i.imgur.com/xUDItO0.jpeg",
      thumbnail: "https://i.imgur.com/xUDItO0.jpeg",
    },
    {
      original: "https://i.imgur.com/NMJSm5q.jpg",
      thumbnail: "https://i.imgur.com/NMJSm5q.jpg",
    },
    {
      original: "https://i.imgur.com/xUDItO0.jpeg",
      thumbnail: "https://i.imgur.com/xUDItO0.jpeg",
    },
    {
      original: "https://i.imgur.com/xUDItO0.jpeg",
      thumbnail: "https://i.imgur.com/xUDItO0.jpeg",
    },
    {
      original: "https://i.imgur.com/xUDItO0.jpeg",
      thumbnail: "https://i.imgur.com/xUDItO0.jpeg",
    },
    {
      original: "https://i.imgur.com/xUDItO0.jpeg",
      thumbnail: "https://i.imgur.com/xUDItO0.jpeg",
    },
    {
      original: "https://i.imgur.com/xUDItO0.jpeg",
      thumbnail: "https://i.imgur.com/xUDItO0.jpeg",
    },
    {
      original: "https://i.imgur.com/xUDItO0.jpeg",
      thumbnail: "https://i.imgur.com/xUDItO0.jpeg",
    },
    {
      original: "https://i.imgur.com/xUDItO0.jpeg",
      thumbnail: "https://i.imgur.com/xUDItO0.jpeg",
    },
    {
      original: "https://i.imgur.com/xUDItO0.jpeg",
      thumbnail: "https://i.imgur.com/xUDItO0.jpeg",
    },
  ];
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
      backgroundColor: "rgba(0, 0, 0, 0.85)"
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <header>
        <h1>Gallery</h1>
      </header>
      <ul className="gallery-thumbnails">
        {galleries.map((gallery) => (
          <li>
            <img src={gallery.thumbnail} />
          </li>
        ))}
      </ul>
      {galleries.length && (
        <Backdrop open={true} className={classes.backdrop}>
          <OpenGallery gallery={galleries[0]} />
        </Backdrop>
      )}
    </div>
  );
}
