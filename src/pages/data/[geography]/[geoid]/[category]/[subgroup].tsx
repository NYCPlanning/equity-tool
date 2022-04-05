import { useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
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
import { DataDownloadModal } from "@components/DataDownloadModal";
import { Indicator } from "@components/Indicator";
import { CategoryMenu } from "@components/CategoryMenu";
import { GeographyInfo } from "@components/GeographyInfo";
import { useDataExplorerState } from "@hooks/useDataExplorerState";
import { Geography } from "@constants/geography";
import { Category } from "@constants/Category";
import pumas from "@data/pumas.json";
import { DataExplorerService } from "@services/DataExplorerService";
import { categoryProfileSchema } from "@schemas/categoryProfile";
import { IndicatorRecord } from "@schemas/indicatorRecord";
import { useRouter } from "next/router";
import ReactGA from "react-ga4";
import { parseDataExplorerSelection } from "@helpers/parseDataExplorerSelection";
import { Subgroup } from "@constants/Subgroup";
import { hasOwnProperty } from "@helpers/hasOwnProperty";
import { getBoroughName } from "@helpers/getBoroughName";

export interface DataPageProps {
  hasRacialBreakdown: boolean;
  indicators: IndicatorRecord[];
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths: any[] = [];
  const pumaIds = Object.keys(pumas);
  const boroCodes = ["1", "2", "3", "4", "5"];
  // subset of categories, add to this list when data
  // for a category is uploaded
  const categories = [Category.HSAQ, Category.ECON];

  categories.forEach((category) => {
    Object.values(Subgroup).forEach((subgroup) => {
      // Build list of paths for districs (pumas)
      pumaIds.forEach((geoid) => {
        paths.push({
          params: { geography: "district", geoid, category, subgroup },
        });
      });

      // Build list of paths for boroughs
      boroCodes.forEach((geoid) => {
        paths.push({
          params: { geography: "borough", geoid, category, subgroup },
        });
      });

      // Add path for citywide
      paths.push({
        params: { geography: "citywide", geoid: "nyc", category, subgroup },
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (typeof context.params === "undefined") {
    return {
      notFound: true,
    };
  }
  const { subgroup, geography, geoid, category } = parseDataExplorerSelection(
    context.params
  );

  const dataExplorerService = new DataExplorerService(
    process.env.NEXT_PUBLIC_DO_SPACE_URL
      ? process.env.NEXT_PUBLIC_DO_SPACE_URL
      : ""
  );

  try {
    // Download the data file for this geoid and category
    const res = await dataExplorerService.get(geography, geoid, category);
    // Validate file follows expected schema
    const profile = await categoryProfileSchema.validate(res.data);

    // Enabled subgroup dropdown if category profile has values for each subgroup
    const hasRacialBreakdown =
      JSON.stringify(Object.keys(profile).sort()) ===
      JSON.stringify(Object.values(Subgroup).sort());
    // Return Profile data for given subgroup
    if (hasOwnProperty(profile, subgroup)) {
      return {
        props: {
          hasRacialBreakdown,
          indicators: profile[subgroup],
        },
      };
    }
    // Return 404 if Profile doesn't have data for subgroup
    return {
      notFound: true,
    };
  } catch (e) {
    // TODO - Catch and handle errors here
    console.log(e);
    // Return 404 if download or schema validation failed
    return {
      notFound: true,
    };
  }
};

const DataExplorerNav = () => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  const { geography, geoid, category } = useDataExplorerState();

  const toggleSidebar = () => {
    ReactGA.event({
      category: "Toggle Sidebar Open",
      action: "Click",
      label: (!isOpen).toString(),
    });
    onToggle();
  };

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
              {geography === Geography.BOROUGH && getBoroughName(geoid)}
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
        onClick={toggleSidebar}
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

const DataPage = ({ hasRacialBreakdown, indicators }: DataPageProps) => {
  // TODO - Can refactor this flag into a Context so that it doesn't have to be
  // prop drilled all the way down to VintageTable
  const [shouldShowReliability, setShouldShowReliability] =
    useState<boolean>(true);
  const { geography, geoid, category, subgroup } = useDataExplorerState();
  const router = useRouter();
  const changeSubgroup = (event: any) => {
    router.push(
      `/data/${geography}/${geoid}/${category}/${event.target.value}`
    );
  };

  const toggleReliability = () => {
    ReactGA.event({
      category: "Show reliability data",
      action: "Click",
      label: (!shouldShowReliability).toString(),
    });
    setShouldShowReliability(!shouldShowReliability);
  };

  return (
    <Flex
      width={"full"}
      height={"full"}
      direction={{ base: "column", md: "row" }}
      gridGap={{ base: "1.5rem", md: "0rem" }}
    >
      <DataExplorerNav />
      <Box flexGrow={1} overflowX={{ base: "initial", md: "hidden" }}>
        <Box>
          <DataDownloadModal downloadType="datatool" geoid={geoid} />
        </Box>
        <Box width={{ base: "full", md: "max-content" }} p={"1rem"}>
          <Select
            isDisabled={!hasRacialBreakdown}
            onChange={changeSubgroup}
            defaultValue={subgroup}
          >
            <option value="tot">Total Population</option>
            <option value="wnh">White Non-hispanic</option>
            <option value="bnh">Black Non-hispanic</option>
            <option value="anh">Asian Non-hispanic</option>
            <option value="hsp">Hispanic</option>
          </Select>
        </Box>
        <Divider display={{ base: "none", md: "block" }} color={"gray.300"} />
        <FormControl mb={4} display="flex" alignItems="center">
          <Switch
            isChecked={shouldShowReliability}
            onChange={() => {
              toggleReliability();
            }}
            id="show-reliability"
          />
          <FormLabel htmlFor="show-reliability" mb="0" ml={4}>
            Show reliability data
          </FormLabel>
        </FormControl>
        <Box paddingLeft={{ base: "0.75rem", md: "1rem" }}>
          {indicators.map((indicator, i) => (
            <Indicator
              key={`indicator-${i}`}
              indicator={indicator}
              shouldShowReliability={shouldShowReliability}
            />
          ))}
        </Box>
      </Box>
    </Flex>
  );
};

export default DataPage;
