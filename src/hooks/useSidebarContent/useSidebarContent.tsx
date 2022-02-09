import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import WelcomeContent from "../useWelcomeContent";
import WelcomeFooter from "../useWelcomeFooter";

export const useSidebarContent = (
  isGeographySelected: boolean
): JSX.Element => {
  if (isGeographySelected) {
    return (
      <Box>
        <Heading>PUMA 132</Heading>
        <br />
        Either Data Tool Categories or DRI Indicators go here <br />
        (you can use useView() to determine which)
      </Box>
    );
  }

  return (
    <>
      <Box>
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
