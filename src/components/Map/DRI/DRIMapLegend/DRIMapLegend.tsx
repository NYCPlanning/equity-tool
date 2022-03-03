import { Box, HStack, Text, Square, Flex, Spacer } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useState } from "react";

export const DRIMapLegend = () => {
  const [displayMinimizedLegend, setDisplayMinimizedLegend] = useState({
    base: "block",
    md: "none",
  });
  const [displayFullLegend, setDisplayFullLegend] = useState({
    base: "none",
    md: "none",
  });

  const toggleLegend = () => {
    if (displayMinimizedLegend.base === "block") {
      setDisplayMinimizedLegend({ base: "none", md: "none" });
      setDisplayFullLegend({ base: "block", md: "none" });
    } else {
      setDisplayMinimizedLegend({ base: "block", md: "none" });
      setDisplayFullLegend({ base: "none", md: "none" });
    }
  };

  return (
    <>
      {/* Desktop Version */}
      <Box
        position="absolute"
        bottom={8}
        right={{
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
        <Text fontWeight={700}>Displacement Risk Index</Text>
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

      {/* Mobile Version */}

      <Box
        position="absolute"
        top={5}
        right={5}
        zIndex={100}
        backgroundColor="#FFFFFF"
        padding="0.5rem"
        fontSize="0.875rem"
        lineHeight="0.875rem"
        borderRadius="5px"
        display={displayMinimizedLegend}
      >
        <InfoIcon onClick={toggleLegend} />
      </Box>

      <Box
        position="absolute"
        top={5}
        right={5}
        zIndex={100}
        backgroundColor="#FFFFFF"
        padding="0.5rem"
        fontSize="0.75rem"
        borderRadius="5px"
        display={displayFullLegend}
      >
        <Flex>
          <Text fontWeight={700}>Displacement Risk Index</Text>
          <Spacer minW="10px" />
          <InfoIcon
            fontSize="0.875rem"
            lineHeight="0.875rem"
            onClick={toggleLegend}
          />
        </Flex>

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
    </>
  );
};
