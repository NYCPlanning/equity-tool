import {
  Flex,
  Box,
  Center,
  Heading,
  Text,
  Link,
  ListItem,
  UnorderedList,
  Divider,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import StaticPageFooter from "@components/StaticPageFooter";
import ReactGA from "react-ga4";

const MethodsPage = () => (
  <Flex direction="column" width="100%">
    <Center px={{ base: 4, lg: 6 }} py={8} bg="teal">
      <Flex
        direction={{ base: "column", xl: "row" }}
        maxW={{ xl: "1024px" }}
        wrap="wrap"
        color="white"
        py={10}
        gridGap={{ base: 10, xl: 20 }}
      >
        <Box flex={{ base: "auto", xl: 2 }}>
          <Heading size="lg" pb="0.5em" fontSize="2.375rem">
            Methods and Data Sources
          </Heading>
          <Text fontSize="1.5625rem" lineHeight="2.1875rem">
            <Link
              href="https://legistar.council.nyc.gov/LegislationDetail.aspx?ID=3963886&GUID=D2C9A25B-0036-416E-87CD-C3AED208AE1B"
              textDecoration="underline"
              isExternal
              color={"white"}
              onClick={() => {
                ReactGA.event({
                  category: "About Page",
                  action: "Outbound Click",
                  label: "Local Law 78 of 2021",
                });
              }}
            >
              Local Law 78 of 2021
            </Link>{" "}
            outlined a set of indicators to be included in the Equitable
            Development Data Explorer, but directed the NYC Departments of City
            Planning and Housing Preservation and Development to determine the
            complete list of data points and specify methodologies for how the
            data points should be incorporated into a displacement risk map.
            Below, please find descriptions of the data sources and
            methodologies.
          </Text>
        </Box>
        <Box flex={{ base: "auto", xl: 1 }}>
          <Heading size="md" pb="0.5em" fontSize="1.5625rem">
            Data Dictionary
          </Heading>
          <Text>
            The data dictionary is a set of information describing the data
            points, sources, and methodologies included in the Explorer.
          </Text>
          <Text>
            <Link
              href="https://www1.nyc.gov/assets/planning/download/pdf/planning-level/housing-economy/eddt-data-dictionary.pdf"
              textDecoration="underline"
              isExternal
              color={"white"}
              onClick={() => {
                ReactGA.event({
                  category: "About Page",
                  action: "Outbound Click",
                  label: "Data Dictionary",
                });
              }}
            >
              Data Dictionary <ExternalLinkIcon mx="2px" />
            </Link>
          </Text>
        </Box>
      </Flex>
    </Center>
    <Center py={{ base: 10, xl: 20 }} px={{ base: 4, lg: 6 }}>
      <Flex
        direction={{ base: "column", xl: "row-reverse" }}
        maxW={{ xl: "1024px" }}
        wrap="wrap"
        justifyContent="space-between"
        gridGap={{ base: 0, xl: 20 }}
      >
        <Box flex={{ base: "auto", xl: 2 }}>
          <Box width={["100%"]} pb="1.5rem">
            <Heading size="lg" pb="0.5em" fontSize="2.125rem">
              Community Data Methodology
            </Heading>
            <Text pb="0.5em" lineHeight="1.625rem">
              Community Data contains demographic, housing, and quality of life
              data broken out by race and ethnicity (when available) at the
              neighborhood, borough, and citywide scales. Community Data also
              shows change over time between 2000 and 2020. See data sources
              below.
            </Text>
          </Box>
          <Box width={["100%"]} pb="1.5rem">
            <Heading size="lg" pb="0.5em" fontSize="2.125rem">
              Displacement Risk Map Methodology
            </Heading>
            <Text pb="0.5em" lineHeight="1.625rem">
              Local Law 78 of 2021 called for the creation of a displacement
              risk index or a map of the city that illustrates the level of
              displacement risk in different neighborhoods as compared to each
              other. <b>Displacement</b> refers to the involuntary movement of
              an individual or family from their home or neighborhood, whether
              as the result of eviction, unaffordable housing costs, or
              poor-quality housing. There are many factors that may contribute
              to residents&apos; risk of displacement, though there is no
              standard methodology for how to measure it. Building on data
              points listed in Local Law 78 of 2021, DCP and HPD identified a
              complete set of data points and a methodology to combine the data
              points into an index based on research, precedents from other
              cities, and conversations with stakeholders.
            </Text>
          </Box>
          <Box width={["100%"]} pb="1.5rem">
            <Heading size="lg" pb="0.5em" fontSize="1.5625rem">
              The three major categories of data points in the displacement risk
              index include:
            </Heading>
            <UnorderedList lineHeight="1.625rem">
              <ListItem>
                <b>Population Vulnerability:</b> This category refers to the
                demographic and socioeconomic characteristics of a
                neighborhood&apos;s residents that may make them more
                susceptible to displacement. It includes data points such as
                race/ethnicity, income, and the share of a household&apos;s
                income spent on rent.
              </ListItem>
              <ListItem>
                <b>Housing Conditions:</b> This category refers to the
                characteristics of housing in a neighborhood that can either
                help stabilize households or lead to greater instability. It
                includes data points such as condition of the housing stock,
                whether a household rents or owns, and applicability of various
                programs or regulations limiting rent increases.{" "}
              </ListItem>
              <ListItem>
                <b>Market Pressure:</b> This category refers to the broader
                conditions affecting neighborhoods that tend to make it harder
                for lower-income residents to remain or find new housing in the
                area. It includes data points related to changes in the housing
                market and demographic composition of a neighborhood, among
                others.
              </ListItem>
            </UnorderedList>
          </Box>
          <Box width={["100%"]} pb="1.5rem">
            <Heading size="lg" pb="0.5em" fontSize="1.5625rem">
              Methodology to Combine the Data Points into an Index:
            </Heading>
            <Text pb="1rem">
              When incorporating the data into an index, individual data points
              or categories could be emphasized over others, depending on how
              strongly they contribute to the likelihood of residents&apos;
              ability to stay in their homes. Because research suggests that
              demographic data are a stronger predictor of displacement risk
              than housing conditions or market pressure data, DCP and HPD
              focused on methodologies to combine the data while prioritizing
              population characteristics (e.g. race, income, English language
              proficiency, and rent burden).
            </Text>
            <Text pb="1rem">
              Our selected methodology creates an overall risk level based on
              how neighborhood and housing conditions magnify or reduce
              population vulnerability. This methodology assumes that population
              vulnerability drives displacement risk and considers how it can be
              exacerbated by market pressure or mitigated by housing security.
            </Text>
            <Text pb="1rem">
              See our{" "}
              <Link
                href="https://www1.nyc.gov/assets/planning/download/pdf/planning-level/housing-economy/eddt-data-dictionary.pdf"
                isExternal
                onClick={() => {
                  ReactGA.event({
                    category: "About Page",
                    action: "Outbound Click",
                    label: "Data Dictionary",
                  });
                }}
              >
                Data Dictionary
              </Link>{" "}
              for more information on the methodology we used to combine the
              data points and an analysis that was conducted to compare the
              model to other data associated with displacement.
            </Text>
          </Box>
          <Box width={["100%"]} pb="1.5rem">
            <Heading size="lg" pb="0.5em" fontSize="1.5625rem">
              Displacement Risk Data Point maps:
            </Heading>
            <Text pb="1rem">
              See{" "}
              <Link
                href="https://storymaps.arcgis.com/stories/79237333bb90492ba0de486c0705f9f7"
                isExternal
                onClick={() => {
                  ReactGA.event({
                    category: "About Page",
                    action: "Outbound Click",
                    label: "Storymaps",
                  });
                }}
              >
                here
              </Link>{" "}
              for maps of each of the data points that comprise the displacement
              risk map and the categories they are grouped within (e.g.
              population vulnerability, housing conditions, market pressure).
            </Text>
            <Divider borderColor={"#A0AEC0"} pb="1rem" />
          </Box>
          <Box width={["100%"]} pb="1.5rem">
            <Heading size="lg" pb="0.5em" fontSize="2.125rem">
              Explanation of the geographic scale used for Equitable Development
              Data Tool
            </Heading>
            <Text pb="0.5em" lineHeight="1.625rem">
              The data that makes up Community Data is displayed at the Public
              Use Microdata Area (PUMA) scale, a statistical area defined by the
              US Census. PUMAs in New York City generally approximate Community
              Districts. Displaying the data at the PUMA scale allows the tool
              to report data broken down by race and ethnicity. Data in
              Community Data is also reported at the borough and citywide
              levels.
            </Text>
            <Text pb="0.5em" lineHeight="1.625rem">
              The Displacement Risk Map, which is not broken down by race and
              ethnicity, is displayed at a smaller geography, Neighborhood
              Tabulation Areas (NTA). NTAs are groupings of census tracts that
              are designed to approximate neighborhoods.
            </Text>
            <Divider borderColor={"#A0AEC0"} pb="1rem" />
          </Box>
          <Box width={["100%"]} pb="1.5rem">
            <Heading size="lg" pb="0.5em" fontSize="2.125rem">
              Data Reliability
            </Heading>
            <Text pb="0.5em" lineHeight="1.625rem">
              The data tool incorporates several data sources that are surveys,
              such as the American Community Survey (ACS) and the Housing and
              Vacancy Survey (HVS), meaning the data are based on a sample and
              there is a margin of error (MOE) associated with each data
              estimate. Estimates and associated MOEs vary greatly in size, so
              it helps to examine the size of an MOE in relation to its
              associated estimate to better understand the relative reliability
              using a coefficient of variation (CV). These measures of
              reliability help you gauge the degree to which they can trust any
              given statistic.
            </Text>
            <Text pb="0.5em" lineHeight="1.625rem">
              Indicators in the tool may include values in a gray font color
              which mean that they have poor statistical reliability. For
              estimates and margins of error with a coefficient of variation,
              the gray font color is an indication that the CV is greater than
              or equal to 20%. Data associated with count estimates of zero and
              top-coded median (estimate can be anywhere above the displayed
              value) and bottom-coded median (estimate can be anywhere below the
              displayed value) are also shown in a gray font color to alert
              users that data are either relatively unreliable, or of
              indeterminate reliability. Estimates, and associated MOEs, of
              change over time for a selected area may also be shown in a gray
              font color, indicating that the estimates have poor statistical
              reliability (CVs are greater than or equal to 20%).
            </Text>
            <Text pb="0.5em" lineHeight="1.625rem">
              For more information, visit{" "}
              <Link
                href="https://www1.nyc.gov/site/planning/data-maps/nyc-population/geographic-reference.page"
                isExternal
                onClick={() => {
                  ReactGA.event({
                    category: "About Page",
                    action: "Outbound Click",
                    label: "NYC Population: Geographic Reference",
                  });
                }}
              >
                NYC Population: Geographic Reference
              </Link>
              .
            </Text>

            <Divider borderColor={"#A0AEC0"} pb="1rem" />
          </Box>

          <Box width={["100%"]}>
            <Heading size="lg" pb="0.5em" fontSize="2.125rem">
              Sources
            </Heading>
            <UnorderedList spacing="2rem" pb="2rem">
              <ListItem>
                <Text fontWeight="bold">Decennial Census</Text>
                <Link
                  href="https://www.census.gov/programs-surveys/decennial-census/decade/2020/planning-management/release/faqs-race-ethnicity.html"
                  isExternal
                  onClick={() => {
                    ReactGA.event({
                      category: "About Page",
                      action: "Outbound Click",
                      label: "Census Bureau FAQ About Race and Ethnicity",
                    });
                  }}
                >
                  Census Bureau FAQ About Race and Ethnicity
                </Link>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">
                  The American Community Survey (ACS)
                </Text>
                <Link
                  href="https://www2.census.gov/programs-surveys/acs/tech_docs/subject_definitions/2020_ACSSubjectDefinitions.pdf"
                  isExternal
                  onClick={() => {
                    ReactGA.event({
                      category: "About Page",
                      action: "Outbound Click",
                      label: "American Community Survey Subject Definitions",
                    });
                  }}
                >
                  American Community Survey Subject Definitions
                </Link>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">
                  New York City Housing Preservation and Development
                </Text>
                <Link
                  href="https://data.cityofnewyork.us/Housing-Development/Housing-New-York-Units-by-Building/hg8x-zxpr"
                  isExternal
                  onClick={() => {
                    ReactGA.event({
                      category: "About Page",
                      action: "Outbound Click",
                      label:
                        "NYC Open Data - Housing New York Units by Building",
                    });
                  }}
                >
                  NYC Open Data - Housing New York Units by Building
                </Link>
                <br />
                <Link
                  href="https://www.census.gov/programs-surveys/nychvs.html"
                  isExternal
                  onClick={() => {
                    ReactGA.event({
                      category: "About Page",
                      action: "Outbound Click",
                      label: "Housing and Vacancy Survey (NYCHVS)",
                    });
                  }}
                >
                  Housing and Vacancy Survey (NYCHVS)
                </Link>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">
                  New York State Department of Health
                </Text>
                <Link
                  href="https://www.health.ny.gov/statistics/sparcs/"
                  isExternal
                  onClick={() => {
                    ReactGA.event({
                      category: "About Page",
                      action: "Outbound Click",
                      label:
                        "Statewide Planning and Research Cooperative System",
                    });
                  }}
                >
                  Statewide Planning and Research Cooperative System
                </Link>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">
                  New York City Department of City Planning
                </Text>
                <Link
                  href="https://www1.nyc.gov/site/planning/data-maps/open-data/dwn-pluto-mappluto.page"
                  isExternal
                  onClick={() => {
                    ReactGA.event({
                      category: "About Page",
                      action: "Outbound Click",
                      label: "New York City PLUTO and MapPLUTO",
                    });
                  }}
                >
                  New York City PLUTO and MapPLUTO
                </Link>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">
                  NYC Department of Health and Mental Hygiene (DOHMH) Community
                  Health Survey
                </Text>
                <Link
                  href="https://www1.nyc.gov/site/doh/data/data-sets/community-health-survey.page"
                  isExternal
                  onClick={() => {
                    ReactGA.event({
                      category: "About Page",
                      action: "Outbound Click",
                      label: "Community Health Survey",
                    });
                  }}
                >
                  Community Health Survey
                </Link>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">
                  NYC Department of Health and Mental Hygiene (DOHMH) Vital
                  Health Data
                </Text>
                <Link
                  href="https://www1.nyc.gov/site/doh/data/data-sets/vital-statistics-data.page"
                  isExternal
                  onClick={() => {
                    ReactGA.event({
                      category: "About Page",
                      action: "Outbound Click",
                      label: "Vital Statistics Data",
                    });
                  }}
                >
                  Vital Statistics Data
                </Link>
              </ListItem>
            </UnorderedList>
          </Box>
        </Box>

        <Center display={{ base: "block", xl: "none" }} py={8}>
          <Divider borderColor={"#A0AEC0"} />
        </Center>

        <Box flex={{ base: "auto", xl: 1 }}>
          <Text fontWeight="bold" pt="0.5em" fontSize="1.25rem">
            Created
          </Text>
          <Text>April 2022</Text>
          <Text fontWeight="bold" pt="0.5em" fontSize="1.25rem">
            Updated
          </Text>
          <Text>April 2022</Text>
          <Text fontWeight="bold" pt="0.5em" fontSize="1.25rem">
            Category
          </Text>
          <Text>
            housing conditions, demographic conditions, public health and more
          </Text>
          <Text fontWeight="bold" pt="0.5em" fontSize="1.25rem">
            Permissions
          </Text>
          <Text>Public</Text>
          <Text fontWeight="bold" pt="0.5em" fontSize="1.25rem">
            Published by
          </Text>
          <Text>
            NYC Department of City Planning, NYC Housing Preservation &amp;
            Development
          </Text>
        </Box>
      </Flex>
    </Center>

    <Center px={{ base: 4, lg: 6 }}>
      <Box width={"full"} maxW={{ xl: "1024px" }} py={8}>
        <StaticPageFooter />
      </Box>
    </Center>
  </Flex>
);

export default MethodsPage;
