import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRef, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import {
  DrmMobileDrawer,
  InstructionPanel,
  Map,
  ViewToggle,
} from "@components/Map";
import {
  CommunityDataMobileDrawer,
  GeographySelect as CommunityDataGeographySelect,
} from "@components/Map/CommunityData";
import { SidebarContent } from "@components/SidebarContent";
import { useView } from "@hooks/useView";
import { useGeoid } from "@hooks/useGeoid";
import { useGeography } from "@hooks/useGeography";
import { Geography } from "@constants/geography";
import { NYC } from "@constants/geoid";
import ReactGA from "react-ga4";
import { AdditionalLayersPanel } from "@components/AdditionalMapLayers";
import { DRMMapLegend } from "@components/Map/DRM/DRMMapLegend";
import { View } from "@constants/View";
import { useWindowDimensions } from "@hooks/useWindowDimensions";

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
        view: View.DATA,
        geography: Geography.DISTRICT,
      },
    },
    {
      params: {
        view: View.DATA,
        geography: Geography.BOROUGH,
      },
    },
    {
      params: {
        view: View.DATA,
        geography: Geography.CITYWIDE,
      },
    },
    {
      params: {
        view: View.DRM,
        geography: Geography.NTA,
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
const MapPage = () => {
  const [ntaOutlineLayer, setNtaOutlineLayer] = useState<boolean>(false);

  const [districtOutlineLayer, setDistrictOutlineLayer] =
    useState<boolean>(false);

  const { BOROUGH, CITYWIDE, DISTRICT, NTA } = Geography;

  const router = useRouter();

  // acquire subroute info, if any
  const view = useView();
  const geoid = useGeoid();
  const geography = useGeography();

  const windowDimensions = useWindowDimensions();
  let isMobile;
  if (windowDimensions.width) isMobile = windowDimensions.width < 768;

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
      drmPath += `?geoid=${lastDrmGeoid}`;
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
      router.push(`${targetUrl}?geoid=${NYC}`, undefined, { shallow: true });

      return;
    }

    if (targetGeography === DISTRICT && lastDistrictGeoid) {
      router.push(`${targetUrl}?geoid=${lastDistrictGeoid}`, undefined, {
        shallow: true,
      });

      return;
    }

    if (targetGeography === BOROUGH && lastBoroughGeoid) {
      router.push(`${targetUrl}?geoid=${lastBoroughGeoid}`, undefined, {
        shallow: true,
      });

      return;
    }

    router.push(`${targetUrl}`, undefined, { shallow: true });
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

      {view === View.DATA && geoid && <CommunityDataMobileDrawer />}

      {view === View.DRM && geoid && <DrmMobileDrawer />}

      <Box flex="2" height="100%">
        <Box ref={mapContainer} position="relative" height="100%" rounded="lg">
          <Map
            ntaOutlineLayer={ntaOutlineLayer}
            districtOutlineLayer={districtOutlineLayer}
            parent={mapContainer?.current ? mapContainer.current : undefined}
          />
          <ViewToggle
            onCommunityDataClick={onCommunityDataClick}
            onDrmClick={onDrmClick}
            isMobile={isMobile}
          />
          {view === View.DATA && (
            <CommunityDataGeographySelect
              position="absolute"
              top={{
                base: "4.5rem",
                md: "4.5rem",
              }}
              left={{
                base: isMobile ? "50%" : "4vmin",
                sm: isMobile ? "50%" : "2vmin",
                md: isMobile ? "50%" : "1rem",
              }}
              transform={isMobile ? { base: "translate(-50%)" } : undefined}
              zIndex={100}
              boxShadow="lg"
              onGeographySelect={onCommunityDataGeographyChange}
            />
          )}

          <InstructionPanel />

          <AdditionalLayersPanel
            onToggleNtaLayer={() => {
              setNtaOutlineLayer(!ntaOutlineLayer);
            }}
            onToggleDistrictLayer={() => {
              setDistrictOutlineLayer(!districtOutlineLayer);
            }}
          />

          {view === View.DRM && <DRMMapLegend />}
        </Box>
      </Box>
    </>
  );
};

export default MapPage;
