import { DeckGL } from "@deck.gl/react";
import { DeckGLProps } from "@deck.gl/react/deckgl";
import ReactMapGL, {
  _MapContext as MapContext,
  NavigationControl,
} from "react-map-gl";
import { setDefaultCredentials, API_VERSIONS } from "@deck.gl/carto";
import baseMap from "@data/basemap.json";

setDefaultCredentials({
  apiVersion: API_VERSIONS.V2,
  username: process.env.NEXT_PUBLIC_CARTO_USERNAME,
  apiKey: process.env.NEXT_PUBLIC_CARTO_API_KEY,
});

type MapProps = Pick<DeckGLProps, "layers" | "parent">;

export const Map = ({ layers, parent }: MapProps) => {
  const INITIAL_VIEW_STATE = {
    longitude: -73.986607,
    latitude: 40.691869,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  };

  const navControlStyle = {
    position: "absolute",
    bottom: 150,
    left: 10,
  } as React.CSSProperties;

  // MapContext is necessary for navigation controls to work.
  // Unclear on why.
  const map = (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      parent={parent}
      ContextProvider={MapContext.Provider}
    >
      <div style={navControlStyle}>
        <NavigationControl />
      </div>

      <ReactMapGL
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle={baseMap}
      ></ReactMapGL>
    </DeckGL>
  );

  return map;
};
