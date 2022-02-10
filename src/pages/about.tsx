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
import Feedback from "@components/About/Feedback";
import StaticPageFooter from "@components/StaticPageFooter";

const AboutPage = () => (
  <Flex direction="column" width="100%">
    <Center px={{ base: 4, lg: 6 }} py={8} bg="teal">
      <Flex
        direction="row"
        maxW={{ base: "565px", lg: "1024px" }}
        wrap="wrap"
        color="white"
        gridGap={20}
      >
        <Box flex={{ base: "auto", xl: 2 }} py={10}>
          <Heading size="lg" pb="0.5em">
            About
          </Heading>
          <Text>
            The NYC Department of City Planning (DCP) and Department of Housing
            Preservation and Development (HPD) are introducing a new interactive
            resource for New Yorkers who are interested in exploring the
            city&apos;s housing conditions, demographic patterns, public health
            and more.
          </Text>
        </Box>
        <Feedback flex={1} py={10} display={{ base: "none", xl: "block" }} />
      </Flex>
    </Center>

    <Center
      py={20}
      px={{ base: 4, lg: 6 }}
      flexDirection={"column"}
      gridGap={12}
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
            src={screenshot}
            alt="NYC Department of City Planning - Equitable Development Data Tool Screenshot"
            layout="fill"
            objectFit="contain"
          />
        </Box>
        <Box flex={{ base: "auto", lg: 2 }}>
          <Heading size="lg" pb="0.5em">
            Equitable Data Development Tool
          </Heading>
          <Text pb="0.5em">
            This Equitable Data Development Tool will provide easy access to a
            wide range of data to inform public discussions about racial equity
            and planning for a fairer city. Whenever possible, this data is
            broken down by race/ethnicity, so users can learn about
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
            src={driscreenshot}
            alt="NYC Department of City Planning - Equitable Development Data Tool Screenshot"
            layout="fill"
            objectFit="contain"
          />
        </Box>
        <Box flex={{ base: "auto", lg: 2 }}>
          <Heading size="lg" pb="0.5em">
            Displacement Risk Index
          </Heading>
          <Text pb="0.5em">
            The Displacement Risk Index will support the development of
            strategies to ensure that New Yorkers can stay in their homes.
            Displacement refers to the involuntary movement of an individual or
            family from their home, whether as the result of demolition,
            eviction, unaffordable housing costs, or poor-quality housing. By
            tracking and combining a set of data points that may contribute to
            New Yorkers&apos; risk of experiencing displacement, the Index gives
            a general indication of the level of risk that residents of a
            neighborhood face, as a group, in being displaced from their homes
            relative to residents in other neighborhoods.
          </Text>
          <Text color="teal">
            <Link href="#" textDecoration="underline">
              Go to the Displacement Risk Index (DRI) Tool
            </Link>
          </Text>
        </Box>
      </Flex>
    </Center>

    <Center py={8} px={{ base: 4, lg: 6 }}>
      <Divider borderColor={"#A0AEC0"} />
    </Center>

    <Center px={{ base: 4, lg: 6 }}>
      <Flex
        direction={{ base: "column", lg: "row" }}
        justifyContent={"space-between"}
        maxW={{ base: "565px", lg: "1024px" }}
        gridGap={{ base: 6, lg: 12 }}
      >
        <Box flex={{ base: "auto", lg: 1 }} py={5} px={[10, 0]}>
          <Heading size="md" pb="0.5em">
            Methods &amp; Sources
          </Heading>
          <Text pb="0.5em">
            Local Law 78 of 2021 outlined a set of factors and data points to be
            incorporated into the index, but directed the agencies to determine
            the complete list and specify methodologies for how the data points
            should be grouped and combined.
          </Text>
          <Text color="teal">
            <Link href="#" textDecoration="underline">
              Read more about our methodologies
            </Link>
          </Text>
        </Box>
        <Box flex={{ base: "auto", lg: 1 }} py={5} px={[10, 0]}>
          <Heading size="md" pb="0.5em">
            Bibliography
          </Heading>
          <Text pb="0.5em">
            The Bibliography contains resources reviewed by staff at DCP and HPD
            during the development of the data tool. These resources reflect
            decades of wide-ranging thought and research on social and racial
            equity, housing policy, and neighborhood change.
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
        <Box flex={{ base: "auto", lg: 1 }} py={5} px={[10, 0]}>
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
    <Center
      display={{ base: "block", xl: "none" }}
      py={8}
      px={{ base: 4, lg: 6 }}
    >
      <Divider borderColor={"#A0AEC0"} />
    </Center>
    <Center px={{ base: 4, lg: 6 }}>
      <Feedback
        display={{ base: "block", xl: "none" }}
        maxW={{ base: "565px", lg: "1024px" }}
      />
    </Center>

    <Center px={{ base: 4, lg: 6 }}>
      <Box width={"full"} maxW={{ base: "565px", lg: "1024px" }} py={8}>
        <StaticPageFooter />
      </Box>
    </Center>
  </Flex>
);

export default AboutPage;
