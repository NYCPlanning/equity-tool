import { DeckGL } from "@deck.gl/react";
import { DeckGLProps } from "@deck.gl/react/deckgl";
import ReactMapGL, {
  _MapContext as MapContext,
  NavigationControl,
} from "react-map-gl";
import { setDefaultCredentials, API_VERSIONS } from "@deck.gl/carto";
import baseMap from "@data/basemap.json";
import { Box } from "@chakra-ui/react";
import { useView } from "@hooks/useView";
import { useWindowWidth } from "@react-hook/window-size";
import { pumaInfo, usePumaInfo } from "@hooks/usePumaInfo";
import { useGeography } from "@hooks/useGeography";
import { useEffect, useRef, useState } from "react";
import { useLayers } from "@hooks/useLayers";
import { View } from "@constants/View";

setDefaultCredentials({
  apiVersion: API_VERSIONS.V2,
  username: process.env.NEXT_PUBLIC_CARTO_USERNAME,
  apiKey: process.env.NEXT_PUBLIC_CARTO_API_KEY,
});

type DeckProps = DeckGLProps<"parent">;

interface MapProps extends DeckProps {
  ntaOutlineLayer: boolean;
  districtOutlineLayer: boolean;
}

export const Map = ({
  ntaOutlineLayer,
  districtOutlineLayer,
  parent,
}: MapProps) => {
  const [hoverInfo, setHoverInfo] = useState<any | null>(null);

  const layers = useLayers(setHoverInfo, ntaOutlineLayer, districtOutlineLayer);

  const view = useView();
  const geography = useGeography();
  const isMobile = useWindowWidth() < 768;

  const INITIAL_VIEW_STATE = !isMobile
    ? {
        longitude: -74.0008,
        latitude: 40.7018,
        zoom: 9.7,
        pitch: 0,
        bearing: 0,
      }
    : {
        longitude: -73.99,
        latitude: 40.55,
        zoom: 8.8,
        pitch: 0,
        bearing: 0,
      };

  const tooltipRef = useRef<HTMLDivElement>(null);

  const hoverInfoPuma = hoverInfo?.object?.properties
    ? hoverInfo.object.properties.puma
    : null;

  const pumaInfo: pumaInfo | null = usePumaInfo(hoverInfoPuma);

  let tooltipText:
    | string
    | null
    | undefined = `PUMA ${hoverInfoPuma}: ${pumaInfo?.neighborhoods} (${pumaInfo?.districts})`;

  const [tooltipWidth, setTooltipWidth] = useState<number>(0);

  useEffect(() => {
    if (tooltipRef?.current?.offsetWidth)
      setTooltipWidth(tooltipRef.current.offsetWidth / 2);
  }, [hoverInfo?.x, hoverInfo?.y, tooltipWidth]);

  switch (geography) {
    case "borough":
      tooltipText = hoverInfo?.object?.properties.boroname;
      break;
    case "nta":
      hoverInfo?.object
        ? (tooltipText = `NTA ${hoverInfo?.object?.properties.ntacode}: ${hoverInfo?.object?.properties.ntaname}`)
        : (tooltipText = undefined);
      break;
    default:
      if (!hoverInfo?.object) tooltipText = undefined;
      break;
  }

  // MapContext is necessary for navigation controls to work.
  // Likely because it holds the view state, and keeps Deck and
  // MapGL in sync with that singular state.
  // https://deck.gl/docs/api-reference/react/deckgl#react-context
  const map = (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      parent={parent}
      ContextProvider={MapContext.Provider}
      getCursor={({ isHovering, isDragging }) =>
        isHovering ? "pointer" : isDragging ? "grabbing" : "grab"
      }
    >
      <Box
        position="absolute"
        top={{
          base: view === View.DATA ? "4.5rem" : "1.3rem",
          md: view === View.DATA ? "8rem" : "4.5rem",
        }}
        left={{
          base: "2vmin",
          sm: "4vmin",
          md: "1rem",
        }}
      >
        {!isMobile && <NavigationControl />}
      </Box>

      <ReactMapGL
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle={baseMap}
        attributionControl={!isMobile}
      ></ReactMapGL>
      {tooltipText && !tooltipText.includes("etc") && hoverInfo && (
        <div
          ref={tooltipRef}
          style={{
            position: "absolute",
            zIndex: 1,
            pointerEvents: "none",
            left: hoverInfo.x - tooltipWidth,
            top: hoverInfo.y + 20,
            maxWidth: "320px",
            height: "fit-content",
            borderRadius: "4px",
            padding: "8px",
            gap: "10px",
            backgroundColor: "#171923",
            font: "Helvetica Neue",
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "20px",
            textAlign: "center",
            color: "white",
          }}
        >
          {tooltipText}
        </div>
      )}
    </DeckGL>
  );

  return map;
};
