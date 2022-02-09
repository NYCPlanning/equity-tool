import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useRef, useState } from "react";
import { Box, Flex, Heading, Text, Link } from "@chakra-ui/react";
import { useSelectedLayer } from "@hooks/useSelectedLayer";
import { useIndicatorRecord } from "@hooks/useIndicatorRecord";
import { Map, MobileDrawer, ViewToggle } from "@components/Map";
import { GeographySelect as DataToolGeographySelect } from "@components/Map/DataTool";
import StaticPageFooter from "@components/StaticPageFooter";

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

const WelcomeContent = () => {
  return (
    <>
      <Text>You don&apos;t have anything selected yet.</Text>
      <br />
      <Text>
        Make a selection on the map to explore data indicators and change over
        time in the Data Tool.
      </Text>
      <br />
      <Text>
        Or switch to the Displacement Risk Index (DRI) and select a neighborhood
        to see its’ DRI Profile.
      </Text>

      <br />

      <Link href="/about">Learn More About the Data Tool</Link>
    </>
  );
};

const WelcomeFooter = () => {
  return (
    <Box>
      <Text>
        *Community Districts are approximated using data from Public Use
        Microdata Areas (PUMAs).
      </Text>
      <br />
      <Text>
        The Equitable Development Reporting web tool is a partnership between
        the New York City Department of Housing Preservation and Development
        (HPD) and the Department of City Planning (DCP).
      </Text>
      <br />
      <StaticPageFooter />
    </Box>
  );
};

// This is a temporary stub/placeholder for indicator data rendered into Sidebar/Drawer
const SampleIndicatorDisplay = ({
  indicatorRecord,
}: {
  indicatorRecord: any;
}) => {
  return (
    <>
      <Box p={2}>
        Overall Displacement Risk: {indicatorRecord.displacementRisk}
      </Box>

      {indicatorRecord?.indicators
        ? Object.entries(indicatorRecord.indicators).map(
            ([indicator, value]) => (
              <Box key={`${indicatorRecord.id}-${indicator}`} p={2}>
                <Text>
                  {indicator}: {value}
                </Text>
              </Box>
            )
          )
        : ""}
    </>
  );
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
        {indicatorRecord ? (
          <Box>
            <Heading>{geoid}</Heading>
            <br />
            <SampleIndicatorDisplay indicatorRecord={indicatorRecord} />
          </Box>
        ) : (
          <>
            <Box>
              <Heading>Welcome!</Heading>
              <br />
              <WelcomeContent />
            </Box>
            <Box>
              <WelcomeFooter />
            </Box>
          </>
        )}
      </Flex>

      <MobileDrawer title={indicatorRecord ? geoid : "Welcome!"}>
        {indicatorRecord ? (
          <SampleIndicatorDisplay indicatorRecord={indicatorRecord} />
        ) : (
          <>
            <WelcomeContent />
            <br />
            <hr />
            <br />
            <WelcomeFooter />
          </>
        )}
      </MobileDrawer>

      <Box flex="2" height="100%">
        <Box ref={mapContainer} position="relative" height="100%" rounded="lg">
          <ViewToggle
            onDataToolClick={onDataToolClick}
            onDriClick={onDriClick}
            view={view}
            showToggle={!geoid}
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
