import { Box, HStack, Text, Square, Flex } from "@chakra-ui/react";
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
        borderRadius="8px"
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
        borderRadius="10px"
        display={displayFullLegend}
        maxWidth="23rem"
      >
        <Flex alignItems={"center"}>
          <InfoIcon color="#4A5568" onClick={toggleLegend} />
          <Text
            paddingLeft="1rem"
            fontWeight={700}
            fontSize="1.5rem"
            lineHeight="26px"
          >
            Instructions
          </Text>
        </Flex>

        <Text
          fontSize="1rem"
          lineHeight="26px"
          fontWeight={400}
          paddingTop=".5rem"
        >
          {view === View.DATA
            ? "Make a selection on the map by community district*, borough, or city to explore how demographic, housing, and quality of life characteristics compare across neighborhoods and demographic groups over the past two decades."
            : "This Displacement Risk Map illustrates the level of risk residents face of being unable to remain in their homes or neighborhoods."}
        </Text>

        {view === View.DRM && (
          <Text
            fontSize="16px"
            lineHeight="26px"
            fontWeight={400}
            paddingTop=".5rem"
          >
            Select a neighborhood to see a breakdown of the factors contributing
            to displacement risk (population vulnerability, housing conditions,
            and market pressure) and the data points that comprise them. See
            maps of each of the individual data points here.
          </Text>
        )}

        <Text
          fontSize="13px"
          lineHeight="20.8px"
          fontWeight={400}
          padding=".5rem 0 .5rem 0"
        >
          {view === View.DATA
            ? "*Community Districts are approximated using data from Public Use Microdata Areas (PUMAs). "
            : "*Approximations of NYC neighborhoods based off of Neighborhood Tabulation Areas (NTAs)."}
        </Text>

        {view === View.DRM && (
          <Box>
            <Text fontWeight={700} paddingBottom=".25rem">
              Legend
            </Text>
            <HStack direction="row" alignItems="center" spacing="8px">
              <Square size="16px" bg="#772F7A" borderRadius="4px" />
              <Text fontSize="16px" color="#4A5568" fontWeight={400}>
                Highest
              </Text>
            </HStack>
            <HStack direction="row" alignItems="center" spacing="8px">
              <Square size="16px" bg="#BD2E89" borderRadius="4px" />
              <Text fontSize="16px" color="#4A5568" fontWeight={400}>
                Higher
              </Text>
            </HStack>
            <HStack direction="row" alignItems="center" spacing="8px">
              <Square size="16px" bg="#ED6CA0" borderRadius="4px" />
              <Text fontSize="16px" color="#4A5568" fontWeight={400}>
                Intermediate
              </Text>
            </HStack>
            <HStack direction="row" alignItems="center" spacing="8px">
              <Square size="16px" bg="#F5B6BC" borderRadius="4px" />
              <Text fontSize="16px" color="#4A5568" fontWeight={400}>
                Lower
              </Text>
            </HStack>
            <HStack direction="row" alignItems="center" spacing="8px">
              <Square size="16px" bg="#FEEFE5" borderRadius="4px" />
              <Text fontSize="16px" color="#4A5568" fontWeight={400}>
                Lowest
              </Text>
            </HStack>
          </Box>
        )}
      </Box>
    </>
  );
};
