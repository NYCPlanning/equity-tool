import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Map } from "@components/Map";
import { Header } from "@components/Header";
import { GeographySelect } from "@components/Map/GeographySelect";
import { Legend } from "@components/Legend";
import { IndicatorPanel } from "@components/IndicatorPanel";
import { useSelectedLayer } from "../../hooks/useSelectedLayer/useSelectedLayer";
import { useSelectedNta } from "@hooks/useSelectedNta";
import { useRouter } from "next/router";

const MapView = () => {
  const router = useRouter();

  const { map, showPanel } = router.query;

  const [ geography, geoid ] = map ? map : [ null, null];

  let selectedNta = useSelectedNta();

  let layers = useSelectedLayer();

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
          geography={geography}
          position={["relative", "absolute"]}
          top={["auto", 20]}
          left={["auto", 8]}
        />

        { showPanel === 'true' && 
          <IndicatorPanel
            selectedNta={selectedNta}
          />
        }
      </Flex>
    </Box>)
};

export default MapView;
