import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { theme, useQueryString, useGalleryData, useTerms } from "../util";
import GalleryList from "./GalleryList";
import { ThemeProvider } from "@material-ui/core";
import { Gallery, WPTerm } from "../types/Gallery";
import SingleGallery from "./GalleryList/SingleGallery";
import FilterArea from "./FilterArea";
import FilterMenu from "./FilterArea/FilterMenu";
import MarketChip from "./FilterArea/MarketFilter/MarketChip";

const renderFilters = (mode: string, terms: any) => {
	switch(mode) {
		case 'market':
			return (terms.markets.map((m: WPTerm<"market">) => <MarketChip market={m} />))
		case 'client':
			return (terms.clients.map((c) => <span>{c.name}</span>))
		default:
			return "sadfasdfd";
	}
}

export const App = () => {
	const query = useQueryString(location.href);
	const initGalleries = useGalleryData();
	const initTerms = useTerms();
	const [galleries, setGalleries] = useState<Gallery[]>([])
	const [terms, setTerms] = useState({});
	useEffect(() => {
		setGalleries(initGalleries);
	}, [initGalleries])
	useEffect(() => {
		setTerms(initTerms);
	}, [initTerms])
	const [mode, setMode] = useState("");
	return (
		<ThemeProvider theme={theme}>
			<FilterArea>
				<FilterMenu mode={mode} setMode={setMode} />
				{renderFilters(mode, terms)}
			</FilterArea>
			<GalleryList>
				{galleries.length > 0 && galleries.map(g => <li><SingleGallery gallery={g} /></li>)}
			</GalleryList>
		</ThemeProvider>
	)
}