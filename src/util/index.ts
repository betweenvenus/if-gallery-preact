import { createContext } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import { Gallery, WPTerm } from "../types/Gallery";
import { createMuiTheme } from "@material-ui/core";

export const useQueryString = (url: string) => {
  const encodedURL = new URL(url);
  const [query] = useState(encodedURL.search);
  return query;
};

export const BASE_URL = "https://innovativefit.com/wp-json/wp/v2";

// @ts-ignore
const returnUniqueAray = (arr: any[]) => [...new Set(arr)];

const getPaginatedData = async<T>(
	path: string,
  params: URLSearchParams,
  callback?: (arg: any) => void
): Promise<T[]> => {
  const url = `${BASE_URL}/${path}?${params.toString()}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error retrieving data from ${url}!`);
    const data: T[] = await res.json();
    const totalPages = parseInt(res.headers.get("x-wp-totalpages") || "0");
    if (totalPages && totalPages < 2) {
			if (callback) callback(data);
			return data;
		}
			debugger;
    for (let i = 2; i <= totalPages; i++) {
      params.set("page", i.toString());
      const res = await fetch(`${BASE_URL}/${path}?${params.toString()}`);
      const moreData = await res.json();
			data.push(...moreData);
    }
		if (callback) callback(data);
		return data;
  } catch (e) {
		throw e;
  }
};

const sortGalleriesAlphabetically = (a: Gallery, b: Gallery) => {
	return (a.slug.toUpperCase() > b.slug.toUpperCase()) ? 1 : -1;
}

/**
 * Fetches gallery data from API and returns
 * useState variable and setter
 */
export const useGalleryData = (): Gallery[] => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  useEffect(() => {
    const params = new URLSearchParams({
      _fields: "title,date,slug,acf.photos,acf.attributes,acf.video,terms,id",
      per_page: "100",
    });
    getPaginatedData("galleries", params, setGalleries);
  }, []);
  return galleries.sort(sortGalleriesAlphabetically);
};

type Market = WPTerm<"market">;
type Client = WPTerm<"client">;

export const useTerms = () => {
  const baseURL = "https://innovativefit.com/wp-json/wp/v2";
  const fetchAllMarkets = async (): Promise<Market[]> => {
    try {
      const res = await fetch(
        `${baseURL}/market?${
          new URLSearchParams({
            _fields: "id,name,slug,count",
            per_page: "100",
          }).toString()
        }`,
      );
      if (!res.ok) throw new Error("failed to load market terms");
      const json: Market[] = await res.json();
      return json.filter((m) => m.count > 0);
    } catch (e) {
      throw e;
    }
  };

  const fetchAllClients = async (): Promise<Client[]> => {
		const params = new URLSearchParams({
			_fields: "id,name,slug,count",
			per_page: "100",
		});
		try {
		const clients = await getPaginatedData<Client>("client", params)
		return clients.filter((m) => m.count > 0);
    } catch (e) {
      throw e;
    }
  };

  const [terms, setTerms] = useState({});

  const initializeTerms = async () => {
    const data = await Promise.all([fetchAllMarkets(), fetchAllClients()]);
    const [markets, clients] = await data;
    const activeMarkets = markets.map((m) => {
      return {
        ...m,
        active: true,
      };
    });
    setTerms({ markets: activeMarkets, clients });
  };

  useEffect(() => {
    initializeTerms();
  }, []);

  return terms;
};

export const QueryContext = createContext({
  query: new URLSearchParams(),
  setQuery: () => {},
} as { query: URLSearchParams; setQuery: StateUpdater<URLSearchParams> });

/**
 * Custom theme for Material UI
 */
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#682875",
    },
  },
});

/**
 * Get the video ID from a YouTube link
 */
export const getYouTubeID = (link: string) => {
  if (link.includes("youtu.be")) {
    return link.split("/").pop();
  } else if (link.includes("youtube.com")) {
    return link.split("?v=").pop();
  }
};
