import React from "react";
import { Heading, Text, Box, Flex } from "@chakra-ui/react";

interface DataPointProps {
  title: string;
  noNumber?: boolean | null;
  value: any | null;
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
    <Box p="1.375rem 0.5rem 1.375rem 0.5rem">
      <Heading fontSize="0.8125rem" color="#2C7A7B" fontWeight={400}>
        {title.toUpperCase()}
      </Heading>
      <Flex direction="row" justifyContent="space-between">
        <Box>
          <Text fontSize={noNumber ? "1rem" : "2.25rem"}>
            {value}
            {percentage ? "%" : ""}
          </Text>
        </Box>
        <Box alignSelf="end">
          <Text>{moe ? `${moe}% margin of error` : ""}</Text>
        </Box>
      </Flex>
    </Box>
  );
};
