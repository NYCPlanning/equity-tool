import { Box, Flex } from "@chakra-ui/react";
import { Header } from "@components/Header";

import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { PageHeader } from "@components/PageHeader";
import ReactGA from "react-ga4";
import { useRouter } from "next/router";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  ReactGA.initialize("G-DEJNY15B0G", { gaOptions: { cookieFlags: "Secure" } });

  const router = useRouter();

  const isMapRoute = router.pathname.startsWith("/map");

  return (
    <>
      <Script id="fullstory">
        {`window['_fs_host'] = 'fullstory.com';
          window['_fs_script'] = 'edge.fullstory.com/s/fs.js';
          window['_fs_org'] = 'o-19S9J2-na1';
          window['_fs_namespace'] = 'FS';
          (function(m,n,e,t,l,o,g,y){
              if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
              g=m[e]=function(a,b,s){g.q?g.q.push([a,b,s]):g._api(a,b,s);};g.q=[];
              o=n.createElement(t);o.async=1;o.crossOrigin='anonymous';o.src='https://'+_fs_script;
              y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
              g.identify=function(i,v,s){g(l,{uid:i},s);if(v)g(l,v,s)};g.setUserVars=function(v,s){g(l,v,s)};g.event=function(i,v,s){g('event',{n:i,p:v},s)};
              g.anonymize=function(){g.identify(!!0)};
              g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};
              g.log = function(a,b){g("log",[a,b])};
              g.consent=function(a){g("consent",!arguments.length||a)};
              g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
              g.clearUserCookie=function(){};
              g.setVars=function(n, p){g('setVars',[n,p]);};
              g._w={};y='XMLHttpRequest';g._w[y]=m[y];y='fetch';g._w[y]=m[y];
              if(m[y])m[y]=function(){return g._w[y].apply(this,arguments)};
              g._v="1.3.0";
          })(window,document,window['_fs_namespace'],'script','user');`}
      </Script>
      <ChakraProvider resetCSS theme={theme}>
        <PageHeader />
        <Flex height="100vh" direction="column">
          <Header />

          <Box
            height="calc(100vh - 4.375rem)"
            overflow={isMapRoute ? "hidden" : "auto"}
            id="back-to-top"
          >
            <Flex direction="row" height="100%" position="relative">
              <Component {...pageProps} />
            </Flex>
          </Box>
        </Flex>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
