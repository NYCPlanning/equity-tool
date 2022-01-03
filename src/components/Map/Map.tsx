import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { scaleSequential } from "d3-scale";
import { rgb } from "d3-color";
import { interpolateRgb } from "d3-interpolate";
import {
  CartoLayer,
  setDefaultCredentials,
  API_VERSIONS,
  MAP_TYPES,
} from "@deck.gl/carto";
import baseMap from "@data/basemap.json";
import { ntas } from "@data/ntas";
import { useSelectedNta } from "@hooks/useSelectedNta";

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

  const scale = scaleSequential().domain([0, 100]);
  const interpolate = interpolateRgb("#f4f4b4", "#d44932");
  const router = useRouter();
  const selectedNta = useSelectedNta();

  const layers = [
    new CartoLayer({
      type: MAP_TYPES.QUERY,
      id: "nta",
      data: `SELECT *, nta2020 as id, ntaname as label FROM dcp_nta_2020 WHERE ntatype = '0'`,
      uniqueIdProperty: "id",
      getLineColor: [100, 100, 100, 255],
      getFillColor: (feature: any) => {
        if (feature?.properties?.id) {
          const id: keyof typeof ntas = feature?.properties?.id;
          if (typeof ntas[id] !== "undefined") {
            const color = rgb(interpolate(scale(ntas[id].displacementRisk)));
            return [color.r, color.g, color.b, 100];
          }
          return [0, 0, 0, 0];
        }
        return [0, 0, 0, 0];
      },
      lineWidthMinPixels: 3,
      stroked: true,
      pickable: true,
      onClick: (info: any) => {
        const id: any = info?.object?.properties?.id
          ? info.object.properties.id
          : null;
        if (
          selectedNta === null ||
          (typeof id === "string" && id !== selectedNta.id)
        ) {
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
