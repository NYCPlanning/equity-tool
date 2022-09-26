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

setDefaultCredentials({
  apiVersion: API_VERSIONS.V2,
  username: process.env.NEXT_PUBLIC_CARTO_USERNAME,
  apiKey: process.env.NEXT_PUBLIC_CARTO_API_KEY,
});

type DeckProps = Pick<DeckGLProps, "layers" | "parent">;

interface HoverType {
  x: number;
  y: number;
  object: {
    properties: {
      cartodb_id: number;
      layerName: string;
      puma: string | null;
      shape_area: number;
      shape_leng: number;
      ntacode?: string | undefined | null;
      boroname?: string | undefined | null;
      ntaname?: string | undefined | null;
    };
  };
}

interface MapProps extends DeckProps {
  hoverInfo: HoverType | null;
}

export const Map = ({ layers, parent, hoverInfo }: MapProps) => {
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

  const hoverInfoPuma = hoverInfo?.object?.properties
    ? hoverInfo.object.properties.puma
    : null;

  const pumaInfo: pumaInfo | null = usePumaInfo(hoverInfoPuma);

  let tooltipText:
    | string
    | null
    | undefined = `PUMA ${hoverInfoPuma}: ${pumaInfo?.neighborhoods} (${pumaInfo?.districts})`;

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
    >
      <Box
        position="absolute"
        top={{
          base: view === "data" ? "4.5rem" : "1.3rem",
          md: view === "data" ? "8rem" : "4.5rem",
        }}
        left={{
          base: "2vmin",
          sm: "4vmin",
          md: "1rem",
        }}
      >
        <NavigationControl />
      </Box>

      <ReactMapGL
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle={baseMap}
      ></ReactMapGL>
      {tooltipText && !tooltipText.includes("etc") && hoverInfo && (
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            pointerEvents: "none",
            left: hoverInfo.x + 5,
            top: hoverInfo.y + 10,
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
