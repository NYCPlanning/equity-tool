import { Box, BoxProps, Heading, Text, Link } from "@chakra-ui/react";

const GetInTouch = (props: BoxProps) => (
  <Box {...props}>
    <Heading size="md" as="h3" pb="0.5em" pt={"2.5rem"} fontSize="1.5625rem">
      Get In Touch
    </Heading>
    <Text>
      Email:{" "}
      <Link
        href="mailto:edde@planning.nyc.gov"
        textDecoration="underline"
        color={"white"}
      >
        edde@planning.nyc.gov
      </Link>
    </Text>
    <Text>
      GitHub:{" "}
      <Link
        href="https://github.com/NYCPlanning/equity-tool"
        textDecoration="underline"
        isExternal
        color={"white"}
      >
        NYCPlanning
      </Link>
    </Text>
  </Box>
);

export default GetInTouch;
