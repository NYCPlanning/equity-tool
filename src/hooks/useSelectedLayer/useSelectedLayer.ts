import { useRouter } from "next/router";
import { CartoLayer, MAP_TYPES } from "@deck.gl/carto";
import { PathStyleExtension } from "@deck.gl/extensions";
import { Geography } from "@constants/geography";
import { useMapSubrouteInfo } from "@hooks/useMapSubrouteInfo";
import dridata from "@data/DRI_Subindices_Indicators.json";

export const useSelectedLayer = (): CartoLayer<any, any>[] | null => {
  const router = useRouter();

  const { view, geography, geoid } = useMapSubrouteInfo();

  const { DISTRICT, BOROUGH, CITYWIDE, NTA } = Geography;

  const toggleGeoSelect = (newGeoid: string) => {
    newGeoid.toString() === geoid
      ? router.push(`/map/${view}/${geography}/`)
      : router.push(`/map/${view}/${geography}?geoid=${newGeoid}`);
  };

  switch (geography) {
    case DISTRICT:
      return [
        new CartoLayer({
          type: MAP_TYPES.QUERY,
          id: DISTRICT,
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
              router.push(`/map/datatool/${DISTRICT}?geoid=${id}`);
            }
          },
        }),
      ];
      break;
    case BOROUGH:
      return [
        new CartoLayer({
          type: MAP_TYPES.QUERY,
          id: BOROUGH,
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
              router.push(`/map/datatool/${BOROUGH}?geoid=${id}`);
            }
          },
        }),
      ];
    case CITYWIDE:
      return [
        new CartoLayer({
          type: MAP_TYPES.QUERY,
          id: CITYWIDE,
          data: `SELECT * FROM pff_2020_city_21c`,
          uniqueIdProperty: "id",
          getLineColor: [100, 100, 100, 255],
          getFillColor: [0, 0, 0, 0],
          lineWidthMinPixels: 3,
          stroked: true,
        }),
      ];
    case NTA:
      return [
        new CartoLayer({
          type: MAP_TYPES.QUERY,
          id: NTA,
          data: "SELECT * FROM dcp_nta_2010",
          uniqueIdProperty: "id",
          getLineColor: (feature: any) => {
            if (feature?.properties?.ntacode == geoid) {
              return [42, 67, 101, 255];
            }
            return [100, 100, 100, 255];
          },
          getFillColor: (feature: any) => {
            const singleDRI = dridata.find(
              (nta: any) => nta.ntacode === feature?.properties?.ntacode
            );
            switch (singleDRI?.displacementriskindex_reclass) {
              case "Highest":
                return [119, 47, 122, 255];
              case "Higher":
                return [189, 46, 137, 255];
              case "Intermediate":
                return [237, 108, 160, 255];
              case "Lower":
                return [245, 182, 188, 255];
              case "Lowest":
                return [254, 239, 229, 255];
              default:
                return [0, 0, 0, 0];
            }
          },
          lineWidthUnits: "pixels",
          getLineWidth: (feature: any) => {
            if (feature?.properties?.ntacode == geoid) {
              return 4.5;
            }
            return 1.5;
          },
          updateTriggers: {
            getLineColor: [geoid],
            getLineWidth: [geoid],
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
  }

  return [];
};
