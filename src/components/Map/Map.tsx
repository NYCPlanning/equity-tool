import { DeckGL } from "@deck.gl/react";
import { DeckGLProps } from "@deck.gl/react/deckgl";
import ReactMapGL, {
  _MapContext as MapContext,
  NavigationControl,
} from "react-map-gl";
import { setDefaultCredentials, API_VERSIONS } from "@deck.gl/carto";
import baseMap from "@data/basemap.json";

import { Box } from "@chakra-ui/react";
import { useView } from "@hooks/useView";

setDefaultCredentials({
  apiVersion: API_VERSIONS.V2,
  username: process.env.NEXT_PUBLIC_CARTO_USERNAME,
  apiKey: process.env.NEXT_PUBLIC_CARTO_API_KEY,
});

type MapProps = Pick<DeckGLProps, "layers" | "parent">;

export const Map = ({ layers, parent }: MapProps) => {
  const view = useView();

  const INITIAL_VIEW_STATE = {
    longitude: -74.0008,
    latitude: 40.6838,
    zoom: 10.8,
    pitch: 0,
    bearing: 0,
  };

  // MapContext is necessary for navigation controls to work.
  // Likely because it holds the view state, and keeps Deck and
  // MapGL in sync with that singular state.
  // https://deck.gl/docs/api-reference/react/deckgl#react-context
  const map = (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      parent={parent}
      ContextProvider={MapContext.Provider}
    >
      <Box
        position="absolute"
        top={{
          base: view === "datatool" ? "5rem" : "1.3rem",
          lg: "5rem",
        }}
        left="2.1875rem"
      >
        <NavigationControl />
      </Box>

      <ReactMapGL
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle={baseMap}
      ></ReactMapGL>
    </DeckGL>
  );

  return map;
};
