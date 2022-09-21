import React, { useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import {
  Box,
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Switch,
  Select,
  Heading,
  Link,
  HStack,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Indicator } from "@components/Indicator";
import { CategoryMenu } from "@components/CategoryMenu";
import { GeographyInfo } from "@components/GeographyInfo";
import { DataDownloadModal } from "@components/DataDownloadModal";
import { ExplorerSideNav } from "@components/ExplorerSideNav";
import { useDataExplorerState } from "@hooks/useDataExplorerState";
import { Category } from "@constants/Category";
import { categoryLabels } from "@constants/CategoryLabels";
import pumas from "@data/pumas.json";
import { DataExplorerService } from "@services/DataExplorerService";
import { categoryProfileSchema } from "@schemas/categoryProfile";
import { IndicatorRecord } from "@schemas/indicatorRecord";
import { useRouter } from "next/router";
import ReactGA from "react-ga4";
import { parseDataExplorerSelection } from "@helpers/parseDataExplorerSelection";
import { Subgroup } from "@constants/Subgroup";
import { hasOwnProperty } from "@helpers/hasOwnProperty";
import { TablesIsOpenProvider } from "@contexts/TablesIsOpenContext";

export interface DataPageProps {
  hasRacialBreakdown: boolean;
  indicators: IndicatorRecord[];
  heading: string;
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths: any[] = [];
  const pumaIds = Object.keys(pumas);
  const boroCodes = ["1", "2", "3", "4", "5"];
  // subset of categories, add to this list when data
  // for a category is uploaded
  const categories = [
    Category.DEMO,
    Category.ECON,
    Category.HSAQ,
    Category.HOPD,
    Category.QLAO,
  ];

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
          heading: categoryLabels[category],
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

const DataPage = ({
  hasRacialBreakdown,
  indicators,
  heading,
}: DataPageProps) => {
  // TODO - Can refactor this flag into a Context so that it doesn't have to be
  // prop drilled all the way down to VintageTable
  const [shouldShowReliability, setShouldShowReliability] =
    useState<boolean>(false);
  const { geography, geoid, category, subgroup } = useDataExplorerState();
  const router = useRouter();

  const tablesSetIsOpens: React.Dispatch<boolean>[] = [];

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
      <ExplorerSideNav />
      <Box flexGrow={1} overflowX={{ base: "initial", md: "hidden" }}>
        <Box
          marginTop={"0.75rem"}
          paddingBottom={"1rem"}
          borderBottomColor={"gray.300"}
          borderBottomWidth={{ base: 0, md: "1px" }}
        >
          <Flex
            direction={"row"}
            justifyContent={"space-between"}
            paddingX={{ base: "0.75rem", md: "1rem" }}
          >
            <Box
              as="a"
              href={`/map/data/${geography}?geoid=${geoid}`}
              color={"gray.600"}
              fontSize={"0.875rem"}
            >
              <ArrowBackIcon w={"1.5rem"} h={"1.5rem"} color={"gray.600"} />
              back to map
            </Box>
            <DataDownloadModal
              downloadType={"data"}
              geoid={geoid}
              geography={geography}
            />
          </Flex>
          <GeographyInfo
            geoid={geoid}
            geography={geography}
            marginX={{ base: "0.75rem", md: "1rem" }}
            paddingBottom={"1rem"}
            borderBottom={{ base: "gray.200", md: "none" }}
            borderBottomWidth={{ base: "1px", md: "unset" }}
          />
          <CategoryMenu
            geography={geography}
            geoid={geoid}
            currentCategory={category}
            display={{ base: "flex", md: "none" }}
            justify={"start"}
            marginTop={"0.5rem"}
            marginBottom={"1rem"}
          />
          <Box
            width={{ base: "full", md: "max-content" }}
            paddingX={{ base: "0.75rem", md: "1rem" }}
          >
            <Select
              isDisabled={!hasRacialBreakdown}
              onChange={changeSubgroup}
              value={subgroup}
            >
              <option value="tot">Total Population</option>
              <option value="anh">Asian Non-Hispanic</option>
              <option value="bnh">Black Non-Hispanic</option>
              <option value="hsp">Hispanic</option>
              <option value="wnh">White Non-Hispanic</option>
            </Select>
          </Box>
        </Box>
        <Flex
          direction={{ base: "column", md: "row" }}
          paddingX={{ base: "0.75rem", md: "1rem" }}
          justifyContent={"space-between"}
          alignItems="start"
          paddingTop={{ base: "0rem", md: "2.125rem" }}
          paddingBottom={{ base: "1rem", md: "0.75rem" }}
          gridGap={"1rem"}
        >
          <Box>
            <Heading as="h3" fontSize="1.5625rem">
              {heading}
            </Heading>
            <Text>
              Note: Data shown in gray have poor statistical reliability. Learn
              more about our{" "}
              <Link href="/methods" textDecoration="underline">
                data sources
              </Link>
              .
              <br />
              {category === Category.HOPD &&
                "Data not available by race/ethnicity."}
            </Text>
          </Box>
          {category !== Category.HOPD && (
            <FormControl width={"auto"} display={"flex"} alignItems="center">
              <Switch
                colorScheme="teal"
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
          )}
        </Flex>
        <HStack
          width="100%"
          paddingX={{ base: "0.75rem", md: "1rem" }}
          paddingTop={{ base: "0rem" }}
          paddingBottom={{ base: "1rem", md: "0.75rem" }}
          display={{
            base: "auto",
            md: "none",
          }}
        >
          <Button
            variant="outline"
            fontWeight="400"
            onClick={() => {
              tablesSetIsOpens.forEach((setIsOpen) => {
                setIsOpen(false);
              });
            }}
            data-cy="collapseAllTables"
          >
            Collapse All Tables
          </Button>
          <Button
            variant="outline"
            fontWeight="400"
            onClick={() => {
              tablesSetIsOpens.forEach((setIsOpen) => {
                setIsOpen(true);
              });
            }}
            data-cy="expandAllTables"
          >
            Expand All Tables
          </Button>
        </HStack>

        <Box paddingLeft={{ base: "0.75rem", md: "1rem" }}>
          <TablesIsOpenProvider tablesSetIsOpens={tablesSetIsOpens}>
            {indicators.map((indicator, i) => (
              <Indicator
                key={`indicator-${i}`}
                indicator={indicator}
                shouldShowReliability={shouldShowReliability}
              />
            ))}
          </TablesIsOpenProvider>
        </Box>
      </Box>
    </Flex>
  );
};

export default DataPage;
