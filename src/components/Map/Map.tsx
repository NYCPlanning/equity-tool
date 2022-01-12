import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { setDefaultCredentials, API_VERSIONS } from "@deck.gl/carto";
import baseMap from "@data/basemap.json";
import { CartoLayer } from "@deck.gl/carto";

setDefaultCredentials({
  apiVersion: API_VERSIONS.V2,
  username: process.env.NEXT_PUBLIC_CARTO_USERNAME,
  apiKey: process.env.NEXT_PUBLIC_CARTO_API_KEY,
});

interface MapProps {
  layers: CartoLayer<any, any>[] | null;
  mapParent: any;
}

export const Map = ({ layers, mapParent }: MapProps) => {
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
      parent={mapParent.current}
    >
      <StaticMap
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle={baseMap}
      />
    </DeckGL>
  );

  return map;
};
