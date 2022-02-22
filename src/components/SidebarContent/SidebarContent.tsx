import React from "react";
import { Heading, Box, Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { GeographyInfo } from "@components/GeographyInfo";
import WelcomeContent from "@components/WelcomeContent";
import WelcomeFooter from "@components/WelcomeFooter";
import { useRouter } from "next/router";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";

export const SidebarContent = () => {
  const router = useRouter();

  const { view, geography, geoid } = useMapSubrouteInfo();

  const clearSelection = () => {
    router.push(`/map/${view}/${geography}/`);
  };

  if (geoid != null) {
    if (view === "dri") {
      return (
        <>
          <Box paddingBottom="2rem">
            <Heading as="h1" fontSize="1.5625rem" fontWeight={700}>
              QN68 - Queensbridge Ravenswood Long Island City
            </Heading>
            <Button
              rightIcon={<CloseIcon />}
              variant="outline"
              size="xs"
              onClick={clearSelection}
            >
              Clear Selection
            </Button>
          </Box>
          <hr />
        </>
      );
    } else {
      return (
        <>
          <GeographyInfo />
          <hr />
        </>
      );
    }
  }
  return (
    <>
      <Box height="100%" justify="space-between">
        <Heading>Welcome!</Heading>
        <br />
        <WelcomeContent />
      </Box>
      <Box>
        <WelcomeFooter />
      </Box>
    </>
  );
};
