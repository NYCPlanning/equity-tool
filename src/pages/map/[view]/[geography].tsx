import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRef, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useLayers } from "@hooks/useLayers";
import { Map, ViewToggle, WelcomeMobileDrawer } from "@components/Map";
import { CommunityDataMobileDrawer } from "@components/Map/CommunityData";
import { DrmMobileDrawer } from "@components/Map/DRM";
import { GeographySelect as CommunityDataGeographySelect } from "@components/Map/CommunityData";
import { DRMMapLegend } from "@components/Map/DRM";
import { SidebarContent } from "@components/SidebarContent";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";
import { Geography } from "@constants/geography";
import { NYC } from "@constants/geoid";
import ReactGA from "react-ga4";

export interface MapPageProps {
  initialRouteParams: string;
}

export const getStaticProps: GetStaticProps = (context) => {
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

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [
    {
      params: {
        view: "data",
        geography: "district",
      },
    },
    {
      params: {
        view: "data",
        geography: "borough",
      },
    },
    {
      params: {
        view: "data",
        geography: "citywide",
      },
    },
    {
      params: {
        view: "drm",
        geography: "nta",
      },
    },
  ];
  return {
    paths,
    fallback: false,
  };
};

/*
  /Map route

  Subroutes:
    /map/data/:geography
    /map/drm/:geography?geoid=:geoid
*/
const MapPage = ({ initialRouteParams }: MapPageProps) => {
  console.log(initialRouteParams); // only here to prevent unused variable initialRouteParams?

  const { BOROUGH, CITYWIDE, DISTRICT, NTA } = Geography;

  const router = useRouter();

  // acquire subroute info, if any
  const { view, geography, geoid } = useMapSubrouteInfo();

  const layers = useLayers();

  const mapContainer = useRef<HTMLDivElement>(null);

  const [lastCommunityDataGeography, setLastCommunityDataGeography] =
    useState<Geography | null>(null);
  const [lastCommunityDataGeoid, setLastCommunityDataGeoid] = useState<
    string | null
  >(null);
  const [lastDrmGeoid, setLastDrmGeoid] = useState((): string | null => null);

  const [lastDistrictGeoid, setLastDistrictGeoid] = useState<string | null>(
    null
  );

  const [lastBoroughGeoid, setLastBoroughGeoid] = useState<string | null>(null);

  const onDrmClick = () => {
    setLastCommunityDataGeography(geography);
    setLastCommunityDataGeoid(geoid);

    ReactGA.event({
      category: "Toggle Tool",
      action: "Click",
      label: "Displacement Risk Map",
    });

    let drmPath = `/map/drm/${NTA}`;

    if (lastDrmGeoid) {
      // TODO: revisit this if more query params will exist on Map view

      // reset the params if geoid=nyc
      !lastDrmGeoid.includes("nyc")
        ? (drmPath += `?geoid=${lastDrmGeoid}`)
        : (drmPath += "");
    }

    router.push(drmPath);
  };

  const onCommunityDataClick = () => {
    setLastDrmGeoid(geoid);

    ReactGA.event({
      category: "Toggle Tool",
      action: "Click",
      label: "Community Data",
    });

    let communityDataPath = "/map/data";

    if (lastCommunityDataGeography) {
      communityDataPath += `/${lastCommunityDataGeography}`;

      if (lastCommunityDataGeoid) {
        // TODO: revisit this if more query params will exist on Map view
        communityDataPath += `?geoid=${lastCommunityDataGeoid}`;
      }
    } else {
      communityDataPath += `/${DISTRICT}`;
    }

    router.push(communityDataPath);
  };

  const onCommunityDataGeographyChange = (targetGeography: Geography) => {
    if (geography === targetGeography) return;

    ReactGA.event({
      category: "Toggle Geo",
      action: "Click",
      label: `${targetGeography}`,
    });

    const targetUrl = `/map/data/${targetGeography}`;

    if (geography === DISTRICT) setLastDistrictGeoid(geoid);
    if (geography === BOROUGH) setLastBoroughGeoid(geoid);

    if (targetGeography === CITYWIDE) {
      router.push(`${targetUrl}?geoid=${NYC}`);

      return;
    }

    if (targetGeography === DISTRICT && lastDistrictGeoid) {
      router.push(`${targetUrl}?geoid=${lastDistrictGeoid}`);

      return;
    }

    if (targetGeography === BOROUGH && lastBoroughGeoid) {
      router.push(`${targetUrl}?geoid=${lastBoroughGeoid}`);

      return;
    }

    router.push(`${targetUrl}`);
  };

  return (
    <>
      <Flex
        display={{
          base: "none",
          md: "flex",
        }}
        maxWidth={{
          base: "none",
          sm: "403px",
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

      {!geoid && <WelcomeMobileDrawer />}

      {view === "data" && geoid && <CommunityDataMobileDrawer />}

      {view === "drm" && geoid && <DrmMobileDrawer />}

      <Box flex="2" height="100%">
        <Box ref={mapContainer} position="relative" height="100%" rounded="lg">
          <ViewToggle
            onCommunityDataClick={onCommunityDataClick}
            onDrmClick={onDrmClick}
          />

          {view === "data" && (
            <CommunityDataGeographySelect
              position="absolute"
              top={{
                base: "1rem",
                md: "4.5rem",
              }}
              left={{
                base: "2vmin",
                sm: "4vmin",
                md: "1rem",
              }}
              zIndex={100}
              boxShadow="lg"
              onGeographySelect={onCommunityDataGeographyChange}
            />
          )}

          {view === "drm" && <DRMMapLegend />}

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
