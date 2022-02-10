import { useRouter } from "next/router";
import { CartoLayer, MAP_TYPES } from "@deck.gl/carto";
import { scaleSequential } from "d3-scale";
import { rgb } from "d3-color";
import { interpolateRgb } from "d3-interpolate";

import ntas from "@data/ntas.json";

export const useSelectedLayer = (
  view: string | null,
  geography: string | null
): CartoLayer<any, any>[] | null => {
  const router = useRouter();

  const scale = scaleSequential().domain([0, 100]);
  const interpolate = interpolateRgb("#f4f4b4", "#d44932");

  if (view === "datatool") {
    switch (geography) {
      case "census":
        return [
          new CartoLayer({
            type: MAP_TYPES.QUERY,
            id: "censusarea",
            data: `SELECT * FROM pff_2020_census_tracts_21c`,
            uniqueIdProperty: "id",
            getLineColor: [100, 100, 100, 255],
            getFillColor: [0, 0, 0, 0],
            lineWidthMinPixels: 3,
            stroked: true,
            pickable: true,
            onClick: (info: any) => {
              const id: any = info?.object?.properties?.id
                ? info.object.properties.id
                : null;
              if (typeof id === "string") {
                // ugh https://github.com/vercel/next.js/issues/9473
                router.push(`map/datatool/census/${id}`);
              }
            },
          }),
        ];
        break;
      case "borough":
        return [
          new CartoLayer({
            type: MAP_TYPES.QUERY,
            id: "nta",
            data: `SELECT *, nta2020 as id, ntaname as label FROM dcp_nta_2020 WHERE ntatype = '0'`,
            uniqueIdProperty: "id",
            getLineColor: [100, 100, 100, 255],
            getFillColor: (feature: any) => {
              if (feature?.properties?.id) {
                const id: keyof typeof ntas = feature?.properties?.id;
                if (typeof ntas[id] !== "undefined") {
                  const color = rgb(
                    interpolate(scale(ntas[id].displacementRisk))
                  );
                  return [color.r, color.g, color.b, 100];
                }
                return [0, 0, 0, 0];
              }
              return [0, 0, 0, 0];
            },
            lineWidthMinPixels: 3,
            stroked: true,
            pickable: true,
            onClick: (info: any) => {
              const id: any = info?.object?.properties?.id
                ? info.object.properties.id
                : null;
              if (typeof id === "string") {
                router.push({ pathname: `/map/datatool/borough/${id}` });
              }
            },
          }),
        ];
        break;
      default:
        return null;
        break;
    }
  } else if (view === "dri") {
    switch (geography) {
      case "nta":
        return [
          new CartoLayer({
            type: MAP_TYPES.QUERY,
            id: "nta",
            data: `SELECT * FROM dcp_nta_2010`,
            uniqueIdProperty: "id",
            getLineColor: [100, 100, 100, 255],
            getFillColor: [0, 0, 0, 0],
            lineWidthMinPixels: 3,
            stroked: true,
            pickable: true,
            onClick: (info: any) => {
              const id: any = info?.object?.properties?.id
                ? info.object.properties.id
                : null;
              if (typeof id === "string") {
                // ugh https://github.com/vercel/next.js/issues/9473
                router.push(`map/datatool/census/${id}`);
              }
            },
          }),
        ];
        break;
      default:
        return null;
        break;
    }
  }

  return [];
};
