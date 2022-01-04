import { Box, Collapse, useDisclosure, Text, Button } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";

export const IndicatorPanel = (props) => {
  const { isOpen, onToggle } = useDisclosure();
  const { selectedNta } = props;

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
        {selectedNta ? selectedNta.label : "Welcome"}
      </Button>
      <Collapse in={isOpen}>
        {selectedNta ? (
          <Box overflowY="auto" p={4} h="40vh">
            <Text fontSize="lg">
              Overall Displacement Risk: {selectedNta.displacementRisk}
            </Text>
            
            {selectedNta?.indicators && Object.entries(selectedNta.indicators).map(
              ([indicator, value]) => (
                <Text py={2} key={`${selectedNta.id}-${indicator}`}>
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
