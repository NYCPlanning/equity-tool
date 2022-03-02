import React from "react";
import { Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { GeographyInfo } from "@components/GeographyInfo";
import WelcomeContent from "@components/WelcomeContent";
import WelcomeFooter from "@components/WelcomeFooter";
import { DRISelection } from "@components/SidebarContent/DRISelection";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";
import { useClearSelection } from "@helpers/useClearSelection";
import { CategoryMenu } from "@components/CategoryMenu";
import { Geography } from "@constants/geography";
import { NYC } from "@constants/geoid";

export const DrawerContent = () => {
  const { view, geoid, geography } = useMapSubrouteInfo();
  const clearSelection = useClearSelection();

  if (geoid !== null) {
    return (
      <>
        <GeographyInfo
          geoid={geoid}
          geography={geography}
          fontSize="1.5625rem"
          isTruncated
        />
        {geoid !== NYC && (
          <Button
            mt={"0.375rem"}
            rightIcon={<CloseIcon />}
            variant="outline"
            size="xs"
            onClick={clearSelection}
          >
            Clear Selection
          </Button>
        )}
        {view === "dri" && <DRISelection />}
        {view === "datatool" && (
          <CategoryMenu
            geography={geography ? geography : Geography.CITYWIDE}
            geoid={geography && geoid ? geoid : NYC}
            direction="row"
            overflowX="auto"
            bottomLabels={true}
          />
        )}
      </>
    );
  }

  return (
    <>
      <WelcomeContent />
      <br />
      <hr />
      <br />
      <WelcomeFooter />
    </>
  );
};
