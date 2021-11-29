import { useRouter } from "next/router";
import { Box, VStack, Button, Text } from "@chakra-ui/react";
import { Map } from "@components/Map";

const Nta = () => {
  const router = useRouter();
  const { nta } = router.query;
  const selectedNta: string | null = nta && nta?.length > 0 ? nta[0] : null;

  return (
    <Box h="100vh" w="100vh">
      <Map>
        <VStack
          position="absolute"
          top="100px"
          left="100px"
          background="#fff"
          padding="20px"
          justify="center"
        >
          <Text>{selectedNta === null ? "No NTA Selected" : selectedNta}</Text>
          <Button
            onClick={() => {
              router.push("/nta", undefined, { shallow: true });
            }}
          >
            Clear Selection
          </Button>
        </VStack>
      </Map>
    </Box>
  );
};

export default Nta;
