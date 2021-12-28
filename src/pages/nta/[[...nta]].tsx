import { Box, Flex } from "@chakra-ui/react";
import { Map } from "@components/Map";
import { Header } from "@components/Header";
import { GeographySelect } from "@components/Map/GeographySelect";
import { Legend } from "@components/Legend";
import { IndicatorPanel } from "@components/IndicatorPanel";

const Nta = () => (
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

        <GeographySelect
          geography='borough'
          position={["relative", "absolute"]}
          top={["auto", 20]}
          left={["auto", 8]}
        />

        <IndicatorPanel />
  </Box>
);

export default Nta;
