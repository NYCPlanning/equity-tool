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
    /map/dri/:geography?geoid=:geoid
*/
const MapPage = ({ initialRouteParams }: MapPageProps) => {
  console.log(initialRouteParams); // only here to prevent unused variable initialRouteParams?

  const { DISTRICT, NTA } = Geography;

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

    let driPath = `/map/dri/${NTA}`;

    if (lastDriGeoid) {
      // TODO: revisit this if more query params will exist on Map view
      driPath += `?geoid=${lastDriGeoid}`;
    }

    router.push(driPath);
  };

  const onDataToolClick = () => {
    setLastDriGeoid(geoid);

    let dataToolPath = "/map/datatool";

    if (lastDataToolGeography) {
      dataToolPath += `/${lastDataToolGeography}`;

      if (lastDataToolGeoid) {
        // TODO: revisit this if more query params will exist on Map view
        dataToolPath += `?geoid=${lastDataToolGeoid}`;
      }
    } else {
      dataToolPath += `/${DISTRICT}`;
    }

    router.push(dataToolPath);
  };

  return (
    <>
      <Flex
        display={{
          base: "none",
          md: "flex",
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
              top={{
                base: "1rem",
                md: "4.5rem",
              }}
              left="2.1875rem"
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
