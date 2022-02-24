import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useRef, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useSelectedLayer } from "@hooks/useSelectedLayer";
import { Map, MobileDrawer, ViewToggle } from "@components/Map";
import { GeographySelect as DataToolGeographySelect } from "@components/Map/DataTool";
import { DRIMapLegend } from "@components/Map/DRI";
import { SidebarContent } from "@components/SidebarContent";
import { DrawerContent } from "@components/DrawerContent";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";
import { Geography } from "@constants/geography";

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

  const { District, Nta } = Geography;

  const router = useRouter();

  // acquire subroute info, if any
  const { view, geography, geoid } = useMapSubrouteInfo();

  const layers = useSelectedLayer();

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

    let driPath = `/map/dri/${Nta}`;

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
    } else {
      dataToolPath += `/${District}`;
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
        flex="1"
        height="calc(100vh - 4.375rem)" // workaround to ensure Sidebar vertically fills container
        p="1rem 0.5rem"
        boxShadow="lg"
        overflowY="scroll"
        zIndex="999"
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        data-cy="desktopSidebar"
      >
        <SidebarContent />
      </Flex>

      <MobileDrawer>
        <DrawerContent />
      </MobileDrawer>

      <Box flex="2" height="100%">
        <Box ref={mapContainer} position="relative" height="100%" rounded="lg">
          <ViewToggle
            onDataToolClick={onDataToolClick}
            onDriClick={onDriClick}
          />

          {view === "datatool" && (
            <DataToolGeographySelect
              position="absolute"
              top={5}
              right={{
                lg: 8,
                base: "auto",
              }}
              left={{
                lg: "auto",
                base: "2.1875rem",
              }}
              zIndex={100}
              boxShadow="lg"
            />
          )}

          {view === "dri" && <DRIMapLegend />}

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
