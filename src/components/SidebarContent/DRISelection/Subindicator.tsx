import React from "react";
import { Text, Box } from "@chakra-ui/react";
import { SubindicatorBin } from "./SubindicatorBin";

interface SubindicatorProps {
  subindicatorTitle: string | null;
  subindicatorBin: string | undefined;
}

export const Subindicator = ({
  subindicatorTitle,
  subindicatorBin,
}: SubindicatorProps) => {
  return (
    <Box p="1.5rem 0rem 0rem 0rem">
      <Text fontSize="0.875rem" fontWeight={500} color="gray.600">
        {subindicatorTitle}
        <SubindicatorBin bin={subindicatorBin} />
      </Text>
    </Box>
  );
};
