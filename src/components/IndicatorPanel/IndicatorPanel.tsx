import {
  Box,
  Heading,
  Collapse,
  useDisclosure,
  useMediaQuery,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Legend } from "@components/Legend";
import { useSelectedNta } from "@hooks/useSelectedNta";

export const IndicatorPanel = () => {
  const selectedNta = useSelectedNta();
  const [isMobile] = useMediaQuery("(max-width: 640px)");
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      background="#fff"
      position="absolute"
      right={["auto", "0px"]}
      top={["auto", "68px"]}
      bottom={["0px", "auto"]}
      w={["100%", "350px"]}
    >
      {isMobile && (
        <>
          <Legend w="100%" />
          <IconButton
            onClick={onToggle}
            aria-label="Show indicators"
            icon={
              isOpen ? (
                <ChevronDownIcon w={10} h={10} />
              ) : (
                <ChevronUpIcon w={10} h={10} />
              )
            }
            width="100%"
          />
        </>
      )}
      <Collapse in={isMobile ? isOpen : true}>
        {selectedNta ? (
          <Box overflowY="auto" p={4} h="40vh">
            <Heading as="h3" fontSize="md">
              {selectedNta.label}
            </Heading>
            <Text fontSize="lg">
              Overall Displacement Risk: {selectedNta.displacementRisk}
            </Text>
            {Object.entries(selectedNta.indicators).map(
              ([indicator, value]) => (
                <Text py={2} key={`${selectedNta.id}-${indicator}`}>
                  {indicator}: {value}
                </Text>
              )
            )}
          </Box>
        ) : (
          <Box overflowY="auto" p={4} h="40vh">
            <Heading as="h3" fontSize="md">
              Welcome
            </Heading>
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
