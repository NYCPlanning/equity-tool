import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import {
  CartoLayer,
  setDefaultCredentials,
  API_VERSIONS,
  MAP_TYPES,
} from "@deck.gl/carto";
import baseMap from "@data/basemap.json";

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

  const router = useRouter();

  const layers = [
    new CartoLayer({
      type: MAP_TYPES.QUERY,
      id: "nta",
      data: `SELECT *, nta2020 as id, ntaname as label FROM dcp_nta_2020 WHERE ntatype = '0'`,
      uniqueIdProperty: "id",
      getLineColor: [100, 100, 100, 255],
      getFillColor: [0, 0, 0, 0],
      lineWidthMinPixels: 3,
      stroked: true,
      pickable: true,
      onClick: (info: any) => {
        const id: any = info?.object?.properties?.id
          ? info.object.properties.id
          : null;
        if (typeof id === "string") {
          router.push(`/nta/${id}`, undefined, { shallow: true });
        }
      },
    }),
  ];

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
