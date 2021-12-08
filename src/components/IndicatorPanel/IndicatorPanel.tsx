import {
  Box,
  Heading,
  Collapse,
  useDisclosure,
  Text,
  Button,
} from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";

export const IndicatorPanel = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      background="#fff"
      position={["relative", "absolute"]}
      right={["auto", "0px"]}
      top={["auto", "68px"]}
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
        Welcome
      </Button>
      <Collapse in={isOpen}>
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
      </Collapse>
    </Box>
  );
};
