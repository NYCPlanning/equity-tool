import { useState } from "react";
import { Box, Button, IconButton, Flex } from "@chakra-ui/react";
import {
  ArrowBackIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { useClearSelection } from "@helpers/useClearSelection";
import { DRMSelection } from "@components/SidebarContent/DRMSelection";
import { GeographyInfo } from "@components/GeographyInfo";
import { useView } from "@hooks/useView";
import { useGeoid } from "@hooks/useGeoid";
import { useGeography } from "@hooks/useGeography";
import { NYC } from "@constants/geoid";
import { SubindicatorBin } from "@components/SidebarContent";
import { DataDownloadModal } from "@components/DataDownloadModal";
import ntaIndexes from "@data/ntaIndexes.json";

export const DrmMobileDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const view = useView();
  const geoid = useGeoid();
  const geography = useGeography();

  const clearSelection = useClearSelection();

  const ntaIndex: { [index: string]: any } = ntaIndexes;

  return (
    <Box
      display={{
        base: "block",
        md: "none",
      }}
      height="100vh"
      width="100%"
      position="fixed"
      top={isOpen ? "6rem" : "100vh"}
      marginTop={isOpen ? "auto" : "-8rem"}
      paddingBottom="6rem"
      left="0"
      zIndex="900"
      bg="white"
      borderRadius="0.625rem 0.625rem 0 0"
      data-cy="mobileDrawer-drm"
    >
      <Flex direction="column" height="100%" position="relative">
        <Flex
          position="absolute"
          width="100%"
          top="0"
          right="0"
          cursor="pointer"
          zIndex="999"
          justifyContent="space-between"
          flexDirection="row"
          bg="white"
          pt={isOpen ? "1rem" : "0rem"}
          borderRadius="0.625rem 0.625rem 0 0"
        >
          <Button
            padding="1.5rem 1rem"
            variant="ghost"
            bg="rgba(0,0,0,0)"
            color="gray.500"
            leftIcon={<ArrowBackIcon />}
            aria-label="Exit Community Data Selection"
            data-cy="exitCommunityDataSelection-mobile"
            onClick={clearSelection}
          >
            back
          </Button>
          <Box
            flex="auto"
            textAlign="right"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? (
              <>
                <DataDownloadModal
                  downloadType="drm"
                  geoid={geoid}
                  geography={geography}
                />
                <IconButton
                  variant="ghost"
                  size="lg"
                  fontSize="1.25rem"
                  bg="rgba(0,0,0,0)"
                  icon={<ChevronDownIcon />}
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                  aria-label="Toggle Drawer"
                  data-cy="closeMobileDrawer"
                />
              </>
            ) : (
              <IconButton
                variant="ghost"
                size="lg"
                fontSize="1.25rem"
                bg="rgba(0,0,0,0)"
                icon={<ChevronUpIcon />}
                aria-label="Toggle Drawer"
                data-cy="openMobileDrawer"
              />
            )}
          </Box>
        </Flex>

        <Box
          flex="auto"
          overflow="scroll"
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Box
            padding={
              isOpen ? "4.5rem 1rem 0.5rem 1rem" : "3.5rem 1rem 0.5rem 1rem"
            }
          >
            <GeographyInfo
              geoid={geography && geoid ? geoid : NYC}
              geography={geography}
              fontSize="1.5625rem"
            />
          </Box>

          <Box>
            {view === "drm" && (
              <SubindicatorBin bin={ntaIndex[geoid ? geoid : ""]} />
            )}
          </Box>
          <DRMSelection />
        </Box>
      </Flex>
    </Box>
  );
};
