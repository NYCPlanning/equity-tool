import React from "react";
import { Heading, Box } from "@chakra-ui/react";
import { DataToolGeographyInfo } from "./DataTool/GeographyInfo";
import WelcomeContent from "@components/WelcomeContent";
import WelcomeFooter from "@components/WelcomeFooter";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";

export const SidebarContent = () => {
  const { geoid } = useMapSubrouteInfo();

  if (geoid !== null) {
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
        <Heading>Welcome!</Heading>
        <br />
        <WelcomeContent />
      </Box>
      <Box>
        <WelcomeFooter />
      </Box>
    </>
  );
};
