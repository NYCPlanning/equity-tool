import React from "react";
import { Box, Divider, Button, Flex } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { GeographyInfo } from "@components/GeographyInfo";
import WelcomeContent from "@components/WelcomeContent";
import WelcomeFooter from "@components/Footers/WelcomeFooter";
import { DRMSelection } from "@components/SidebarContent/DRMSelection";
import { useView } from "@hooks/useView";
import { useGeoid } from "@hooks/useGeoid";
import { useNtaIndex } from "@hooks/useNtaIndex";
import { useGeography } from "@hooks/useGeography";
import { useClearSelection } from "@helpers/useClearSelection";
import { NYC } from "@constants/geoid";
import { Geography } from "@constants/geography";
import { CategoryMenu } from "@components/CategoryMenu";
import { SubindicatorBin } from "@components/SidebarContent";
import { DataDownloadModal } from "@components/DataDownloadModal";
import { View } from "@constants/View";

export const SidebarContent = () => {
  const view = useView();
  const geoid = useGeoid();
  const geography = useGeography();
  const clearSelection = useClearSelection();
  const ntaIndex = useNtaIndex();

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
              visibility={
                geography === Geography.CITYWIDE ? "hidden" : "visible"
              }
            >
              back
            </Button>
          </Box>
          <Box pr="1rem">
            {view === View.DRM && (
              <DataDownloadModal
                downloadType={View.DRM}
                geoid={geoid}
                geography={geography}
              />
            )}
          </Box>
        </Flex>
        <Flex direction="row" justifyContent="space-between">
          <Box
            padding={
              view === View.DRM
                ? "1rem 1rem 0.5rem 1rem"
                : "1rem 1rem 1.5rem 1rem"
            }
          >
            <GeographyInfo
              geoid={geoid}
              geography={geography}
              fontSize="1.5625rem"
            />
          </Box>
        </Flex>
        <Box>{view === View.DRM && <SubindicatorBin bin={ntaIndex} />}</Box>

        {view === View.DRM && <DRMSelection />}
        {view === View.DATA && (
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
