import { useRouter } from "next/router";
import { Box, Flex } from "@chakra-ui/react";
import { Map } from "@components/Map";
import { Header } from "@components/Header";
import { GeographySelect } from "@components/Map/GeographySelect";
import { Legend } from "@components/Legend";
import { IndicatorPanel } from "@components/IndicatorPanel";
import {
  CartoLayer,
  MAP_TYPES,
} from "@deck.gl/carto";
import { scaleSequential } from "d3-scale";
import { rgb } from "d3-color";
import { interpolateRgb } from "d3-interpolate";

import ntas from "@data/ntas.json";
import { useSelectedNta } from "../../hooks/useSelectedNta";

const Nta = () => {
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
    <Box height="100vh">
      <Header />
      <Map
        layers={layers}
      />

      <Flex direction="column" justify="end" height="100%">
        <Legend
          position={["relative", "absolute"]}
          left={["auto", 8]}
          bottom={["auto", 8]}
          w={["100%", "215px"]}
        />

        <GeographySelect
          geography='borough'
          position={["relative", "absolute"]}
          top={["auto", 20]}
          left={["auto", 8]}
        />

        <IndicatorPanel />
      </Flex>
    </Box>)
};

export default Nta;
