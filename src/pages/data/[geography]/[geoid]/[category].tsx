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
  Select,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { EstimateTable } from "@components/EstimateTable";
import { Estimate } from "@type/Estimate";
import { CategoryMenu } from "@components/CategoryMenu";
import { GeographyInfo } from "@components/GeographyInfo";
import { useDataExplorerState } from "@hooks/useDataExplorerState";
import { Geography } from "@constants/geography";

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

const DataExplorerNav = () => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  const { geography, geoid, category } = useDataExplorerState();

  return (
    <Flex
      flexShrink={"0"}
      direction={"column"}
      height={{ base: "auto", md: "full" }}
      width={{
        base: "full",
        md: isOpen ? "19.25rem" : "4.25rem",
      }}
      overflowX={"hidden"}
      pt={{ base: "1.5rem", md: "4rem" }}
      background={{ base: "white", md: "gray.100" }}
      transition="width 0.5s ease"
    >
      <Box width={{ base: "full", md: "19.25rem" }}>
        {/* "Back to map" button can go here for screen sizes < md */}
        <Flex
          mx={{ base: "0.75rem", md: "0rem" }}
          align={"start"}
          pb={{ base: "0.5rem", md: "0rem" }}
          mb={{
            base: "0.5rem",
            md: geography === Geography.DISTRICT ? "1.5rem" : "2.5rem",
          }}
          borderBottom={{ base: "1px solid", md: "none" }}
          borderBottomColor={"gray.200"}
        >
          <Flex
            width={"4.25rem"}
            minWidth={"4.25rem"}
            direction={"column"}
            display={{ base: "none", md: "flex" }}
            align={"center"}
            gridGap={2}
          >
            <Center
              display={{ base: "none", md: "flex" }}
              borderRadius={"0.625rem"}
              background={"gray.200"}
              width="2.5rem"
              height="2.5rem"
            >
              <Icon as={FaMapMarkerAlt} w={"0.875rem"} height={"1.875rem"} />
            </Center>
            <Text
              fontSize={"0.5rem"}
              color={geography === Geography.DISTRICT ? "#2B797A" : "gray.700"}
              fontWeight={geography === Geography.DISTRICT ? "500" : "700"}
              display={isOpen ? "none" : "block"}
              textTransform={"capitalize"}
            >
              {geography === Geography.DISTRICT && `PUMA ${geoid}`}
              {geography === Geography.BOROUGH && geoid}
              {geography === Geography.CITYWIDE && "Citywide"}
            </Text>
          </Flex>
          <Box pr={"1rem"}>
            <GeographyInfo
              geoid={geoid}
              geography={geography}
              fontSize={{ base: "1.6525rem", md: "1.25rem " }}
            />
          </Box>
        </Flex>

        <CategoryMenu
          geography={geography}
          geoid={geoid}
          currentCategory={category}
          justify={{ base: "space-between", md: "start" }}
        />
      </Box>
      <Spacer />
      <IconButton
        px={"0.75rem"}
        background={"gray.200"}
        display={{ base: "none", md: "flex" }}
        borderRadius={"0rem"}
        width={"full"}
        justifyContent={"end"}
        onClick={onToggle}
        aria-label="Show Categories"
        icon={
          isOpen ? (
            <ChevronLeftIcon
              mr={"0.875rem"}
              color="gray.500"
              _hover={{ color: "gray.500" }}
              w={"2.5rem"}
              h={"2.5rem"}
            />
          ) : (
            <ChevronRightIcon
              mr={"0.875rem"}
              color="gray.500"
              _hover={{ color: "gray.500" }}
              w={"2.5rem"}
              h={"2.5rem"}
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

  const { subgroup } = useDataExplorerState();

  return (
    <Flex
      width={"full"}
      height={"full"}
      direction={{ base: "column", md: "row" }}
      gridGap={{ base: "1.5rem", md: "0rem" }}
    >
      <DataExplorerNav />
      <Box flexGrow={1} overflowX={"hidden"}>
        {/* <Box>Subgroup switcher can go here</Box> */}
        <Box>
          <Select>
            {subgroup === "tot" ? (
              <option value="tot" selected>
                Total Population
              </option>
            ) : (
              <option value="tot">Total Population</option>
            )}
            {subgroup === "wnh" ? (
              <option value="wnh" selected>
                White Non-hispanic
              </option>
            ) : (
              <option value="wnh">White Non-hispanic</option>
            )}
            {subgroup === "bnh" ? (
              <option value="bnh" selected>
                Black Non-hispanic
              </option>
            ) : (
              <option value="bnh">Black Non-hispanic</option>
            )}
            {subgroup === "anh" ? (
              <option value="anh" selected>
                Asian Non-hispanic
              </option>
            ) : (
              <option value="anh">Asian Non-hispanic</option>
            )}
            {subgroup === "hsp" ? (
              <option value="hsp" selected>
                Hispanic
              </option>
            ) : (
              <option value="hsp">Hispanic</option>
            )}
          </Select>
        </Box>
        <Divider display={{ base: "none", md: "block" }} color={"gray.300"} />
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
          overflowX={"auto"}
        >
          <EstimateTable
            data={testData}
            shouldShowReliability={shouldShowReliability}
          />
        </Flex>
      </Box>
    </Flex>
  );
};

export default DataPage;
