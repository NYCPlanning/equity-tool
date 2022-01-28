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
import Image from "next/image";
import screenshot from "../../public/screenshot.png";
import driscreenshot from "../../public/driscreenshot.png";
import logo from "../../public/logo.png";

const AboutPage = () => {
  return (
    <Flex direction="column" width="100%">
      <Center py="2em" bg="teal">
        <Flex
          direction="row"
          width={["100%", "1024px"]}
          wrap="wrap"
          color="white"
        >
          <Box flex="4" p={10}>
            <Heading size="lg" pb="0.5em">
              About
            </Heading>
            <Text>
              The NYC Department of City Planning (DCP) and Department of
              Housing Preservation and Development (HPD) are introducing a new
              interactive resource for New Yorkers who are interested in
              exploring the city&apos;s housing conditions, demographic
              patterns, public health and more.
            </Text>
          </Box>
          <Box flex="2" p={10}>
            <Heading size="md" pb="0.5em">
              Feedback
            </Heading>
            <Text>
              For questions or to let us know how this app could be better, send
              us an email to{" "}
              <Link
                href="mailto:labs_dl@planning.nyc.gov"
                textDecoration="underline"
              >
                labs_dl@planning.nyc.gov
              </Link>
              . You can also{" "}
              <Link
                href="https://github.com/NYCPlanning/equity-tool/issues"
                textDecoration="underline"
                isExternal
              >
                add a GitHub Issue
              </Link>
              .
            </Text>
          </Box>
        </Flex>
      </Center>

      <Center py="2em">
        <Flex direction="row" width={["100%", "1024px"]} wrap="wrap">
          <Box width={["100%", "40%"]} p={10}>
            <Image
              src={screenshot}
              alt="NYC Department of City Planning - Equitable Development Data Tool Screenshot"
            />
          </Box>
          <Box width={["100%", "60%"]} p={10}>
            <Heading size="lg" pb="0.5em">
              Equitable Data Development Tool
            </Heading>
            <Text pb="0.5em">
              This Equitable Data Development Tool will provide easy access to a
              wide range of data to inform public discussions about racial
              equity and planning for a fairer city. Whenever possible, this
              data is broken down by race/ethnicity, so users can learn about
              commonalities and disparities across neighborhoods and demographic
              groups.
            </Text>
            <Text color="teal">
              <Link href="/map" textDecoration="underline">
                Go to the Data Tool
              </Link>
            </Text>
          </Box>
        </Flex>
      </Center>

      <Center>
        <Flex direction="row" width={["100%", "1024px"]} wrap="wrap">
          <Box width={["100%", "40%"]} p={10}>
            <Image
              src={driscreenshot}
              alt="NYC Department of City Planning - Displacement Risk Index Screenshot"
            />
          </Box>
          <Box width={["100%", "60%"]} p={10}>
            <Heading size="lg" pb="0.5em">
              Displacement Risk Index
            </Heading>
            <Text pb="0.5em">
              The Displacement Risk Index will support the development of
              strategies to ensure that New Yorkers can stay in their homes.
              Displacement refers to the involuntary movement of an individual
              or family from their home, whether as the result of demolition,
              eviction, unaffordable housing costs, or poor-quality housing. By
              tracking and combining a set of data points that may contribute to
              New Yorkers&apos; risk of experiencing displacement, the Index
              gives a general indication of the level of risk that residents of
              a neighborhood face, as a group, in being displaced from their
              homes relative to residents in other neighborhoods.
            </Text>
            <Text color="teal">
              <Link href="#" textDecoration="underline">
                Go to the Displacement Risk Index (DRI) Tool
              </Link>
            </Text>
          </Box>
        </Flex>
      </Center>

      <Center py="2em">
        <Divider width={["100%", "1024px"]} borderColor={"#A0AEC0"} />
      </Center>

      <Center>
        <Flex
          direction="row"
          width={["100%", "1024px"]}
          wrap="wrap"
          justifyContent={"space-between"}
        >
          <Box width={["100%", "30%"]} py={5} px={[10, 0]}>
            <Heading size="md" pb="0.5em">
              Methods &amp; Sources
            </Heading>
            <Text pb="0.5em">
              Local Law 78 of 2021 outlined a set of factors and data points to
              be incorporated into the index, but directed the agencies to
              determine the complete list and specify methodologies for how the
              data points should be grouped and combined.
            </Text>
            <Text color="teal">
              <Link href="#" textDecoration="underline">
                Read more about our methodologies
              </Link>
            </Text>
          </Box>
          <Box width={["100%", "30%"]} py={5} px={[10, 0]}>
            <Heading size="md" pb="0.5em">
              Bibliography
            </Heading>
            <Text pb="0.5em">
              The Bibliography contains resources reviewed by staff at DCP and
              HPD during the development of the data tool. These resources
              reflect decades of wide-ranging thought and research on social and
              racial equity, housing policy, and neighborhood change.
            </Text>
            <Text color="teal">
              <Link
                href="https://www1.nyc.gov/assets/planning/download/pdf/planning-level/housing-economy/eddt-bibliography.pdf"
                textDecoration="underline"
                isExternal
              >
                Open the Bibliography <ExternalLinkIcon mx="2px" />
              </Link>
            </Text>
          </Box>
          <Box width={["100%", "30%"]} py={5} px={[10, 0]}>
            <Heading size="md" pb="0.5em">
              Data Dictionary
            </Heading>
            <Text pb="0.5em">
              The data dictionary is a set of information describing the data
              points and methodologies included in the data tool.
            </Text>
            <Text color="teal">
              <Link
                href="https://www1.nyc.gov/assets/planning/download/pdf/planning-level/housing-economy/eddt-data-dictionary.pdf"
                textDecoration="underline"
                isExternal
              >
                Open the Data Dictionary <ExternalLinkIcon mx="2px" />
              </Link>
            </Text>
          </Box>
        </Flex>
      </Center>

      <Center py="2em">
        <Flex direction="row" width={["100%", "1024px"]} wrap="nowrap">
          <Image src={logo} alt="NYC Logo" />
          <Box maxW="90px" lineHeight="1" mx="10px" wrap="wrap">
            <Text fontSize="xs" fontWeight="bold">
              Department of City Planning
            </Text>
          </Box>
          <Divider
            height="24px"
            orientation="vertical"
            borderColor={"black"}
            mr="10px"
          />
          <Box maxW="150px" lineHeight="1" wrap="wrap">
            <Text fontSize="xs" fontWeight="bold">
              Housing Preservation &amp; Development
            </Text>
          </Box>
        </Flex>
      </Center>
    </Flex>
  );
};

export default AboutPage;
