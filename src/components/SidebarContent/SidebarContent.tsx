import React from "react";
import { Box } from "@chakra-ui/react";
import { DataToolGeographyInfo } from "@components/DataTool";
import WelcomeContent from "@components/WelcomeContent";
import WelcomeFooter from "@components/WelcomeFooter";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";

export const SidebarContent = () => {
  const { geography, geoid } = useMapSubrouteInfo();

  if (geoid !== null || geography === "citywide") {
    return (
      <>
        <DataToolGeographyInfo />
        <hr />
      </>
    );
  }

  return (
    <>
      <Box height="100%" justify="space-between">
        <WelcomeContent />
      </Box>
      <Box>
        <WelcomeFooter />
      </Box>
    </>
  );
};
