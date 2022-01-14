import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { DeckGLProps } from "@deck.gl/react/deckgl";
import { setDefaultCredentials, API_VERSIONS } from "@deck.gl/carto";
import baseMap from "@data/basemap.json";

setDefaultCredentials({
  apiVersion: API_VERSIONS.V2,
  username: process.env.NEXT_PUBLIC_CARTO_USERNAME,
  apiKey: process.env.NEXT_PUBLIC_CARTO_API_KEY,
});

type MapProps = Pick<DeckGLProps, "parent" | "layers">;

export const Map = ({ layers, parent }: MapProps) => {
  const INITIAL_VIEW_STATE = {
    longitude: -73.986607,
    latitude: 40.691869,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  };

  const map = (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      parent={parent}
    >
      <StaticMap
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle={baseMap}
      />
    </DeckGL>
  );

  return map;
};
