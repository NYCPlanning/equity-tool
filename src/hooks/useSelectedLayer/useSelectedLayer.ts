import { useRouter } from "next/router";
import { CartoLayer, MAP_TYPES } from "@deck.gl/carto";
import { PathStyleExtension } from "@deck.gl/extensions";
import { Geography } from "@constants/geography";

export const useSelectedLayer = (
  view: string | null,
  geography: string | null
): CartoLayer<any, any>[] | null => {
  const router = useRouter();

  const { subroutes } = router.query;

  const { District, Borough, Citywide, Nta } = Geography;

  // acquire subroute info, if any
  const ntacode = subroutes ? subroutes[2] : null;

  const toggleGeoSelect = (newNtacode: string) => {
    newNtacode.toString() === ntacode
      ? router.push(`/map/dri/nta/`)
      : router.push(`/map/dri/nta/${newNtacode}`);
  };

  if (view === "datatool") {
    switch (geography) {
      case District:
        return [
          new CartoLayer({
            type: MAP_TYPES.QUERY,
            id: District,
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
      case Borough:
        return [
          new CartoLayer({
            type: MAP_TYPES.QUERY,
            id: Borough,
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
      case Citywide:
        return [
          new CartoLayer({
            type: MAP_TYPES.QUERY,
            id: Citywide,
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
      case Nta:
        return [
          new CartoLayer({
            type: MAP_TYPES.QUERY,
            id: "nta",
            data: "SELECT * FROM dcp_nta_2010",
            uniqueIdProperty: "id",
            getLineColor: (feature: any) => {
              if (feature?.properties?.ntacode == ntacode) {
                return [42, 67, 101, 255];
              }
              return [100, 100, 100, 255];
            },
            getFillColor: [0, 0, 0, 0],
            lineWidthUnits: "pixels",
            getLineWidth: (feature: any) => {
              if (feature?.properties?.ntacode == ntacode) {
                return 4.5;
              }
              return 1.5;
            },
            updateTriggers: {
              getLineColor: [ntacode],
              getLineWidth: [ntacode],
            },
            lineWidthMinPixels: 1.5,
            stroked: true,
            pickable: true,
            extensions: [new PathStyleExtension({ offset: true })],
            getOffset: 0.5,
            onClick: (info: any) => {
              const id: string = info?.object?.properties?.ntacode
                ? info.object.properties.ntacode
                : null;
              if (typeof id === "string") {
                toggleGeoSelect(id);
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
