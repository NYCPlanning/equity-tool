import { Box, Heading, Text } from "@chakra-ui/react";
import { NtaIndicatorRecord } from "@type/Nta";

interface IndicatorPanelProps {
  indicatorRecord: NtaIndicatorRecord | null;
}

export const IndicatorPanel = ({ indicatorRecord }: IndicatorPanelProps) => {
  return (
    <Box background="#fff" w={["100%"]} height="100%" p="15" rounded="lg">
      <Heading as="h3" size="lg">
        {indicatorRecord
          ? indicatorRecord.label
          : "Welcome to NYC's Equitable Development Data Tool"}
      </Heading>

      <hr />

      {indicatorRecord ? (
        <Box>
          <Box p={2}>
            Overall Displacement Risk: {indicatorRecord.displacementRisk}
          </Box>
          {Object.entries(indicatorRecord.indicators).map(
            ([indicator, value]) => (
              <Box key={`${indicatorRecord.id}-${indicator}`} p={2}>
                <Text>
                  {indicator}: {value}
                </Text>
              </Box>
            )
          )}
        </Box>
      ) : (
        <Box p={2} h="40vh">
          <Text>
            You don&apos;t have anything selected yet.
            <br />
            The Equitable Development Reporting tool is a partnership between
            NYC HPD and DCP. Please select an NTA from the map to view its
            indicators
          </Text>
        </Box>
      )}
    </Box>
  );
};
