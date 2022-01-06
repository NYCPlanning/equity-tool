import { useRouter } from "next/router";

import { Box, Flex } from "@chakra-ui/react";
import { Map } from "@components/Map";
import { Header } from "@components/Header";
import { Legend } from "@components/Legend";
import { IndicatorPanel } from "@components/IndicatorPanel";

import { useSelectedLayer } from "../../hooks/useSelectedLayer/useSelectedLayer";

/*
  /Map route

  Subroutes:
    /map/geography
    /map/geography/geoid
*/
const MapPage = () => {
  const router = useRouter();

  const { subroutes } = router.query;

  // acquire subroute info, if any
  let [geography] = subroutes ? subroutes : [null, null];

  geography =
    typeof geography === "string"
      ? geography
      : geography !== null
      ? geography[0]
      : null;

  const layers = useSelectedLayer(geography);

  return (
    <Box height="100vh">
      <Header />
      <Map layers={layers} />

      <Flex direction="column" justify="end" height="100%">
        <Legend
          position={["relative", "absolute"]}
          left={["auto", 8]}
          bottom={["auto", 8]}
          w={["100%", "215px"]}
        />

        <IndicatorPanel />
      </Flex>
    </Box>
  );
};

export default MapPage;
