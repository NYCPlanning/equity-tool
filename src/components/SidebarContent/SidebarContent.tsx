import React from "react";
import { Box } from "@chakra-ui/react";
import { GeographyInfo } from "@components/GeographyInfo";
import WelcomeContent from "@components/WelcomeContent";
import WelcomeFooter from "@components/WelcomeFooter";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";
import { DRISelection } from "@components/SidebarContent/DRISelection";

export const SidebarContent = () => {
  const { view, geoid } = useMapSubrouteInfo();

  if (geoid != null) {
    return (
      <>
        <GeographyInfo />
        <hr />
        {view === "dri" && <DRISelection />}
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
