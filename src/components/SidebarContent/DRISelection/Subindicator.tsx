import React from "react";
import { Text, Flex } from "@chakra-ui/react";
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
    <Flex
      direction="row"
      justifyContent="space-between"
      p="1.5rem 0rem 0rem 0rem"
    >
      <Text fontSize="0.875rem" fontWeight={500} color="gray.600">
        {subindicatorTitle}
      </Text>
      <SubindicatorBin bin={subindicatorBin} />
    </Flex>
  );
};
