import { useRouter } from "next/router";
import { Box, VStack, Button, Text } from "@chakra-ui/react";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import baseMap from "@data/basemap.json";
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

export interface MapProps {
  children?: React.ReactNode;
}

export const Map = ({ children = null }: MapProps) => {
  const INITIAL_VIEW_STATE = {
    longitude: -73.986607,
    latitude: 40.691869,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  };

  const router = useRouter();
  const { nta } = router.query;
  const selectedNta: string | null = nta && nta?.length > 0 ? nta[0] : null;

  const layers = [
    new CartoLayer({
      type: MAP_TYPES.QUERY,
      id: "dcpNta",
      data: `SELECT *, ntacode as id FROM dcp_nta`,
      uniqueIdProperty: "id",
      getLineColor: [100, 100, 100, 255],
      getFillColor: (feature: any) =>
        feature?.properties?.id === selectedNta
          ? [255, 0, 0, 50]
          : [0, 0, 0, 1],
      lineWidthMinPixels: 3,
      stroked: true,
      pickable: true,
      onClick: (info: any) => {
        const id = info && info?.object?.properties?.id;
        if (id && typeof id === "string" && id !== selectedNta) {
          router.push(`/nta/${id}`, undefined, { shallow: true });
        }
      },
      updateTriggers: {
        getFillColor: selectedNta,
      },
    }),
  ];

  return (
    <Box h="100vh" w="100vh">
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
      >
        <StaticMap
          mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          mapStyle={baseMap}
        />
        {children}
      </DeckGL>
    </Box>
  );
};
