import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

import { useRef } from "react";

import { Box } from "@chakra-ui/react";
import { Map } from "@components/Map";
import { IndicatorPanel } from "@components/IndicatorPanel";

import { useSelectedLayer } from "../../hooks/useSelectedLayer/useSelectedLayer";
import { useIndicatorRecord } from "../../hooks/useIndicatorRecord/useIndicatorRecord";

import { GeographySelect } from "@components/Map/GeographySelect/GeographySelect";

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
  console.log(initialRouteParams); // only here to prevent unused variable initialRouteParams?

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

  const mapContainer = useRef<HTMLDivElement>(null);

  return (
    <>
      <Box flex="1" height="100%" p="10px">
        <IndicatorPanel indicatorRecord={indicatorRecord} />
      </Box>

      <Box flex="2" height="100%" p="10px">
        <Box ref={mapContainer} position="relative" height="100%" rounded="lg">
          <GeographySelect
            geography={geography}
            position="absolute"
            top={5}
            right={8}
            zIndex={100}
            boxShadow="lg"
          />

          <Map
            layers={layers ? layers : undefined}
            parent={mapContainer?.current ? mapContainer.current : undefined}
          />
        </Box>
      </Box>
    </>
  );
};

export default MapPage;
