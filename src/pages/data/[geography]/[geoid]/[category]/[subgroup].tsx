import React, { useState, useRef } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import {
  Box,
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Switch,
  Heading,
  Link,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  IconButton,
} from "@chakra-ui/react";
import { ArrowBackIcon, InfoIcon } from "@chakra-ui/icons";
import { Indicator } from "@components/Indicator";
import { CategoryMenu } from "@components/CategoryMenu";
import { DataDownloadModal } from "@components/DataDownloadModal";
import { ExplorerSideNav } from "@components/ExplorerSideNav";
import { SubgroupMenu } from "@components/SubgroupMenu";
import { BackToTop } from "@components/BackToTop";
import { useGeography } from "@hooks/useGeography";
import { useCategory } from "@hooks/useCategory";
import { useGeoidDescription } from "@hooks/useGeoidDescription";
import { usePumaInfo } from "@hooks/usePumaInfo";
import { Category } from "@constants/Category";
import { Subgroup } from "@constants/Subgroup";
import { categoryLabels } from "@constants/CategoryLabels";
import pumas from "@data/pumas.json";
import { DataExplorerService } from "@services/DataExplorerService";
import { categoryProfileSchema } from "@schemas/categoryProfile";
import { IndicatorRecord } from "@schemas/indicatorRecord";
import ReactGA from "react-ga4";
import { hasOwnProperty } from "@helpers/hasOwnProperty";
import { TablesIsOpenProvider } from "@contexts/TablesIsOpenContext";
import { Geography } from "@constants/geography";
import { useWindowWidth } from "@react-hook/window-size";
import { View } from "@constants/View";
import { AMIFootnote, HPSFootnote } from "@components/Footnote";

export interface DataPageProps {
  indicators: IndicatorRecord[];
  geoid: string;
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

  const { subgroup, geography, geoid, category } = context.params;
  if (
    typeof subgroup !== "string" ||
    typeof geography !== "string" ||
    typeof geoid !== "string" ||
    typeof category !== "string"
  ) {
    return {
      notFound: true,
    };
  }

  const spaceFolder = "2025-06-18--v1";

  const dataExplorerService = new DataExplorerService(
    process.env.NEXT_PUBLIC_DO_SPACE_URL
      ? `${process.env.NEXT_PUBLIC_DO_SPACE_URL}/app/${spaceFolder}`
      : ""
  );

  try {
    // Download the data file for this geoid and category
    const res = await dataExplorerService.get(geography, geoid, category);
    // Validate file follows expected schema
    const profile = await categoryProfileSchema.validate(res.data);

    // Return Profile data for given subgroup
    if (hasOwnProperty(profile, subgroup)) {
      return {
        props: {
          indicators: profile[subgroup],
          geoid,
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

const DataPage = ({ indicators, geoid }: DataPageProps) => {
  // TODO - Can refactor this flag into a Context so that it doesn't have to be
  // prop drilled all the way down to VintageTable
  const [shouldShowReliability, setShouldShowReliability] =
    useState<boolean>(false);
  const geography = useGeography();
  const category = useCategory();
  const pumaInfo = usePumaInfo();
  const isMobile = useWindowWidth() < 768;

  const tablesSetIsOpens: React.Dispatch<boolean>[] = [];

  const toggleReliability = () => {
    ReactGA.event({
      category: "Show reliability data",
      action: "Click",
      label: (!shouldShowReliability).toString(),
    });
    setShouldShowReliability(!shouldShowReliability);
  };

  const geoidDescription = useGeoidDescription();
  const initialFocusRef = useRef(null);

  return (
    <Flex
      width={"full"}
      height={"full"}
      direction={{ base: "column", md: "row" }}
      gridGap={{ base: "1.5rem", md: "0rem" }}
    >
      <ExplorerSideNav geoid={geoid} />

      <Box flexGrow={1} overflowX={{ base: "initial", md: "hidden" }}>
        {isMobile && <BackToTop />}

        <Flex
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          paddingTop={"0.75rem"}
          marginRight={"1rem"}
          paddingLeft={{ base: "0.75rem", md: "1rem" }}
          background={"white"}
          position={{ base: "relative", md: "sticky" }}
          top={{ base: "unset", md: "0" }}
          zIndex={"200"}
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
            downloadType={View.DATA}
            geoid={geoid}
            geography={geography}
          />
        </Flex>
        <Box display={{ base: "block", md: "none" }} marginTop={"0.75rem"}>
          <Text
            width={"100%"}
            color={"gray.600"}
            textAlign="center"
            fontSize={"0.8125rem"}
            marginBottom={"1rem"}
          >
            {geography === Geography.DISTRICT ? (
              <>
                {geoidDescription.label}
                <br />
                {geoidDescription.id} - {pumaInfo ? pumaInfo.districts : ""}
              </>
            ) : (
              geoidDescription.label
            )}
          </Text>
          <CategoryMenu
            geography={geography}
            geoid={geoid}
            currentCategory={category}
            justify={"start"}
            marginTop={"0.5rem"}
            marginBottom={"1rem"}
            paddingLeft={{ base: "0.75rem", md: "1rem" }}
          />
        </Box>
        <Box
          paddingTop={"1rem"}
          position={"sticky"}
          top={{ base: "0px", md: "52px" }} // Match height of "back to map" <Flex>
          background={"white"}
          zIndex={"200"}
        >
          <Box
            paddingBottom={{ base: "1rem", md: "1.5rem" }}
            paddingX={{ base: "0.75rem", md: "1rem" }}
          >
            <Heading
              as="h1"
              fontWeight={700}
              textTransform={"capitalize"}
              fontSize={"1.5625rem"}
              color={"gray.700"}
              data-cy="geoInfoPrimaryHeading"
            >
              {categoryLabels[category]}:{" "}
              <Text as="span" fontWeight={400}>
                {geoidDescription.label}
              </Text>
            </Heading>
            {category === Category.HOPD && (
              <Text
                fontStyle={"italic"}
                color={"gray.600"}
                marginTop="0.25rem"
                fontSize={"0.8125rem"}
                lineHeight={"2"}
              >
                *Racial breakdowns are not available for Housing Production.
              </Text>
            )}
          </Box>
          <Flex
            direction={"row"}
            justify={"space-between"}
            flexWrap={"wrap-reverse"}
            gap={{ base: "1rem", md: "1.5rem" }}
            borderBottomColor={"gray.300"}
            borderBottomWidth={"1px"}
          >
            <SubgroupMenu />
            {category !== Category.HOPD && (
              <FormControl
                width={"auto"}
                display={"flex"}
                alignItems="center"
                marginRight={"1rem"}
                paddingLeft={{ base: "0.75rem", md: "1rem" }}
              >
                <Switch
                  colorScheme="gray"
                  isChecked={shouldShowReliability}
                  onChange={() => {
                    toggleReliability();
                  }}
                  id="show-reliability"
                />
                <FormLabel
                  htmlFor="show-reliability"
                  mb="0"
                  marginX={"0.375rem"}
                  color={"gray.700"}
                  whiteSpace={"nowrap"}
                >
                  Show reliability data
                </FormLabel>
                <Popover placement="top-end" initialFocusRef={initialFocusRef}>
                  <PopoverTrigger>
                    <IconButton
                      icon={<InfoIcon color="gray.400" />}
                      aria-label="Show data reliability warning"
                      background={"transparent"}
                      minWidth={"auto"}
                      height={"auto"}
                      _hover={{ background: "transparent" }}
                    />
                  </PopoverTrigger>
                  <PopoverContent backgroundColor={"#000"} width={"320px"}>
                    <PopoverArrow backgroundColor={"#000"} />
                    <PopoverBody width={"320px"} color={"#fff"}>
                      Note: Data shown in gray have poor statistical
                      reliability. Learn more about our{" "}
                      <Link
                        ref={initialFocusRef}
                        href="/methods"
                        color={"#fff"}
                      >
                        data sources
                      </Link>
                      .
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </FormControl>
            )}
          </Flex>
        </Box>
        <HStack
          width="100%"
          paddingTop={"0.75rem"}
          paddingLeft={{ base: "0.75rem", md: "1rem" }}
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

        <Box
          marginTop={{ base: "0.75rem", md: "1.5rem" }}
          paddingLeft={{ base: "0.75rem", md: "1rem" }}
        >
          <TablesIsOpenProvider tablesSetIsOpens={tablesSetIsOpens}>
            {indicators.map((indicator, i) => (
              <Indicator
                key={`indicator-${i}`}
                indicator={indicator}
                shouldShowReliability={shouldShowReliability}
              />
            ))}
          </TablesIsOpenProvider>
          <AMIFootnote
            shouldDisplay={[
              Category.ECON,
              Category.HSAQ,
              Category.HOPD,
            ].includes(category)}
          />
          <HPSFootnote shouldDisplay={[Category.QLAO].includes(category)} />
        </Box>
      </Box>
    </Flex>
  );
};

export default DataPage;
