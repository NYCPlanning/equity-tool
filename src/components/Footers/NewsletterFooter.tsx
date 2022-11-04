import { Box, Link, Flex, Spacer } from "@chakra-ui/react";
import NewsletterForm from "@components/NewsletterSignup/NewsletterForm";

const NewsletterFooter = () => (
  <Box>
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
  </Box>
);

export default NewsletterFooter;
