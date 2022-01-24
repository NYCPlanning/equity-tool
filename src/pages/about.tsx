import { Flex, Box, Center } from "@chakra-ui/react";

// layout probably still needs rework
const AboutPage = () => {
  return (
    <Flex direction="column" width="100%">
      <Center height="300px" bg="teal">
        <Flex direction="row" width={["100%", "50%"]}>
          <Box flex="5">
            <h1>About</h1>
          </Box>
          <Box flex="2">
            <h2>Feedback</h2>
          </Box>
        </Flex>
      </Center>
      <Box>
        <Center width="100%">
          <Flex direction="row">
            <Box>Image</Box>
            <Box>
              <h5>Data Explorer Tool</h5>
              <p>This is a brief description.</p>
            </Box>
          </Flex>
        </Center>
      </Box>
    </Flex>
  );
};

export default AboutPage;
