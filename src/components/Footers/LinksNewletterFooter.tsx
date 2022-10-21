import {
  Box,
  BoxProps,
  Button,
  Heading,
  Text,
  Link,
  Flex,
  Spacer,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const LinksNewletterFooter = (props: BoxProps) => (
  <Box {...props}>
    <Flex
      flexDirection={{
        base: "column",
        md: "row",
      }}
      width={"100%"}
    >
      <Flex
        id="footerLinks"
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

      <Flex
        className="signupWrapper"
        flexDirection={"column"}
        width={{ base: "full%", md: "60%", lg: "45%" }}
      >
        <Box>
          <Heading fontSize={"sm"}>GET UPDATES</Heading>
          <Text fontSize={"small"}>
            Join our mailing list to stay informed on updates and future
            engagement activities.
          </Text>
        </Box>
        <Box mt={4}>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Flex flexDirection={"row"}>
              <Input
                type="email"
                variant={"outline"}
                boxShadow={"0 0 0 1px rgba(0, 0, 0, .4)"}
                placeholder={"email@example.com"}
              />
              <Button
                width={"7.0625rem"}
                type={"submit"}
                colorScheme={"teal"}
                marginLeft={2}
                _hover={{
                  background: "#E6FFFA",
                  color: "#2C7A7B",
                }}
              >
                Subscribe
              </Button>
            </Flex>
          </FormControl>
        </Box>
      </Flex>
    </Flex>
  </Box>
);

export default LinksNewletterFooter;
