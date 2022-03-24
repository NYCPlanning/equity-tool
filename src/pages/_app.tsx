import { Box, Flex } from "@chakra-ui/react";
import { Header } from "@components/Header";

import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { PageHeader } from "@components/PageHeader";
import ReactGA from "react-ga4";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  ReactGA.initialize("G-DEJNY15B0G");

  const router = useRouter();

  const isMapRoute = router.pathname.startsWith("/map");

  return (
    <ChakraProvider resetCSS theme={theme}>
      <PageHeader />
      <Flex height="100vh" direction="column">
        <Header />

        <Box
          height="calc(100vh - 4.375rem)"
          overflow={isMapRoute ? "hidden" : "auto"}
        >
          <Flex direction="row" height="100%">
            <Component {...pageProps} />
          </Flex>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default MyApp;
