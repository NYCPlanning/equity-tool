import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Box, Flex } from "@chakra-ui/react";
import { Map } from "@components/Map";
import { Header } from "@components/Header";
import { Legend } from "@components/Legend";
import { IndicatorPanel } from "@components/IndicatorPanel";
import { GeographySelect } from "@components/Map/GeographySelect/GeographySelect";

import { useSelectedLayer } from "../../hooks/useSelectedLayer/useSelectedLayer";
import { useIndicatorRecord } from "../../hooks/useIndicatorRecord/useIndicatorRecord";

export interface MapPageProps {
  initialRouteParams: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params) {
    return {
      props: {
        initialRouteParams: "",
      },
    };
  }
  const { subroutes } = context.params;

  if (typeof subroutes === "string") {
    return {
      props: {
        initialRouteParams: "",
      },
    };
  }

  return {
    props: {
      initialRouteParams: subroutes ? subroutes.join(",") : "",
    },
  };
};

/*
  /Map route

  Subroutes:
    /map/geography
    /map/geography/geoid
*/
const MapPage = ({ initialRouteParams }: MapPageProps) => {
  console.log(initialRouteParams);
  const router = useRouter();

  const { subroutes } = router.query;

  // acquire subroute info, if any
  const [geographyParam, geoid] = subroutes ? subroutes : [null, null];

  const geography =
    typeof geographyParam === "string"
      ? geographyParam
      : geographyParam !== null
      ? geographyParam[0]
      : null;

  const layers = useSelectedLayer(geography);

  const indicatorRecord = useIndicatorRecord(geoid);

  return (
    <Box height="100vh">
      <Header />

      <Map layers={layers === null ? [] : layers} />

      <Flex direction="column" justify="end" height="100%">
        <Legend
          position={["relative", "absolute"]}
          left={["auto", 8]}
          bottom={["auto", 8]}
          w={["100%", "215px"]}
        />

        <GeographySelect
          geography={geography}
          position={["relative", "absolute"]}
          top={["auto", 20]}
          left={["auto", 8]}
        />

        <IndicatorPanel indicatorRecord={indicatorRecord} />
      </Flex>
    </Box>
  );
};

export default MapPage;
