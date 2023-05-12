import React from "react";
import { Heading, Text, Box, Flex } from "@chakra-ui/react";

interface DataPointProps {
  title: string;
  noNumber?: boolean | null;
  value: string | number | undefined | null;
  percentage?: boolean | null;
  moe?: number | null;
}

export const DataPoint = ({
  title,
  noNumber,
  value,
  percentage,
  moe,
}: DataPointProps) => {
  return (
    <Box p="1rem 0.5rem 1rem 0.5rem">
      <Heading
        fontSize="0.8125rem"
        color="teal.600"
        fontWeight={500}
        lineHeight="1.1875rem"
      >
        {title.toUpperCase()}
      </Heading>
      <Flex direction="row" justifyContent="space-between">
        <Box>
          <Text fontSize={noNumber ? "1rem" : "1.5rem"}>
            {value}
            {percentage ? "%" : ""}
          </Text>
        </Box>
        <Box alignSelf="end">
          <Text fontSize="0.875rem" color="gray.600">
            {moe ? `${moe}% margin of error` : ""}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
