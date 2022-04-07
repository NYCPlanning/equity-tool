import { Box, BoxProps, Text, HStack } from "@chakra-ui/react";

export const Legend = (props: BoxProps) => (
  <Box background="#fff" p={4} {...props}>
    <Text>Displacement Risk Map</Text>
    <Box
      mt={2}
      mb={2}
      w="100%"
      h="18px"
      borderRadius="5px"
      bgGradient="linear(to-r, #f4f4b4, #d44932)"
    />
    <HStack w="100%" justify="space-between">
      <Text>0</Text>
      <Text>100</Text>
    </HStack>
  </Box>
);
