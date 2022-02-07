import { Box, Text, Link } from "@chakra-ui/react";
import { NtaIndicatorRecord } from "@type/Nta";

interface IndicatorPanelProps {
  indicatorRecord: NtaIndicatorRecord | null;
}

export const IndicatorPanel = ({ indicatorRecord }: IndicatorPanelProps) => {
  return (
    <Box background="#fff" w={["100%"]} height="100%" rounded="lg">
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
        <>
          <Text>You don&apos;t have anything selected yet.</Text>
          <br />
          <Text>
            Make a selection on the map to explore data indicators and change
            over time in the Data Tool.
          </Text>
          <br />
          <Text>
            Or switch to the Displacement Risk Index (DRI) and select a
            neighborhood to see its’ DRI Profile.
          </Text>

          <br />

          <Link>Learn More About the Data Tool</Link>
        </>
      )}
    </Box>
  );
};
