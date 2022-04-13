import React from "react";
import { Box, Divider, Button, Flex } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { GeographyInfo } from "@components/GeographyInfo";
import WelcomeContent from "@components/WelcomeContent";
import WelcomeFooter from "@components/WelcomeFooter";
import { DRMSelection } from "@components/SidebarContent/DRMSelection";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";
import { useClearSelection } from "@helpers/useClearSelection";
import { NYC } from "@constants/geoid";
import { Geography } from "@constants/geography";
import { CategoryMenu } from "@components/CategoryMenu";
import { SubindicatorBin } from "@components/SidebarContent";
import ntaIndexes from "@data/ntaIndexes.json";
import { DataDownloadModal } from "@components/DataDownloadModal";

export const SidebarContent = () => {
  const { view, geoid, geography } = useMapSubrouteInfo();
  const clearSelection = useClearSelection();
  const ntaIndex: { [index: string]: any } = ntaIndexes;

  if (geoid != null) {
    return (
      <>
        <Flex direction="row" justifyContent="space-between">
          <Box>
            <Button
              padding="1.5rem 1rem"
              variant="ghost"
              bg="rgba(0,0,0,0)"
              color="gray.500"
              leftIcon={<ArrowBackIcon />}
              aria-label="Exit Community Data Selection"
              data-cy="exitCommunityDataSelection-desktop"
              onClick={clearSelection}
            >
              back
            </Button>
          </Box>
          <Box pr="1rem">
            {view === "drm" && (
              <DataDownloadModal
                downloadType="drm"
                geoid={geoid}
                geography={geography}
              />
            )}
          </Box>
        </Flex>
        <Flex direction="row" justifyContent="space-between">
          <Box
            padding={
              view === "drm" ? "1rem 1rem 0.5rem 1rem" : "1rem 1rem 1.5rem 1rem"
            }
          >
            <GeographyInfo
              geoid={geoid}
              geography={geography}
              fontSize="1.5625rem"
            />
          </Box>
        </Flex>
        <Box>{view === "drm" && <SubindicatorBin bin={ntaIndex[geoid]} />}</Box>

        {view === "drm" && <DRMSelection />}
        {view === "data" && (
          <>
            <Divider color={"gray.200"} my={"1.5rem"} />
            <CategoryMenu
              geography={geography ? geography : Geography.CITYWIDE}
              geoid={geography && geoid ? geoid : NYC}
            />
          </>
        )}
      </>
    );
  }

  return (
    <Flex height="100%" direction="column" justify="space-between">
      <Box padding="2rem 1rem">
        <WelcomeContent />
      </Box>
      <Box padding="0 1rem 2rem 1rem">
        <WelcomeFooter />
      </Box>
    </Flex>
  );
};
