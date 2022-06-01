import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { theme, useGalleryData, useTerms, QueryContext } from "../util";
import GalleryList from "./GalleryList";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  ThemeProvider,
} from "@material-ui/core";
// Object destructuring import causes build to fail
// for some reason ¯\_(ツ)_/¯
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Gallery, WPTerm } from "../types/Gallery";
import SingleGallery from "./GalleryList/SingleGallery";
import FilterArea from "./FilterArea";
import FilterMenu from "./FilterArea/FilterMenu";
import MarketChip from "./FilterArea/MarketFilter/MarketChip";
import { groupBy } from "lodash";
import { decode } from "he";

/*

Helper function for adding or removing a market
from the list of active markets, currently unused.

const toggleMarket = (
  terms: { markets: WPTerm<"market">[]; clients: WPTerm<"client">[] },
  slug: string
) => {
  const copy = { ...terms };
  const index = copy.markets.findIndex((market) => {
    return market.slug === slug;
  });
  copy.markets[index].active = !copy.markets[index].active;
  return copy;
};

*/

const renderFilters = (
  mode: string,
  terms: any
) => {
  switch (mode) {
    case "market":
      return terms.markets.map((m: WPTerm<"market">) => (
        <a href={"#" + m.slug}>
          <MarketChip market={m} />
        </a>
      ));
    case "client":
      const clients = groupBy(terms.clients, "slug[0]");
      return (
        <div className="clients-alphabetical">
          {Object.keys(clients).map((letter) => {
            return (
              <div class="client-links">
                <span className="client-link-heading">
                  {letter.toUpperCase()}
                </span>
                <ul>
                  {clients[letter].map((client) => {
                    return (
                      <li>
                        <a className="client-link" href={"#" + client.slug}>
                          {decode(client.name)}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      );
    default:
      return "";
  }
};

export const App = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [terms, setTerms] = useState<any>({});
  const [mode, setMode] = useState("default");
  const [selectedGallery, setSelectedGallery] = useState(0);
  const initGalleries = useGalleryData();
  const initTerms = useTerms();

  useEffect(() => {
    setGalleries(initGalleries);
  }, [initGalleries]);

  useEffect(() => {
    setTerms(initTerms);
  }, [initTerms]);

  const [query, setQuery] = useState(
    new URLSearchParams(new URL(location.href).search)
  );
  // useEffect(() => {
  //   const url = new URL(location.href);
  //   url.searchParams.set();
  //   history.pushState({}, "", url);
  // }, [query]);

  const [attribute, setAttribute] = useState("all");

  useEffect(() => {
    if (query.has("selected")) {
      // setSelectedGallery(parseInt(query.get("selected") as string));
      //@ts-ignore
      setSelectedGallery();
      // galleries.find((g) => g.slug === query.get("selected")).id
    }
  }, [query]);

	useEffect(() => {
		window.addEventListener("hashchange", () => {
			setSelectedGallery(0);
		})
	}, [])

  const [galleriesByMarket, setGalleriesByMarket] = useState({});

  useEffect(() => {
    if (mode === "market") {
      setGalleriesByMarket(groupBy(galleries, "terms.market[0].slug"));
    }
  }, [mode]);

  const [galleriesByClient, setGalleriesByClient] = useState({});

  useEffect(() => {
    if (mode === "client") {
      setGalleriesByClient(groupBy(galleries, "terms.client[0].slug"));
    }
  }, [mode]);

  // const [defaultSort, setDefaultSort] = useState("alphabetically");

  // useEffect(() => {
  //   if (galleries.length > 0) {
  //     if (defaultSort === "alphabetically") {
	// 			console.log("should be alphabetically: " + defaultSort)
  //       setGalleries(
  //         galleries.sort((a, b) =>
  //           a.slug.toUpperCase() > b.slug.toUpperCase() ? 1 : -1
  //         )
  //       );
  //     } else if (defaultSort === "date") {
	// 			console.log("should be date: " + defaultSort)
  //       setGalleries(
  //         galleries.sort(
  //           (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  //         )
  //       );
  //     }
  //   }
  // }, [defaultSort]);

  return (
    <ThemeProvider theme={theme}>
      <QueryContext.Provider value={{ query, setQuery }}>
        <Accordion
          defaultExpanded={true}
          classes={{ root: "filter-selector filter-accordion" }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h1>Organize galleries</h1>
          </AccordionSummary>
          <AccordionDetails>
            <FilterArea>
              <div className="filter-selector-wrapper">
                <FilterMenu mode={mode} setMode={setMode} />
                <div>
                  <ul className="filter-selector-items">
                    {Object.keys(terms).length > 0 &&
                      renderFilters(mode, terms)}
                  </ul>
                </div>
              </div>
              <div className="filters-right">
                {/* {mode === "default" && (
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Sort by:</FormLabel>
                    <RadioGroup
                      name="sort-by"
                      value={defaultSort}
                      row={true}
                      onChange={(e) => setDefaultSort(e.target.value)}
                    >
                      <FormControlLabel
                        value="alphabetically"
                        control={<Radio color="primary" />}
                        label="By title"
                      />
                      <FormControlLabel
                        value="date"
                        control={<Radio color="primary" />}
                        label="Newest first"
                      />
                    </RadioGroup>
                  </FormControl>
                )} */}
                <FormControl component="fieldset">
                  <FormLabel component="legend">Special attributes</FormLabel>
                  <RadioGroup
                    aria-label="gallery-attributes"
                    name="attributes"
                    value={attribute}
                    row={true}
                    onChange={(e) => setAttribute(e.target.value)}
                  >
                    <FormControlLabel
                      value="all"
                      control={<Radio color="primary" />}
                      label="All galleries"
                    />
                    <FormControlLabel
                      value="custom_item"
                      control={<Radio color="primary" />}
                      label="Custom designs"
                    />
                    <FormControlLabel
                      value="unique_item"
                      control={<Radio color="primary" />}
                      label="Unique products"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </FilterArea>
          </AccordionDetails>
        </Accordion>
        <GalleryList>
          {mode === "default" &&
            galleries.length > 0 &&
            Object.keys(terms).length > 0 &&
            // @ts-ignore
            galleries.map((g) => {
              // if (
              //   terms.markets.find(
              //     (market) => market.slug === g.terms.market[0].slug
              //   ).active )
              {
                return (
                  <li>
                    <SingleGallery
                      gallery={g}
                      selectedGallery={selectedGallery}
                      setSelectedGallery={setSelectedGallery}
                      attribute={attribute}
                    />
                  </li>
                );
              }
            })}
        </GalleryList>
        {mode === "market" &&
          galleries.length > 0 &&
          Object.keys(terms).length > 0 &&
          Object.keys(galleriesByMarket).sort().map((term) => {
            /**
             * Below: only returns the market section if
             * the market is currently set to active.
             * Use this if client wants to filter by markets.
             */
            // if (
            //   terms.markets.find(
            //     (market) =>
            //       market.slug ===
            //       galleriesByMarket[term][0].terms.market[0].slug
            //   ).active
            // )
            return (
              <section>
                {/* if you're bored and looking for something to refactor, please god
										let this nonsense be it */}
                <h1
                  className="group-heading"
                  id={galleriesByMarket[term][0].terms.market.length > 0 && galleriesByMarket[term][0].terms.market[0].slug}
                >
                  {galleriesByMarket[term][0].terms.market.length > 0 && decode(galleriesByMarket[term][0].terms.market[0].name)}
                </h1>
                <GalleryList>
                  {galleriesByMarket[term].length > 0 && galleriesByMarket[term].map((g) => {
                    return (
                      <li>
                        <SingleGallery
                          gallery={g}
                          selectedGallery={selectedGallery}
                          setSelectedGallery={setSelectedGallery}
                          attribute={attribute}
                        />
                      </li>
                    );
                  })}
                </GalleryList>
              </section>
            );
          })}
        {mode === "client" &&
          Object.keys(terms).length > 0 &&
          Object.keys(galleriesByClient)
            .sort()
            .map((term) => {
              return (
                <section>
                  <h1
                    className="group-heading"
                    id={galleriesByClient[term][0].terms.client[0] && galleriesByClient[term][0].terms.client[0].slug}
                  >
                    {galleriesByClient[term][0].terms.client[0] && decode(galleriesByClient[term][0].terms.client[0].name)}
                  </h1>
                  <GalleryList>
                    {galleriesByClient[term] && galleriesByClient[term].map((g) => {
                      return (
                        <li>
                          <SingleGallery
                            gallery={g}
                            selectedGallery={selectedGallery}
                            setSelectedGallery={setSelectedGallery}
                            attribute={attribute}
                          />
                        </li>
                      );
                    })}
                  </GalleryList>
                </section>
              );
            })}
      </QueryContext.Provider>
    </ThemeProvider>
  );
};
