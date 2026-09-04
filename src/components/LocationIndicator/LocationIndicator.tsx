import { Box, Heading, Flex } from "@nycplanning/streetscape";
import { IndicatorRecord } from "@schemas/indicatorRecord";
import { LocationTableList } from "@components/LocationTableList";

interface LocationIndicatorProps {
  selectedArea: IndicatorRecord;
  borough: IndicatorRecord;
  citywide: IndicatorRecord;
}

export const LocationIndicator = ({
  selectedArea,
  borough,
  citywide,
}: LocationIndicatorProps) => {
  const getLatestData = (indicator: IndicatorRecord) =>
    [...indicator.vintages].reverse().find((vintage) => !vintage.isChange);

  const selectedAreaData = getLatestData(selectedArea);
  const boroughData = getLatestData(borough);
  const citywideData = getLatestData(citywide);

  return (
    <Box marginBottom={{ base: "1.5rem", lg: "2.5rem" }}>
      <Flex direction="column">
        <Heading
          as="h3"
          color="gray.700"
          fontSize="1.25rem"
          fontWeight="700"
          marginBottom={{ base: "0.75rem", md: "1rem" }}
          textTransform="capitalize"
          order={2}
        >
          {selectedArea.title}
        </Heading>

        {selectedArea.id !== null && (
          <Heading
            as="h4"
            color="gray.600"
            fontSize="0.8125rem"
            fontWeight="400"
            marginBottom="0.25rem"
            lineHeight="1.6"
            order={1}
          >
            Table {selectedArea.id}
          </Heading>
        )}
      </Flex>

      {selectedAreaData && boroughData && citywideData && (
        <LocationTableList
          selectedAreaData={selectedAreaData}
          boroughData={boroughData}
          citywideData={citywideData}
        />
      )}
    </Box>
  );
};
