import { Box, useMediaQuery } from "@chakra-ui/react";
import { Map } from "@components/Map";
import { Header } from "@components/Header";
import { Legend } from "@components/Legend";
import { IndicatorPanel } from "@components/IndicatorPanel";

const Nta = () => {
  const [isMobile] = useMediaQuery("(max-width: 640px)");

  return (
    <Box height="100vh">
      <Header />
      <Map />
      {!isMobile && (
        <Legend position="absolute" left={8} bottom={8} w="215px" />
      )}
      <IndicatorPanel />
    </Box>
  );
};

export default Nta;
