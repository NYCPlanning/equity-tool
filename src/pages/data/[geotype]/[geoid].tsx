import { GetServerSideProps } from "next";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  Box,
  Flex,
  Text,
  Divider,
  IconButton,
  Spacer,
  Icon,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export interface DataPageProps {
  initialRouteParams: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params) {
    return {
      props: {
        initialRouteParams: "",
      },
    };
  }
  const { subroutes } = context.params;

  if (typeof subroutes === "string") {
    return {
      props: {
        initialRouteParams: "",
      },
    };
  }

  return {
    props: {
      initialRouteParams: subroutes ? subroutes.join(",") : "",
    },
  };
};

const GeographySummary = () => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  // Will need to derive the selected geo name and labels here as well,
  // likely by using useRouter()
  const { geotype } = useRouter().query;

  return (
    <Flex
      direction={"column"}
      height={{ base: "auto", md: "full" }}
      width={{
        base: "full",
        md: isOpen ? "308px" : "72px",
      }}
      overflowX={"hidden"}
      pt={{ base: 6, md: 16 }}
      background={{ base: "white", md: "gray.100" }}
      transition="width 0.5s ease"
    >
      <Box width={{ base: "full", md: "308px" }}>
        {/* "Back to map" button can go here for screen sizes < md */}
        <Flex
          px={{ base: 6, md: 4 }}
          align={geotype === "puma" ? "start" : "center"}
        >
          <Flex
            width={"40px"}
            direction={"column"}
            display={{ base: "none", md: "flex" }}
            align={"center"}
            gridGap={2}
          >
            <Center
              display={{ base: "none", md: "flex" }}
              borderRadius={"10px"}
              background={"gray.200"}
              width="40px"
              height="40px"
            >
              <Icon as={FaMapMarkerAlt} w={"14px"} height={"30px"} />
            </Center>
            <Text
              fontSize={"0.5rem"}
              color="teal.600"
              fontWeight={"500"}
              display={isOpen ? "none" : "block"}
            >
              {/* collapsed sidebar icon label can go here */}
            </Text>
          </Flex>
          {/*
            This Flex and everything inside of it can be replaced or turned into some 
            sort of reusable "GeographyLabels" or "PumaLabels" component because it also shows up
            in the Data Tool view of the map page. We might have to move the Divider up one level
            in the tree depending on how that component shakes out
          */}
          <Flex
            direction={"column"}
            align={"middle"}
            width={{ base: "full", md: "220px" }}
            ml={{ base: 0, md: 4 }}
          >
            <Divider
              color={"gray.200"}
              display={{ base: "block", md: "none" }}
              order={4}
              mt={2}
            />
          </Flex>
        </Flex>
      </Box>
      {/* Category selectory can go here... */}
      <Spacer />
      <IconButton
        px={3}
        background={"gray.200"}
        display={{ base: "none", md: "flex" }}
        borderRadius={0}
        width={"full"}
        justifyContent={isOpen ? "end" : "center"}
        onClick={onToggle}
        aria-label="Show Categories"
        icon={
          isOpen ? (
            <ChevronLeftIcon
              color="gray.500"
              _hover={{ color: "gray.500" }}
              w={10}
              h={10}
            />
          ) : (
            <ChevronRightIcon
              color="gray.500"
              _hover={{ color: "gray.500" }}
              w={10}
              h={10}
            />
          )
        }
      />
    </Flex>
  );
};

const DataPage = ({ initialRouteParams }: DataPageProps) => {
  console.log(initialRouteParams); // TODO: Remove this contrived usage of initialRouteParams

  return (
    <Flex
      width={"full"}
      height={"full"}
      direction={{ base: "column", md: "row" }}
      gridGap={{ base: 6, md: 0 }}
    >
      <GeographySummary />
      <Box flexGrow={1}>
        <Box>
          {/* "Back to map" button can go here for screen sizes >= md */}
          {/* racial subgroup selection can go here */}Subgroup switcher
        </Box>
        <Divider display={{ base: "none", md: "block" }} color={"gray.300"} />
        <Box>Tables</Box>
      </Box>
    </Flex>
  );
};

export default DataPage;
