import { Box } from "@chakra-ui/react";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { setDefaultCredentials, API_VERSIONS } from "@deck.gl/carto";
import baseMap from "@data/basemap.json";
import { CartoLayer } from "@deck.gl/carto";

setDefaultCredentials({
  apiVersion: API_VERSIONS.V2,
  username: process.env.NEXT_PUBLIC_CARTO_USERNAME,
  apiKey: process.env.NEXT_PUBLIC_CARTO_API_KEY,
});

interface MapProps {
  layers: CartoLayer<any, any>[];
}

export const Map = ({ layers }: MapProps) => {
  const INITIAL_VIEW_STATE = {
    longitude: -73.986607,
    latitude: 40.691869,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  };

  return (
    <Box h="100%" w="100%" position="absolute" bottom="0" left="0">
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        width="100%"
        height="100%"
      >
        <StaticMap
          mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          mapStyle={baseMap}
        />
      </DeckGL>
    </Box>
  );
};
