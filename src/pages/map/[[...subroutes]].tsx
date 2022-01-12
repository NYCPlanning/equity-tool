import { useRouter } from "next/router";

import { useRef } from "react";

import { Box, Flex } from "@chakra-ui/react";
import { Map } from "@components/Map";
import { Header } from "@components/Header";
import { IndicatorPanel } from "@components/IndicatorPanel";

import { useSelectedLayer } from "../../hooks/useSelectedLayer/useSelectedLayer";
import { useIndicatorRecord } from "../../hooks/useIndicatorRecord/useIndicatorRecord";

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
  const [geographyParam, geoid] = subroutes ? subroutes : [null, null];

  const geography =
    typeof geographyParam === "string"
      ? geographyParam
      : geographyParam !== null
      ? geographyParam[0]
      : null;

  const layers = useSelectedLayer(geography);

  const indicatorRecord = useIndicatorRecord(geoid);

  const mapContainer = useRef(null);

  return (
    <Flex height="100vh" direction="column" bg="gray.100">
      <Header />

      <Flex direction="row" flex="auto">
        <Box flex="1" height="100%" p="10px">
          <IndicatorPanel indicatorRecord={indicatorRecord} />
        </Box>

        <Box flex="2" height="100%" p="10px">
          <Box
            ref={mapContainer}
            position="relative"
            height="100%"
            rounded="lg"
          >
            <Map layers={layers} mapParent={mapContainer} />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default MapPage;
