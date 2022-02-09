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
  useMediaQuery,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import StaticPageFooter from "@components/StaticPageFooter";

const MethodsPage = () => {
  const [isLargerThan640] = useMediaQuery("(min-width: 640px)");

  return (
    <Flex direction="column" width="100%">
      <Center p="2.5rem" bg="teal">
        <Flex
          direction="row"
          width={["100%", "1024px"]}
          wrap="wrap"
          color="white"
          justifyContent="space-between"
        >
          <Box width={["100%", "60%"]} pb="1rem">
            <Heading size="lg" pb="0.5em">
              Methods and Data Sources
            </Heading>
            <Text fontSize="lg">
              There are many factors that may contribute to residents&apos; risk
              of displacement, though there is no standard methodology for how
              to measure it. Local Law 78 of 2021 outlined a set of factors and
              data points to be incorporated into the index, but directed the
              agencies to determine the complete list and specify methodologies
              for how the data points should be grouped and combined.
            </Text>
          </Box>
          <Box width={["100%", "35%"]} pt="1rem">
            <Heading size="md" pb="0.5em">
              Data Dictionary
            </Heading>
            <Text>
              The data dictionary is a set of information describing the data
              points and methodologies included in the data tool.
            </Text>
            <Text>
              <Link
                href="https://www1.nyc.gov/assets/planning/download/pdf/planning-level/housing-economy/eddt-data-dictionary.pdf"
                textDecoration="underline"
                isExternal
              >
                Data Dictionary <ExternalLinkIcon mx="2px" />
              </Link>
            </Text>
          </Box>
        </Flex>
      </Center>

      <Center p="2.5rem">
        <Flex
          direction="row-reverse"
          width={["100%", "1024px"]}
          wrap="wrap"
          justifyContent="space-between"
        >
          <Box width={["100%", "60%"]}>
            <Box width={["100%"]} pb="3rem">
              <Heading size="lg" pb="0.5em">
                Displacement Risk Index (DRI)
              </Heading>
              <Text pb="0.5em">
                The Displacement Risk Index (the index) will support the
                continuing development of strategies to help enable New Yorkers
                to stay in their homes and neighborhoods.
              </Text>
              <Text pb="0.5em">
                Displacement refers to the involuntary movement of an individual
                or family from their home or neighborhood, whether as the result
                of eviction, unaffordable housing costs, or poor-quality
                housing.
              </Text>
              <Text pb="0.5em">
                There are many factors that may contribute to residents&apos;
                risk of displacement, though there is no standard methodology
                for how to measure it. Local Law 78 of 2021 outlined a set of
                factors and data points to be incorporated into the index, but
                directed the agencies to determine the complete list and specify
                methodologies for how the data points should be grouped and
                combined.
              </Text>
            </Box>

            <Box width={["100%"]}>
              <Heading size="lg" pb="0.5em">
                Sources
              </Heading>
              <UnorderedList spacing="2rem" pb="2rem">
                <ListItem>
                  <Text fontWeight="bold">
                    The New York City Housing and Vacancy Survey (HVS)
                  </Text>
                  <Link
                    href="https://www.census.gov/programs-surveys/nychvs.html"
                    textDecoration="underline"
                    isExternal
                    color="teal"
                  >
                    census.gov/programs-surveys/nychvs.html
                  </Link>
                  <Text color="gray">Year(s): 2017, 2011, 2002</Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">Decennial Census</Text>
                  <Link
                    href="https://www.census.gov/"
                    textDecoration="underline"
                    isExternal
                    color="teal"
                  >
                    census.gov
                  </Link>
                  <Text color="gray">Year(s): 2020, 2010, 2000</Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">
                    The American Community Survey (ACS) Public Use Microdata
                    Sample (PUMS)
                  </Text>
                  <Link
                    href="https://www.census.gov/programs-surveys/nychvs.html"
                    textDecoration="underline"
                    isExternal
                    color="teal"
                  >
                    census.gov/programs-surveys/acs/microdata.html
                  </Link>
                  <Text color="gray">Year(s): 2015-2019, 2008-12</Text>
                </ListItem>
              </UnorderedList>
              <Link
                href="https://www1.nyc.gov/assets/planning/download/pdf/planning-level/housing-economy/eddt-data-dictionary.pdf"
                isExternal
                textDecoration="underline"
                color="teal"
              >
                <Text>
                  <ExternalLinkIcon mx="2px" /> See all sources on the Data
                  Dictionary
                </Text>
              </Link>
            </Box>
          </Box>

          <Box width={["100%", "35%"]}>
            {isLargerThan640 ? (
              ""
            ) : (
              <Center py="2em">
                <Divider width={["90%", "1024px"]} borderColor={"#A0AEC0"} />
              </Center>
            )}
            <Heading size="md" pb="0.5em">
              Metadata
            </Heading>
            <Text fontWeight="bold" pt="0.5em">
              Created
            </Text>
            <Text>April 2022</Text>
            <Text fontWeight="bold" pt="0.5em">
              Updated
            </Text>
            <Text>April 2022</Text>
            <Text fontWeight="bold" pt="0.5em">
              Category
            </Text>
            <Text>
              housing conditions, demographic conditions, public health and more
            </Text>
            <Text fontWeight="bold" pt="0.5em">
              Permissions
            </Text>
            <Text>Public</Text>
            <Text fontWeight="bold" pt="0.5em">
              Published by
            </Text>
            <Text>
              NYC Department of City Planning, NYC Housing Preservation &amp;
              Development
            </Text>
          </Box>
        </Flex>
      </Center>

      <Center>
        <Box width={["100%", "1024px"]} py="2rem">
          <StaticPageFooter />
        </Box>
      </Center>
    </Flex>
  );
};

export default MethodsPage;
