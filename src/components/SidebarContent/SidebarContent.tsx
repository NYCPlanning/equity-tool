import React from "react";
import { Box, Divider, Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { GeographyInfo } from "@components/GeographyInfo";
import WelcomeContent from "@components/WelcomeContent";
import WelcomeFooter from "@components/WelcomeFooter";
import { DRISelection } from "@components/SidebarContent/DRISelection";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";
import { useClearSelection } from "@helpers/useClearSelection";
import { NYC } from "@constants/geoid";
import { Geography } from "@constants/geography";
import { CategoryMenu } from "@components/CategoryMenu";

export const SidebarContent = () => {
  const { view, geoid, geography } = useMapSubrouteInfo();
  const clearSelection = useClearSelection();

  if (geoid != null) {
    return (
      <>
        <Box padding="2.5rem 1rem 1.5rem 1rem">
          <GeographyInfo
            geoid={geoid}
            geography={geography}
            fontSize="1.5625rem"
            isTruncated
          />
        </Box>
        {geoid !== NYC && (
          <Button
            mt={"0.25rem"}
            rightIcon={<CloseIcon />}
            variant="outline"
            size="xs"
            onClick={clearSelection}
            alignSelf={"start"}
          >
            Clear Selection
          </Button>
        )}
        <Divider color={"gray.200"} my={"1.5rem"} />
        {view === "dri" && <DRISelection />}
        {view === "datatool" && (
          <CategoryMenu
            geography={geography ? geography : Geography.CITYWIDE}
            geoid={geography && geoid ? geoid : NYC}
          />
        )}
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
