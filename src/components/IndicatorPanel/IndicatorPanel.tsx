import { Box, Collapse, useDisclosure, Text, Button } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { NtaIndicatorRecord } from "../../types";

export interface IndicatorPanelProps {
  initialNtaIndicatorRecord: NtaIndicatorRecord | null;
}

export const IndicatorPanel = ({
  initialNtaIndicatorRecord,
}: IndicatorPanelProps) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      background="#fff"
      position={["relative", "absolute"]}
      right={["auto", "0px"]}
      top={["auto", "4.25rem"]}
      bottom={["0px", "auto"]}
      w={["100%", "350px"]}
      marginTop={0}
    >
      <Button
        w="100%"
        onClick={onToggle}
        justifyContent="space-between"
        rightIcon={
          isOpen ? (
            <ChevronDownIcon w={10} h={10} />
          ) : (
            <ChevronUpIcon w={10} h={10} />
          )
        }
      >
        {initialNtaIndicatorRecord
          ? initialNtaIndicatorRecord.label
          : "Welcome"}
      </Button>
      <Collapse in={isOpen}>
        {initialNtaIndicatorRecord ? (
          <Box overflowY="auto" p={4} h="40vh">
            <Text fontSize="lg">
              Overall Displacement Risk:{" "}
              {initialNtaIndicatorRecord.displacementRisk}
            </Text>
            {Object.entries(initialNtaIndicatorRecord.indicators).map(
              ([indicator, value]) => (
                <Text
                  py={2}
                  key={`${initialNtaIndicatorRecord.id}-${indicator}`}
                >
                  {indicator}: {value}
                </Text>
              )
            )}
          </Box>
        ) : (
          <Box overflowY="auto" p={4} h="40vh">
            <Text>
              The Equitable Development Reporting tool is a partnership between
              NYC HPD and DCP. Please select an NTA from the map to view its
              indicators
            </Text>
          </Box>
        )}
      </Collapse>
    </Box>
  );
};
