import { useState } from "react";
import { Box } from "@chakra-ui/react";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import {
  CartoLayer,
  setDefaultCredentials,
  API_VERSIONS,
  MAP_TYPES,
} from "@deck.gl/carto";

setDefaultCredentials({
  apiVersion: API_VERSIONS.V2,
  username: process.env.NEXT_PUBLIC_CARTO_USERNAME,
  apiKey: process.env.NEXT_PUBLIC_CARTO_API_KEY,
});

export const Map = () => {
  const INITIAL_VIEW_STATE = {
    longitude: -73.986607,
    latitude: 40.691869,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  };

  const [layers, setLayers] = useState([
    new CartoLayer({
      type: MAP_TYPES.QUERY,
      id: "dcpNta",
      data: `SELECT * FROM dcp_nta`,
      getLineColor: [100, 100, 100, 255],
      getFillColor: [0, 0, 0, 1],
      lineWidthMinPixels: 3,
      stroked: true,
      pickable: true,
    }),
  ]);

  return (
    <Box h="100%" w="100%">
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
      >
        <StaticMap
          mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        />
      </DeckGL>
    </Box>
  );
};
