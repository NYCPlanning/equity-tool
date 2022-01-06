import { Box, Flex } from "@chakra-ui/react";
import { Map } from "@components/Map";
import { Header } from "@components/Header";
import { Legend } from "@components/Legend";
import { IndicatorPanel } from "@components/IndicatorPanel";
import { useRouter } from "next/router";

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
  const [geography, geoid] = subroutes ? subroutes : [null, null];

  return (
    <Box height="100vh">
      <Header />
      <Map />
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
