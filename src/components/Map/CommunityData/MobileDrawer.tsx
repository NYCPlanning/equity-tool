import { Box, Button, Divider, Flex } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useClearSelection } from "@helpers/useClearSelection";
import { GeographyInfo } from "@components/GeographyInfo";

import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";
import { CategoryMenu } from "@components/CategoryMenu";
import { Geography } from "@constants/geography";
import { NYC } from "@constants/geoid";

export const CommunityDataMobileDrawer = () => {
  const { geoid, geography } = useMapSubrouteInfo();

  const clearSelection = useClearSelection();

  return (
    <Box
      display={{
        base: "block",
        md: "none",
      }}
      position="fixed"
      height="18rem"
      width="100%"
      left="0"
      bottom="0"
      zIndex="900"
      bg="white"
      borderRadius="1rem 1rem 0 0"
      data-cy="mobileDrawer-communityData"
    >
      <Flex direction="column" height="100%" position="relative">
        <Box
          position="absolute"
          width="100%"
          top={0}
          cursor="pointer"
          zIndex="999"
          align="left"
          bg="rgba(0,0,0,0)"
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
        </Box>

        <Box
          flex="auto"
          overflow="scroll"
          paddingTop="1rem"
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Box padding="2.5rem 1rem 1.5rem 1rem">
            <GeographyInfo
              geoid={geography && geoid ? geoid : NYC}
              geography={geography}
              fontSize="1.5625rem"
              isTruncated
            />
          </Box>

          <Divider color={"gray.200"} />

          <CategoryMenu
            geography={geography ? geography : Geography.CITYWIDE}
            geoid={geography && geoid ? geoid : NYC}
            px="0.75rem"
            paddingRight="0rem"
          />
        </Box>
      </Flex>
    </Box>
  );
};
