import { useEffect } from "react";
import {
  Flex,
  Box,
  Center,
  Heading,
  Text,
  Link,
  Divider,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/react";
import Feedback from "@components/About/Feedback";
import NewsletterFooter from "@components/Footers/NewsletterFooter";
import { DATA_DICTIONARY } from "@constants/externalLink";

const AboutPage = () => {
  useEffect(() => {
    const backToTop = document.getElementById("back-to-top");
    if (backToTop != null) {
      backToTop.scrollTop = 0;
    }
  }, []);

  return (
    <Flex direction="column" width="100%">
      <Center px={{ base: 4, lg: 6 }} py={8} bg="teal">
        <Flex
          direction="row"
          maxW={{ base: "565px", lg: "1024px" }}
          wrap="wrap"
          color="white"
          gridGap={20}
        >
          <Box flex={{ base: "auto", md: 2, xl: 2 }} py={10}>
            <Heading size="lg" fontSize="2.375rem" pb="0.5em">
              About
            </Heading>
            <Text fontSize="1.5625rem" lineHeight="2.1875rem">
              The NYC Departments of City Planning (DCP) and Housing
              Preservation and Development (HPD) are introducing a new
              interactive resource that equips New Yorkers with data to navigate
              challenging conversations about housing affordability,
              displacement, and racial equity in our city.
            </Text>
          </Box>
          <Feedback
            flex={1}
            py={10}
            fontSize="1rem"
            display={{ base: "none", md: "block", xl: "block" }}
          />
        </Flex>
      </Center>

      <Center
        py={{ base: "2.5rem", xl: "5rem" }}
        px={{ base: "1rem", lg: "1.5rem" }}
        flexDirection={"column"}
        gridGap={7}
      >
        <Flex
          gridGap={{ base: 8, lg: 6, xl: 12 }}
          direction={{ base: "column", lg: "row" }}
          maxW={{ base: "565px", lg: "1024px" }}
        >
          <Box
            position="relative"
            flex={{ base: "auto", lg: 1 }}
            minH={{ base: "200px", md: "300px", lg: "unset" }}
          >
            <Image
              src="/community-data-landing-page.png"
              alt="NYC Department of City Planning - Equitable Development Data Explorer Screenshot"
              objectFit="contain"
            />
          </Box>
          <Box flex={{ base: "auto", lg: 2 }}>
            <Heading size="lg" pb="0.5em" fontSize="2.125rem">
              Community Data
            </Heading>
            <Text pb="0.5em">
              Community Data provides easy access to a wide range of
              demographic, housing, and quality of life data to inform public
              discussions about racial equity and planning for a fairer city.
              Whenever possible, the data are broken down by neighborhood and
              race/ethnicity, to allow New Yorkers to learn about commonalities
              and disparities across neighborhoods and demographic groups.
            </Text>
            <Text color="black">
              Go to{" "}
              <Link href="/map" color="teal" textDecoration="underline">
                Community Data
              </Link>
            </Text>
          </Box>
        </Flex>

        <Flex
          gridGap={{ base: 8, lg: 6, xl: 12 }}
          direction={{ base: "column", lg: "row" }}
          maxW={{ base: "565px", lg: "1024px" }}
        >
          <Box
            position="relative"
            flex={{ base: "auto", lg: 1 }}
            minH={{ base: "200px", md: "300px", lg: "unset" }}
          >
            <Image
              src="/drm-landing-page.png"
              alt="NYC Department of City Planning - Equitable Development Data Explorer Screenshot"
              objectFit="contain"
            />
          </Box>
          <Box flex={{ base: "auto", lg: 2 }}>
            <Heading size="lg" pb="0.5em" fontSize="2.125rem">
              Displacement Risk Map
            </Heading>
            <Text pb="0.5em">
              The Displacement Risk Map illustrates the level of risk residents
              may face of being unable to stay in their home or neighborhood.
              The map combines data about housing and demographics to indicate
              the level of displacement risk in different neighborhoods as
              compared to each other. It provides context for the consideration
              of proposed projects and supports the continuing development of
              strategies to help enable New Yorkers to stay in their homes and
              neighborhoods. The map represents a snapshot of current conditions
              and does not provide sufficient information to predict the effect
              that future changes, such as changes to zoning or housing supply,
              would have on any neighborhood.
            </Text>
            <Text color="black">
              Go to the{" "}
              <Link href="/map/drm" color="teal" textDecoration="underline">
                Displacement Risk Map
              </Link>
            </Text>
          </Box>
        </Flex>
        <Flex
          gridGap={{ base: 8, lg: 6, xl: 12 }}
          direction={{ base: "column", lg: "row" }}
          maxW={{ base: "565px", lg: "1024px" }}
        >
          <Box flex={{ base: "auto", lg: 2 }}>
            <Heading size="lg" pb="0.5em" fontSize="2.125rem">
              Racial Equity Reports
            </Heading>
            <Text pb="0.5em">
              As of June 1, 2022,{" "}
              <Link
                href="https://s-media.nyc.gov/agencies/dcp/assets/files/AE/racial-equity-report-applicability-chart.pdf"
                color="teal"
                textDecoration="underline"
              >
                certain property owners
              </Link>{" "}
              applying for land use changes must produce a Racial Equity Report
              using information pulled from the data tool. This report will
              assist racial equity discussions during the public land use review
              process known as{" "}
              <Link
                href="https://www.youtube.com/watch?v=G-k0kAn1GBQ"
                color="teal"
                textDecoration="underline"
              >
                ULURP
              </Link>
              . The Report must include: a community profile pulled from the
              data tool, a narrative statement of how the project relates to the
              City&apos;s goals and strategies to{" "}
              <Link
                href="https://wherewelive.cityofnewyork.us/"
                color="teal"
                textDecoration="underline"
              >
                affirmatively further fair housing
              </Link>
              , and project specific data about anticipated housing units and
              jobs. See additional information about the Reports{" "}
              <Link
                href="https://www1.nyc.gov/site/planning/data-maps/edde/edde-overview.page"
                color="teal"
                textDecoration="underline"
              >
                here
              </Link>
              .
            </Text>
          </Box>
        </Flex>
        <Divider
          borderColor={"#A0AEC0"}
          maxW={{ base: "565px", lg: "1024px" }}
        />
        <Flex
          direction={{ base: "column", lg: "row" }}
          justifyContent={"space-between"}
          maxW={{ base: "565px", lg: "1024px" }}
          gridGap={{ base: 6, lg: 12 }}
        >
          <Box flex={{ base: "auto", lg: 1 }} px={[10, 0]}>
            <Heading size="md" pb="0.5em" fontSize="1.5625rem">
              Methods and Sources
            </Heading>
            <Text pb="0.5em">
              Local Law 78 of 2021 outlined a set of indicators to be
              incorporated into the Equitable Development Data Explorer, and
              directed the DCP and HPD to determine the complete data points and
              specify methodologies for how the data points should be
              incorporated into a displacement risk map.
            </Text>
            <Text color="black">
              Read more about the{" "}
              <Link href="/methods" color="teal" textDecoration="underline">
                methodologies
              </Link>
            </Text>
          </Box>
          <Box flex={{ base: "auto", lg: 1 }} px={[10, 0]}>
            <Heading size="md" pb="0.5em" fontSize="1.5625rem">
              Bibliography
            </Heading>
            <Text pb="0.5em">
              The Bibliography contains resources reviewed by staff at DCP and
              HPD during the development of the Data Explorer. These resources
              reflect decades of wide-ranging thought and research on social and
              racial equity, housing policy, and neighborhood change.
            </Text>
            <Text color="black">
              Open the{" "}
              <Link
                href="https://s-media.nyc.gov/agencies/dcp/assets/files/AE/eddt-bibliography.pdf"
                textDecoration="underline"
                color="teal"
                isExternal
              >
                Bibliography <ExternalLinkIcon mx="2px" />
              </Link>
            </Text>
          </Box>
          <Box flex={{ base: "auto", lg: 1 }} px={[10, 0]}>
            <Heading size="md" pb="0.5em" fontSize="1.5625rem">
              Data Dictionary
            </Heading>
            <Text pb="0.5em">
              The Data Dictionary is a set of information describing the data
              points, sources, and methodologies included in the Data Explorer.
            </Text>
            <Text color="black">
              Open the{" "}
              <Link
                href={DATA_DICTIONARY}
                textDecoration="underline"
                color="teal"
                isExternal
              >
                Data Dictionary <ExternalLinkIcon mx="2px" />
              </Link>
            </Text>
          </Box>
        </Flex>
        <Divider
          display={{ base: "block", md: "none", xl: "none" }}
          borderColor={"#A0AEC0"}
        />
        <Feedback
          display={{ base: "block", md: "none", xl: "none" }}
          maxW={{ base: "565px", lg: "1024px" }}
        />
      </Center>

      <NewsletterFooter />
    </Flex>
  );
};

export default AboutPage;
