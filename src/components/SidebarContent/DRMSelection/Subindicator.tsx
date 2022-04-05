import React from "react";
import { Text, Flex } from "@chakra-ui/react";

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
      <Text fontSize="1.2rem" fontWeight={700} color="gray.600">
        {subindicatorTitle}: {subindicatorBin}
      </Text>
    </Flex>
  );
};
