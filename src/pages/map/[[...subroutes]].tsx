import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useRef, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useSelectedLayer } from "@hooks/useSelectedLayer";
import { useIndicatorRecord } from "@hooks/useIndicatorRecord";
import { Map, MobileDrawer, ViewToggle } from "@components/Map";
import { GeographySelect as DataToolGeographySelect } from "@components/Map/DataTool";
import { useSidebarContent } from "@hooks/useSidebarContent";
import { useDrawerContent } from "@hooks/useDrawerContent";

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

  const drawerContent = useDrawerContent(!!indicatorRecord);
  const sidebarContent = useSidebarContent(!!indicatorRecord);

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
      <Flex
        display={{
          base: "none",
          lg: "flex",
        }}
        direction="column"
        justify="space-between"
        flex="1"
        height="100%"
        p="2.25rem 1rem"
        boxShadow="lg"
        zIndex="999"
        data-cy="desktopSidebar"
      >
        {sidebarContent}
      </Flex>

      <MobileDrawer title={indicatorRecord ? geoid : "Welcome!"}>
        {drawerContent}
      </MobileDrawer>

      <Box flex="2" height="100%">
        <Box ref={mapContainer} position="relative" height="100%" rounded="lg">
          <ViewToggle
            onDataToolClick={onDataToolClick}
            onDriClick={onDriClick}
            view={view}
            showOnMobile={!geoid}
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
