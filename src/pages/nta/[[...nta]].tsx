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

const Nta = () => {
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
