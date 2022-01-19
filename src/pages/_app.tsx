import { Flex } from "@chakra-ui/react";
import { Header } from "@components/Header";

import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Flex height="100vh" direction="column" bg="gray.100">
        <Header />

        <Flex direction="row" flex="auto">
          <Component {...pageProps} />
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default MyApp;
