import { Box, BoxProps, Heading, Text, Link } from "@chakra-ui/react";

const Feedback = (props: BoxProps) => (
  <Box {...props}>
    <Heading size="md" pb="0.5em">
      Feedback
    </Heading>
    <Text>
      For questions or to let us know how this app could be better, send us an
      email to{" "}
      <Link href="mailto:labs_dl@planning.nyc.gov" textDecoration="underline">
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
);

export default Feedback;
