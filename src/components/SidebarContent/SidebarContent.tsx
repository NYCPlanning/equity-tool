import React from "react";
import { Heading, Box, Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import WelcomeContent from "@components/WelcomeContent";
import WelcomeFooter from "@components/WelcomeFooter";

interface SidebarContentProps {
  isGeographySelected: boolean;
}

export const SidebarContent = ({
  isGeographySelected,
}: SidebarContentProps) => {
  if (isGeographySelected) {
    return (
      <>
        <Box paddingBottom="2rem">
          <Heading fontSize=".8125rem" fontWeight={500} color="teal.600">
            PUMA 4109
          </Heading>
          <Heading as="h1" fontSize="1.5625rem" fontWeight={700}>
            Sunnyside &amp; Woodside
          </Heading>
          <Heading as="h3" fontSize=".8125rem" fontWeight={400}>
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
