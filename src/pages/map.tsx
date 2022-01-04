import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Map } from "@components/Map";
import { Header } from "@components/Header";
import { GeographySelect } from "@components/Map/GeographySelect";
import { Legend } from "@components/Legend";
import { IndicatorPanel } from "@components/IndicatorPanel";
import { useSelectedGeography } from "../hooks/useSelectedGeography/useSelectedGeography";
import { useSelectedNta } from "@hooks/useSelectedNta";
import { useRouter } from "next/router";

const MapView = () => {
  const router = useRouter();

  const [ layers, setLayers ] = useState([]);
  const [ selectedNta, setSelectedNta ] = useState(null);

  useSelectedNta(setSelectedNta);
  useSelectedGeography(setLayers, selectedNta);

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
