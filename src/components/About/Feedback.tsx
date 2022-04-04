import { Box, BoxProps, Heading, Text, Link } from "@chakra-ui/react";

const Feedback = (props: BoxProps) => (
  <Box {...props}>
    <Heading size="md" as="h3" pb="0.5em" fontSize="1.5625rem">
      Feedback
    </Heading>
    <Text>
      For questions or to let us know how this app could be better, send us an
      email to{" "}
      <Link
        href="mailto:edde@planning.nyc.gov"
        textDecoration="underline"
        color={{ base: "teal.600", md: "white" }}
      >
        edde@planning.nyc.gov
      </Link>
      . You can also add a{" "}
      <Link
        href="https://github.com/NYCPlanning/equity-tool/issues"
        textDecoration="underline"
        isExternal
        color={{ base: "teal.600", md: "white" }}
      >
        GitHub Issue
      </Link>
      .
    </Text>
  </Box>
);

export default Feedback;
