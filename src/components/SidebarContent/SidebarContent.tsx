import React from "react";
import { Box, Divider, Button, Flex } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { GeographyInfo } from "@components/GeographyInfo";
import WelcomeContent from "@components/WelcomeContent";
import WelcomeFooter from "@components/WelcomeFooter";
import { DRISelection } from "@components/SidebarContent/DRISelection";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";
import { useClearSelection } from "@helpers/useClearSelection";
import { NYC } from "@constants/geoid";
import { Geography } from "@constants/geography";
import { CategoryMenu } from "@components/CategoryMenu";
import { SubindicatorBin } from "@components/SidebarContent";
import ntaIndexes from "@data/ntaIndexes.json";

export const SidebarContent = () => {
  const { view, geoid, geography } = useMapSubrouteInfo();
  const clearSelection = useClearSelection();
  const ntaIndex: { [index: string]: any } = ntaIndexes;

  if (geoid != null) {
    return (
      <>
        <Box>
          <Button
            padding="1.5rem 1rem"
            variant="ghost"
            bg="rgba(0,0,0,0)"
            color="gray.500"
            leftIcon={<ArrowBackIcon />}
            aria-label="Exit Data Tool Selection"
            data-cy="exitDataToolSelection-desktop"
            onClick={clearSelection}
          >
            back
          </Button>
        </Box>
        <Flex direction="row" justifyContent="space-between">
          <Box padding="1rem 1rem 1.5rem 1rem">
            <GeographyInfo
              geoid={geoid}
              geography={geography}
              fontSize="1.5625rem"
            />
          </Box>
          <Box pr="1rem">
            {view === "dri" && <SubindicatorBin bin={ntaIndex[geoid]} />}
          </Box>
        </Flex>

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
      <Box
        height="100%"
        justify="space-between"
        padding="2rem 1rem"
        paddingBottom="0rem"
      >
        <WelcomeContent />
      </Box>
      <Box padding="2rem 1rem" paddingTop="0rem">
        <WelcomeFooter />
      </Box>
    </>
  );
};
