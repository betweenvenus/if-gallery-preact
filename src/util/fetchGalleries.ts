import { galleryQuery as query } from "./queries";
import cleanResponse from "./cleanResponse";
const baseURL = "https://innovativefitness.ahn2k5uj-liquidwebsites.com";

export default async () => {
  try {
    const res = await fetch(`${baseURL}/wp-json/wp/v2/galleries?${query.toString()}`);
    const json = await res.json();
    return cleanResponse(json);
  }
  catch (e) {
    throw new Error(e);
  }
}

// const marketQuery = new URLSearchParams({
//   _fields: "name",
//   hide_empty: "false",
//   per_page: "100",
// });
// const galleryEndpoint = `${baseURL}/wp-json/wp/v2/galleries?${galleryQuery.toString()}`;
// const marketEndpoint = `${baseURL}/wp-json/wp/v2/market?${marketQuery.toString()}`;

// export default async () =>
//   ([galleries, markets] = await fetchData([
//     galleryEndpoint,
//     marketEndpoint,
//   ])));
