import React from "react";
import dridata from "@data/DRI_Subindices_Indicators.json";
import { Heading, Box } from "@chakra-ui/react";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";

export const DRISelection = () => {
  const { geoid } = useMapSubrouteInfo();

  const selectedDRIdata = dridata.find((nta: any) => nta.ntacode === geoid);

  return (
    <>
      <Box height="100%" justify="space-between">
        <Heading>{geoid}</Heading>
        <Heading>{selectedDRIdata?.ntaname}</Heading>
      </Box>
    </>
  );
};
