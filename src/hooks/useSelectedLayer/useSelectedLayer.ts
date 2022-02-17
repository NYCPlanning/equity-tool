import { useRouter } from "next/router";
import { CartoLayer, MAP_TYPES } from "@deck.gl/carto";

export const useSelectedLayer = (
  view: string | null,
  geography: string | null
): CartoLayer<any, any>[] | null => {
  const router = useRouter();

  if (view === "datatool") {
    switch (geography) {
      case "district":
        return [
          new CartoLayer({
            type: MAP_TYPES.QUERY,
            id: "puma",
            data: `SELECT * FROM dcp_puma_2010`,
            uniqueIdProperty: "id",
            getLineColor: [100, 100, 100, 255],
            getFillColor: [0, 0, 0, 0],
            lineWidthMinPixels: 3,
            stroked: true,
            pickable: true,
            onClick: (info: any) => {
              const id: any = info?.object?.properties?.puma
                ? info.object.properties.puma
                : null;
              if (typeof id === "string") {
                // ugh https://github.com/vercel/next.js/issues/9473
                router.push(`/map/datatool/district/${id}`);
              }
            },
          }),
        ];
        break;
      case "borough":
        return [
          new CartoLayer({
            type: MAP_TYPES.QUERY,
            id: "borough",
            data: `SELECT * FROM dcp_borough_boundary`,
            uniqueIdProperty: "id",
            getLineColor: [100, 100, 100, 255],
            getFillColor: [0, 0, 0, 0],
            lineWidthMinPixels: 3,
            stroked: true,
            pickable: true,
            onClick: (info: any) => {
              // TODO: Translate to borocode if needed for data lookup
              const id: any = info?.object?.properties?.boroname
                ? info.object.properties.boroname
                : null;
              if (typeof id === "string") {
                router.push({ pathname: `/map/datatool/borough/${id}` });
              }
            },
          }),
        ];
      case "citywide":
        return [
          new CartoLayer({
            type: MAP_TYPES.QUERY,
            id: "city",
            data: `SELECT * FROM pff_2020_city_21c`,
            uniqueIdProperty: "id",
            getLineColor: [100, 100, 100, 255],
            getFillColor: [0, 0, 0, 0],
            lineWidthMinPixels: 3,
            stroked: true,
          }),
        ];
      default:
        return null;
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
                router.push(`map/dri/nta/${id}`);
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
