import { h } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";
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

const toggleMarket = (
  terms: { markets: WPTerm<"market">[]; clients: WPTerm<"client">[] },
  slug: string
) => {
  const copy = { ...terms };
  // console.log(copy.markets.find((market) => market.slug === slug));
  const index = copy.markets.findIndex((market) => {
    return market.slug === slug;
  });
  copy.markets[index].active = !copy.markets[index].active;
  return copy;
};

const renderFilters = (
  mode: string,
  terms: { markets: WPTerm<"market">[]; clients: WPTerm<"client">[] },
  setTerms: StateUpdater<any>
) => {
  switch (mode) {
    case "market":
      return terms.markets.map((m: WPTerm<"market">) => (
        <li onClick={() => setTerms(toggleMarket(terms, m.slug))}>
          <MarketChip market={m} />
        </li>
      ));
    case "client":
      return terms.clients.map((c: WPTerm<"client">) => (
        <a className="client-link" href={"#" + c.slug}>{decode(c.name)}</a>
      ));
    default:
      return "";
  }
};

export const App = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [terms, setTerms] = useState({});
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
  const getGallerySlugByID = (id: number) => {
    const gallery = galleries.find((g) => g.id === id);
    if (gallery) {
      return gallery.slug;
    }
  };

  const [attributes, setAttributes] = useState("all");

  useEffect(() => {
    if (query.has("selected")) {
      // setSelectedGallery(parseInt(query.get("selected") as string));
      //@ts-ignore
      setSelectedGallery();
      // galleries.find((g) => g.slug === query.get("selected")).id
    }
  }, [query]);

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

  return (
    <ThemeProvider theme={theme}>
      <QueryContext.Provider value={{ query, setQuery }}>
        <Accordion classes={{ root: "filter-selector filter-accordion" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h1>Filter Galleries</h1>
          </AccordionSummary>
          <AccordionDetails>
            <FilterArea>
              <div className="filter-selector-wrapper">
                <FilterMenu
                  mode={mode}
                  setMode={setMode}
                  setGalleries={setGalleries}
                />
                <div>
                  <ul className="filter-selector-items">
                    {Object.keys(terms).length > 0 &&
                      renderFilters(mode, terms, setTerms)}
                  </ul>
                </div>
              </div>
              <FormControl component="fieldset">
                <FormLabel component="legend">Special attributes</FormLabel>
                <RadioGroup
                  aria-label="gallery-attributes"
                  name="attributes"
                  value={attributes}
                  row={true}
                  onChange={(e) => setAttributes(e.target.value)}
                >
                  <FormControlLabel
                    value="all"
                    control={<Radio color="primary" />}
                    label="All galleries"
                  />
                  <FormControlLabel
                    value="custom"
                    control={<Radio color="primary" />}
                    label="Custom designs"
                  />
                  <FormControlLabel
                    value="unique"
                    control={<Radio color="primary" />}
                    label="Unique products"
                  />
                </RadioGroup>
              </FormControl>
            </FilterArea>
          </AccordionDetails>
        </Accordion>
        <GalleryList>
          {mode === "default" &&
            galleries.length > 0 &&
            Object.keys(terms).length > 0 &&
            galleries.map((g) => {
              if (
                terms.markets.find(
                  (market) => market.slug === g.terms.market[0].slug
                ).active
              ) {
                return (
                  <li>
                    <SingleGallery
                      gallery={g}
                      selectedGallery={selectedGallery}
                      setSelectedGallery={setSelectedGallery}
                    />
                  </li>
                );
              }
            })}
          {mode === "market" &&
            galleries.length > 0 &&
            Object.keys(terms).length > 0 &&
            Object.keys(galleriesByMarket).map((term) => {
              console.log(galleriesByMarket[term]);
              if (
                terms.markets.find(
                  (market) =>
                    market.slug ===
                    galleriesByMarket[term][0].terms.market[0].slug
                ).active
              )
                return (
                  <section>
                    <h1 className="group-heading">
                      {decode(galleriesByMarket[term][0].terms.market[0].name)}
                    </h1>
                    <GalleryList>
                      {galleriesByMarket[term].map((g) => {
                        return (
                          <li>
                            <SingleGallery
                              gallery={g}
                              selectedGallery={selectedGallery}
                              setSelectedGallery={setSelectedGallery}
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
            Object.keys(galleriesByClient).map((term) => {
              return (
                <section>
                  <h1 className="group-heading" id={galleriesByClient[term][0].terms.client[0].slug}>
                    {decode(galleriesByClient[term][0].terms.client[0].name)}
                  </h1>
                  <GalleryList>
                    {galleriesByClient[term].map((g) => {
                      return (
                        <li>
                          <SingleGallery
                            gallery={g}
                            selectedGallery={selectedGallery}
                            setSelectedGallery={setSelectedGallery}
                          />
                        </li>
                      );
                    })}
                  </GalleryList>
                </section>
              );
            })}
        </GalleryList>
      </QueryContext.Provider>
    </ThemeProvider>
  );
};
