/**
 * Fold all of these functions into api.ts later on
 */

import { WPTerm } from "../types/Gallery";

const baseURL =
    "https://innovativefitness.ahn2k5uj-liquidwebsites.com/wp-json/wp/v2";

export const fetchGalleries = async (): Promise<any> => {
    try {
        const res = await fetch(
            `${baseURL}/galleries?${new URLSearchParams({
                _fields: "title,acf.photos,terms",
                per_page: "100",
            }).toString()}`
        );
        if (!res.ok) throw new Error("fetchGallery response error");
        const json = await res.json();
        return json;
    } catch (e) {
        console.error(e);
    }
};

export const fetchAllMarkets = async (): Promise<WPTerm<"market">[]> => {
    try {
        const res = await fetch(
            `${baseURL}/market?${new URLSearchParams({
                _fields: "id,name,slug",
            }).toString()}`
        );
        if (!res.ok) throw new Error("failed to load market terms");
        const json  = await res.json();
        return json;
    } catch (e) {
      return e;
    }
};