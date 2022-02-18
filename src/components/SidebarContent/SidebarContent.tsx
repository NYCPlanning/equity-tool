import React from "react";
import { Box } from "@chakra-ui/react";
import { GeographyInfo } from "@components/GeographyInfo";
import WelcomeContent from "@components/WelcomeContent";
import WelcomeFooter from "@components/WelcomeFooter";
import { DRISelection } from "@components/SidebarContent/DRISelection";
import { useView } from "@hooks/useView";
import { useRouter } from "next/router";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";

export const SidebarContent = () => {
  const { geography, geoid } = useMapSubrouteInfo();

  if (geoid != null || geography === "citywide") {
    return (
      <>
        <GeographyInfo />
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
