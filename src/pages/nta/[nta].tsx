import { useRouter } from "next/router";
import { Collapse, Box, Flex } from "@chakra-ui/react";
import { Map } from "../../components/Map";

const Nta = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <Flex direction="column" h="100vh" w="100%">
      <Box flex="1" position="relative">
        <Map />
      </Box>
      <Box>asd</Box>
    </Flex>
  );
};

export default Nta;
