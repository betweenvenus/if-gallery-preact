import { createContext } from "preact";
import { useState, useEffect, StateUpdater } from "preact/hooks";
import { Gallery, GroupedGallery, WPTerm } from "../types/Gallery";
import { createMuiTheme } from "@material-ui/core";

// export const filterGalleriesByTerms = (
//   galleries: GroupedGallery,
//   terms: string[]
// ): GroupedGallery | {} => {
//   return Object.keys(galleries).reduce((obj, slug) => {
// 		if (terms.includes(slug)) {
// 			obj[slug] = galleries[slug];
// 		}
// 		return obj;
// 	}, {} as any);
// };

export const useQueryString = (url: string) => {
	const encodedURL = new URL(url);
	const [query, setQuery] = useState(encodedURL.search);
	return query;
}

/**
 * Fetches gallery data from API and returns
 * useState variable and setter
 */
export const useGalleryData = (): Gallery[] => {
	const baseURL =
			"https://innovativefit.com/wp-json/wp/v2";
	const [galleries, setGalleries] = useState<Gallery[]>([]);
	useEffect(() => {
		const initializeGalleries = async () => {
			try {
        const res = await fetch(
            `${baseURL}/galleries?${new URLSearchParams({
                _fields: "title,date,slug,acf.photos,acf.attributes,acf.video,terms,id",
                per_page: "100",
            }).toString()}`
        );
        if (!res.ok) throw new Error("fetchGallery response error");
        const allGalleries = await res.json();
				setGalleries(allGalleries);
    } catch (e) {
        console.error(e);
    }
		};
		initializeGalleries();
	}, [])
	return galleries.sort((a, b) => (a.slug.toUpperCase() > b.slug.toUpperCase()) ? 1 : -1);
}

type Market = WPTerm<"market">;
type Client = WPTerm<"client">;

export const useTerms = () => {
	const baseURL =
			"https://innovativefit.com/wp-json/wp/v2";
	const fetchAllMarkets = async (): Promise<Market[]> => {
    try {
        const res = await fetch(
            `${baseURL}/market?${new URLSearchParams({
                _fields: "id,name,slug,count",
								per_page: "100"
            }).toString()}`
        );
        if (!res.ok) throw new Error("failed to load market terms");
        const json: Market[]  = await res.json();
        return json.filter(m => m.count > 0);
    } catch (e) {
      return e;
    }
};

	const fetchAllClients = async (): Promise<Client[]> => {
    try {
        const res = await fetch(
            `${baseURL}/client?${new URLSearchParams({
                _fields: "id,name,slug,count",
								per_page: "100"
            }).toString()}`
        );
        if (!res.ok) throw new Error("failed to load client terms");
        const json: Client[]  = await res.json();
        return json.filter(m => m.count > 0);
    } catch (e) {
      return e;
    }
	};

	const [terms, setTerms] = useState({});

	const initializeTerms = async () => {
		const data = await Promise.all([fetchAllMarkets(), fetchAllClients()]);
		const [markets, clients] = await data;
		const activeMarkets = markets.map((m) => {
			return {
				...m,
				active: true
			}
		});
		setTerms({markets: activeMarkets, clients});
	}

	useEffect(() => {
		initializeTerms();
	}, []);

	return terms;
}

export const QueryContext = createContext({
	query: new URLSearchParams(),
	setQuery: () => {}
} as {query: URLSearchParams, setQuery: StateUpdater<URLSearchParams>});

/**
 * Custom theme for Material UI
 */
export const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#682875"
		}
	}
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
}