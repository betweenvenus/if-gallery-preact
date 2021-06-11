/**
 * Fold all of these functions into api.ts later on
 */

import { WPTerm } from "../types/Gallery";
type Market = WPTerm<"market">;
type Client = WPTerm<"client">;

const baseURL =
    "https://innovativefitness.ahn2k5uj-liquidwebsites.com/wp-json/wp/v2";

export const fetchGalleries = async (): Promise<any> => {
    try {
        const res = await fetch(
            `${baseURL}/galleries?${new URLSearchParams({
                _fields: "title,acf.photos,terms,id",
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

export const fetchAllMarkets = async (): Promise<Market[]> => {
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

export const fetchAllClients = async (): Promise<Client[]> => {
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