import React from "react";
import { Text, Box } from "@chakra-ui/react";

interface SubindicatorProps {
  subindicatorTitle: string | null;
}

export const Subindicator = ({ subindicatorTitle }: SubindicatorProps) => {
  return (
    <Box p="1.5rem 0rem 0rem 0rem">
      <Text fontSize="0.875rem">{subindicatorTitle}</Text>
    </Box>
  );
};
