import { useState } from "react";
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
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { EstimateTable } from "@components/EstimateTable";
import { Estimate } from "@type/Estimate";
import { useDataExplorerState } from "@hooks/useDataExplorerState";

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

const testData: Estimate[] = [
  {
    id: "tot_pop",
    label: "Total population",
    datum: {
      value: 248738,
      marginOfError: 0,
      coefficientOfVariation: 0,
    },
    percentage: {
      value: 100,
      marginOfError: 0,
    },
  },
  {
    id: "anhps",
    label: "Asian non-Hispanic",
    datum: {
      value: 44772,
      marginOfError: 1201,
      coefficientOfVariation: 0.31,
    },
    percentage: {
      value: 18,
      marginOfError: 1.5,
    },
  },
  {
    id: "bnhps",
    label: "Black non-Hispanic",
    datum: {
      value: 69646,
      marginOfError: 301,
      coefficientOfVariation: 0.2,
    },
    percentage: {
      value: 28,
      marginOfError: 5.3,
    },
  },
  {
    id: "hisp",
    label: "Hispanic",
    datum: {
      value: 134318,
      marginOfError: 2539,
      coefficientOfVariation: 0.4,
    },
    percentage: {
      value: 54,
      marginOfError: 2.1,
    },
  },
];

const DataPage = ({ initialRouteParams }: DataPageProps) => {
  console.log(initialRouteParams); // TODO: Remove this contrived usage of initialRouteParams
  const [shouldShowReliability, setShouldShowReliability] =
    useState<boolean>(false);

  console.log(useDataExplorerState());
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
        <Box>
          <FormControl mb={4} display="flex" alignItems="center">
            <Switch
              isChecked={shouldShowReliability}
              onChange={() => {
                setShouldShowReliability(!shouldShowReliability);
              }}
              id="show-reliability"
            />
            <FormLabel htmlFor="show-reliability" mb="0" ml={4}>
              Show reliability data
            </FormLabel>
          </FormControl>
          <Flex
            direction={{ base: "column", md: "row" }}
            gridGap={{ base: 3, md: 0 }}
          >
            <EstimateTable
              data={testData}
              shouldShowReliability={shouldShowReliability}
            />

            <EstimateTable
              data={testData}
              shouldShowReliability={shouldShowReliability}
            />

            <EstimateTable
              data={testData}
              shouldShowReliability={shouldShowReliability}
            />
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default DataPage;
