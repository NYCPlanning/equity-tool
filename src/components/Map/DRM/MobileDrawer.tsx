import { useState } from "react";
import { Box, Button, Divider, IconButton, Flex } from "@chakra-ui/react";
import {
  ArrowBackIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { useClearSelection } from "@helpers/useClearSelection";
import { DRMSelection } from "@components/SidebarContent/DRMSelection";
import { GeographyInfo } from "@components/GeographyInfo";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";
import { NYC } from "@constants/geoid";

export const DrmMobileDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { geoid, geography } = useMapSubrouteInfo();

  const clearSelection = useClearSelection();

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
      borderRadius="1rem 1rem 0 0"
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
        >
          <Button
            padding="1.5rem 1rem"
            variant="ghost"
            bg="rgba(0,0,0,0)"
            color="gray.500"
            leftIcon={<ArrowBackIcon />}
            aria-label="Exit Data Tool Selection"
            data-cy="exitCommunityDataSelection-mobile"
            onClick={clearSelection}
          >
            back
          </Button>
          <Box
            flex="auto"
            align="right"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? (
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
          <Box padding="2.5rem 1rem">
            <GeographyInfo
              geoid={geography && geoid ? geoid : NYC}
              geography={geography}
              fontSize="1.5625rem"
            />
          </Box>

          <Divider color={"gray.200"} />

          <DRMSelection />
        </Box>
      </Flex>
    </Box>
  );
};
