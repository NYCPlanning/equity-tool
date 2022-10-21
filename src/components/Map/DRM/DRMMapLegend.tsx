import { Box, HStack, Text, Square } from "@chakra-ui/react";

export const DRMMapLegend = () => (
  <Box
    position="absolute"
    bottom={8}
    left={{
      md: 8,
      base: "auto",
    }}
    zIndex={100}
    backgroundColor="#FFFFFF"
    padding="1rem"
    fontSize="0.75rem"
    borderRadius="5px"
    display={{
      base: "none",
      md: "block",
    }}
  >
    <Text fontWeight={700}>Displacement Risk Map</Text>
    <HStack direction="row" alignItems="center" spacing="8px">
      <Square size="16px" bg="#772F7A" borderRadius="4px" />
      <Text>Highest</Text>
    </HStack>
    <HStack direction="row" alignItems="center" spacing="8px">
      <Square size="16px" bg="#BD2E89" borderRadius="4px" />
      <Text>Higher</Text>
    </HStack>
    <HStack direction="row" alignItems="center" spacing="8px">
      <Square size="16px" bg="#ED6CA0" borderRadius="4px" />
      <Text>Intermediate</Text>
    </HStack>
    <HStack direction="row" alignItems="center" spacing="8px">
      <Square size="16px" bg="#F5B6BC" borderRadius="4px" />
      <Text>Lower</Text>
    </HStack>
    <HStack direction="row" alignItems="center" spacing="8px">
      <Square size="16px" bg="#FEEFE5" borderRadius="4px" />
      <Text>Lowest</Text>
    </HStack>
  </Box>
);
