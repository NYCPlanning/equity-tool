import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useRef, useState } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { useSelectedLayer } from "@hooks/useSelectedLayer";
import { useIndicatorRecord } from "@hooks/useIndicatorRecord";
import { IndicatorPanel } from "@components/IndicatorPanel";
import { Map, MobileDrawer, ViewToggle } from "@components/Map";
import { GeographySelect as DataToolGeographySelect } from "@components/Map/DataTool";

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
    /map/datatool/:geography
    /map/dri/:geography/:geoid
*/
const MapPage = ({ initialRouteParams }: MapPageProps) => {
  console.log(initialRouteParams); // only here to prevent unused variable initialRouteParams?

  const router = useRouter();

  const { subroutes } = router.query;

  // acquire subroute info, if any
  const [viewParam, geographyParam, geoid] = subroutes
    ? subroutes
    : [null, null, null];

  const view =
    typeof viewParam === "string"
      ? viewParam
      : viewParam !== null && viewParam !== undefined
      ? viewParam[0]
      : null;

  console.log("view: ", view);

  const geography =
    typeof geographyParam === "string"
      ? geographyParam
      : geographyParam !== null && geographyParam !== undefined
      ? geographyParam[0]
      : null;

  const layers = useSelectedLayer(view, geography);

  const indicatorRecord = useIndicatorRecord(geoid);

  const mapContainer = useRef<HTMLDivElement>(null);

  const [lastDataToolGeography, setLastDataToolGeography] = useState(
    (): string | null => null
  );
  const [lastDataToolGeoid, setLastDataToolGeoid] = useState(
    (): string | null => null
  );
  const [lastDriGeoid, setLastDriGeoid] = useState((): string | null => null);

  const onDriClick = () => {
    setLastDataToolGeography(geography);
    setLastDataToolGeoid(geoid);

    let driPath = "/map/dri/puma";

    if (lastDriGeoid) {
      driPath += `/${lastDriGeoid}`;
    }

    router.push({ pathname: driPath });
  };

  const onDataToolClick = () => {
    setLastDriGeoid(geoid);

    let dataToolPath = "/map/datatool";

    if (lastDataToolGeography) {
      dataToolPath += `/${lastDataToolGeography}`;

      if (lastDataToolGeoid) {
        dataToolPath += `/${lastDataToolGeoid}`;
      }
    }

    router.push({ pathname: dataToolPath });
  };

  return (
    <>
      <Box
        display={{
          base: "none",
          lg: "flex",
        }}
        flex="1"
        height="100%"
        p="10px"
        boxShadow="lg"
        zIndex="999"
        data-cy="desktopSidebar"
      >
        <IndicatorPanel indicatorRecord={indicatorRecord} />
      </Box>

      <MobileDrawer title="Welcome!">
        <IndicatorPanel indicatorRecord={indicatorRecord} />
      </MobileDrawer>

      <Flex
        display={{
          base: "flex",
          lg: "none",
        }}
        direction="row"
        position="fixed"
        width="100%"
        height="3.75rem"
        bottom="0"
        left="0"
        zIndex="999"
      >
        <Box flex="1">
          <Button
            onClick={onDataToolClick}
            isActive={view === "datatool"}
            height="100%"
            isFullWidth
            data-cy="dataToolBtn"
            data-cy-context="mobile"
          >
            Data Tool
          </Button>
        </Box>
        <Box flex="1">
          <Button
            onClick={onDriClick}
            isActive={view === "dri"}
            height="100%"
            isFullWidth
            data-cy="driBtn"
            data-cy-context="mobile"
          >
            Displacement Risk Index
          </Button>
        </Box>
      </Flex>

      <Box flex="2" height="100%">
        <Box ref={mapContainer} position="relative" height="100%" rounded="lg">
          <ViewToggle
            onDataToolClick={onDataToolClick}
            onDriClick={onDriClick}
            view={view}
            position="absolute"
            top={5}
            left={8}
            zIndex={200}
            boxShadow="lg"
            display={{
              base: "none",
              lg: "block",
            }}
          />

          {view === "datatool" && (
            <DataToolGeographySelect
              geography={geography}
              position="absolute"
              top={5}
              right={8}
              zIndex={100}
              boxShadow="lg"
            />
          )}

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
