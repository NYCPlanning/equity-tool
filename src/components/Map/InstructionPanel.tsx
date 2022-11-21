import { Box, HStack, Text, Square, Link } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { IconPanel } from "@components/Map/IconPanel";
import { useView } from "@hooks/useView";
import { View } from "@constants/View";

export const InstructionPanel = () => {
  const view = useView();
  return (
    <IconPanel
      heading="Instructions"
      icon={<InfoIcon color={"gray.600"} />}
      aria-label="Show Instructions and DRM Legend"
      top={view === View.DATA ? "8.125rem" : "4.875rem"}
      display={{ base: "block", md: "none" }}
      height={view === View.DATA ? "276px" : "520px"}
      width={"330px"}
      zIndex={"110"}
    >
      <Text fontSize="1rem" lineHeight="26px" fontWeight={400}>
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
          and market pressure) and the data points that comprise them. See maps
          of each of the individual data points{" "}
          <Link
            fontWeight={700}
            color="000"
            href="https://storymaps.arcgis.com/stories/79237333bb90492ba0de486c0705f9f7"
            target="blank"
          >
            here
          </Link>
          .
        </Text>
      )}

      <Text
        fontSize="13px"
        lineHeight="20.8px"
        fontWeight={400}
        padding=".75rem 0 0"
      >
        {view === View.DATA
          ? "*Community Districts are approximated using data from Public Use Microdata Areas (PUMAs). "
          : "*Approximations of NYC neighborhoods based off of Neighborhood Tabulation Areas (NTAs)."}
      </Text>

      {view === View.DRM && (
        <Box marginTop={"0.75rem"}>
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
    </IconPanel>
  );
};
