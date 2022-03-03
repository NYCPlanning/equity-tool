import React from "react";
import { Box, Divider } from "@chakra-ui/react";
import { GeographyInfo } from "@components/GeographyInfo";
import WelcomeContent from "@components/WelcomeContent";
import WelcomeFooter from "@components/WelcomeFooter";
import { DRISelection } from "@components/SidebarContent/DRISelection";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";
import { CategoryMenu } from "@components/CategoryMenu";
import { Geography } from "@constants/geography";
import { NYC } from "@constants/geoid";

export const DrawerContent = () => {
  const { view, geoid, geography } = useMapSubrouteInfo();

  if (geoid !== null) {
    return (
      <>
        <GeographyInfo
          geoid={geoid}
          geography={geography}
          fontSize="1.5625rem"
          isTruncated
        />

        <Divider color={"gray.200"} />

        {view === "dri" && <DRISelection />}

        {view === "datatool" && (
          <CategoryMenu
            geography={geography ? geography : Geography.CITYWIDE}
            geoid={geography && geoid ? geoid : NYC}
            px="0.75rem"
            paddingRight="0rem"
          />
        )}
      </>
    );
  }

  return (
    <Box padding="1rem">
      <WelcomeContent />
      <br />
      <hr />
      <br />
      <WelcomeFooter />
    </Box>
  );
};
