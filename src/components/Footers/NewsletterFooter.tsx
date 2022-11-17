import { Box, Link, Flex, Spacer, Center } from "@chakra-ui/react";
import NewsletterForm from "@components/NewsletterSignup/NewsletterForm";
import StaticPageFooter from "@components/Footers/StaticPageFooter";

const NewsletterFooter = () => (
  <Center
    bg={"gray.50"}
    py={{ base: "2rem", lg: "4rem" }}
    px={{ base: "1rem", lg: "1.5rem" }}
    marginTop={"auto"}
  >
    <Box
      maxW={{ base: "565px", md: "none", lg: "1024px" }}
      margin={"0 auto"}
      width={"100%"}
    >
      <Flex
        flexDirection={{
          base: "column",
          md: "row",
        }}
        width={"100%"}
      >
        <Flex
          flexDirection={"column"}
          display={{ base: "none", md: "block", lg: "  block" }}
        >
          <Box>
            <Link
              href="/map/data/district"
              textDecoration="none"
              color={"teal.600"}
              fontSize={"1rem"}
              fontWeight={"bold"}
            >
              Home
            </Link>
          </Box>
          <Box paddingTop={2}>
            <Link
              href="/about"
              textDecoration="none"
              color={"teal.600"}
              fontSize={"1rem"}
              fontWeight={"bold"}
            >
              About
            </Link>
          </Box>
          <Box paddingTop={2}>
            <Link
              href="/methods"
              textDecoration="none"
              color={"teal.600"}
              fontSize={"1rem"}
              fontWeight={"bold"}
            >
              Methods & Sources
            </Link>
          </Box>
          <Box paddingTop={2}>
            <Link
              href="/contact"
              textDecoration="none"
              color={"teal.600"}
              fontSize={"1rem"}
              fontWeight={"bold"}
            >
              Contact
            </Link>
          </Box>
        </Flex>

        <Spacer />

        <NewsletterForm />
      </Flex>
      <StaticPageFooter marginTop={"1.5rem"} />
    </Box>
  </Center>
);

export default NewsletterFooter;
