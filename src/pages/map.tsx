import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Map } from "@components/Map";
import { Header } from "@components/Header";
import { GeographySelect } from "@components/Map/GeographySelect";
import { Legend } from "@components/Legend";
import { IndicatorPanel } from "@components/IndicatorPanel";
import { useSelectedLayer } from "../hooks/useSelectedLayer/useSelectedLayer";
import { useSelectedNta } from "@hooks/useSelectedNta";
import { useRouter } from "next/router";

const MapView = () => {
  const router = useRouter();

  const [ layers, setLayers ] = useState([]);
  const [ selectedNta, setSelectedNta ] = useState(null);
  // necessary to distill router.query.geography down to string type, instead of type <string|string[]>
  const [ selectedGeography, setSelectedGeography ] = useState('census');

  useEffect(() => {
    const { geography } = router.query;

    if (typeof geography === 'string') {
      setSelectedGeography(geography)
    }
  }, [router.query.geography]);

  useEffect(() => {
    console.log("hello?1")
    useSelectedNta(setSelectedNta, router);
    console.log("Selected NTA: ", selectedNta);
  }, [router.query.geoid]);

  useEffect(() => {
    useSelectedLayer(setLayers, router);
  }, [router.query.geoid]);

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
          geography={selectedGeography}
          position={["relative", "absolute"]}
          top={["auto", 20]}
          left={["auto", 8]}
        />

        <IndicatorPanel
          selectedNta={selectedNta}
        />
      </Flex>
    </Box>)
};

export default MapView;
