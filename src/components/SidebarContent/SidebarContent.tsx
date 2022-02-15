import React from "react";
import { Heading, Box, Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import WelcomeContent from "@components/WelcomeContent";
import WelcomeFooter from "@components/WelcomeFooter";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";

const getGeographyLabel = (geographyId: string | null): string | null => {
  switch (geographyId) {
    case "borough":
      return "Borough";
    case "district":
      return "Community District";
    case "citywide":
      return "City";
  }

  return null;
};

export const SidebarContent = () => {
  const { geography, geoid } = useMapSubrouteInfo();

  const geographyLabel = getGeographyLabel(geography);

  if (geoid !== null) {
    return (
      <>
        <Box paddingBottom="2rem">
          <Heading fontSize=".8125rem" fontWeight={500} color="teal.600">
            {geographyLabel} {geoid}
          </Heading>
          <Heading
            as="h1"
            fontSize="1.5625rem"
            fontWeight={700}
            padding=".5rem 0"
          >
            Sunnyside &amp; Woodside
          </Heading>
          <Heading
            as="h3"
            fontSize=".8125rem"
            fontWeight={400}
            paddingBottom=".25rem"
          >
            Approx. Queens Community District 2
          </Heading>
          <Button rightIcon={<CloseIcon />} variant="outline" size="xs">
            Clear Selection
          </Button>
        </Box>
        <hr />
      </>
    );
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
