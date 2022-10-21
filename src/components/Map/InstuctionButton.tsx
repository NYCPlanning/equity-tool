import { Box, HStack, Text, Square, Flex, Spacer } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useView } from "@hooks/useView";
import { View } from "@constants/View";

export const InstructionButton = () => {
  const view = useView();

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
      <Box
        position="absolute"
        top={view === View.DATA ? "7.75rem" : "4.5rem"}
        left={"1.5rem"}
        zIndex={100}
        backgroundColor="#FFFFFF"
        padding="0.5rem"
        fontSize="0.875rem"
        lineHeight="0.875rem"
        borderRadius="5px"
        stroke="1px #4A5568"
        display={displayMinimizedLegend}
      >
        <InfoIcon color="#4A5568" onClick={toggleLegend} />
      </Box>

      <Box
        position="absolute"
        top={view === View.DATA ? "7.75rem" : "4.5rem"}
        left={"1.5rem"}
        zIndex={100}
        backgroundColor="#FFFFFF"
        padding="0.5rem"
        fontSize="0.75rem"
        borderRadius="5px"
        display={displayFullLegend}
      >
        <Flex>
          <InfoIcon
            fontSize="0.875rem"
            lineHeight="0.875rem"
            onClick={toggleLegend}
          />
          <Spacer minW="10px" />
          <Text fontWeight={700}>Displacement Risk Map</Text>
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
