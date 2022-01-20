import { Flex, Box, Center } from "@chakra-ui/react";

const AboutPage = () => {
  return (
    <Flex direction="column" width="100%">
      <Flex direction="row" bg="teal" height="300px">
        <Box flex="1"></Box>
        <Box flex="5">
          <h1>About</h1>
        </Box>
        <Box flex="2">
          <h2>Feedback</h2>
        </Box>
        <Box flex="1"></Box>
      </Flex>
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
