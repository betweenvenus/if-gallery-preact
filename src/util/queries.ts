export const galleryQuery = new URLSearchParams({
  _fields: [
    "title",
    "gallery_title",
    "photos",
    "meta=featured",
    "_links",
  ].join(","),
  _embed: "1",
  _embedded: "1",
  "per_page": "100"
});