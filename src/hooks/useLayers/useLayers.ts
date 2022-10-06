import { useRouter } from "next/router";
import { CartoLayer, MAP_TYPES } from "@deck.gl/carto";
import { PathStyleExtension } from "@deck.gl/extensions";
import { Geography } from "@constants/geography";
import { useView } from "@hooks/useView";
import { useGeoid } from "@hooks/useGeoid";
import { useGeography } from "@hooks/useGeography";
import drmData from "@data/DRI_Subindices_Indicators.json";
import ReactGA from "react-ga4";
import { defaultProps, LabeledCartoLayer } from "@helpers/LabeledCartoLayer";

export const useLayers = (
  ntaOutlineLayer: boolean
): LabeledCartoLayer[] | null => {
  LabeledCartoLayer.layerName = "LabeledCartoLayer";
  LabeledCartoLayer.defaultProps = defaultProps;

  const router = useRouter();

  const view = useView();
  const geoid = useGeoid();
  const geography = useGeography();

  const { DISTRICT, BOROUGH, CITYWIDE, NTA } = Geography;

  const toggleGeoSelect = (newGeoid: string) => {
    if (newGeoid.toString().trim() === geoid?.trim()) {
      ReactGA.event({
        category: "Clear Geoselection",
        action: `${geography}`,
        label: `${newGeoid}`,
      });
      router.push(`/map/${view}/${geography}/`);
    } else {
      ReactGA.event({
        category: "Select Geo",
        action: `${geography}`,
        label: `${newGeoid}`,
      });
      router.push(`/map/${view}/${geography}?geoid=${newGeoid}`);
    }
  };

  return [
    new CartoLayer({
      visible: ntaOutlineLayer,
      type: MAP_TYPES.QUERY,
      id: "unique_id_nta_outline",
      data: `SELECT * FROM ${process.env.NTA_LAYER}`,
      uniqueIdProperty: "id",
      getLineColor: [0, 0, 255, 255],
      getFillColor: [0, 0, 0, 0],
      lineWidthUnits: "pixels",
      getLineWidth: 2.5,
      updateTriggers: {
        getLineColor: [geoid],
        getLineWidth: [geoid],
      },
      lineWidthMinPixels: 0.5,
      stroked: true,
      extensions: [new PathStyleExtension({ offset: true })],
      getOffset: 0.5,
    }),
    new LabeledCartoLayer({
      passedId: DISTRICT,
      visible: geography === DISTRICT,
      type: MAP_TYPES.QUERY,
      id: "unique_id_district",
      data: `SELECT * FROM dcp_puma_2010`,
      uniqueIdProperty: "id",
      getLineColor: (feature: any) => {
        if (feature?.properties?.puma?.trim() === geoid?.trim()) {
          return [42, 67, 101, 255];
        }
        return [45, 55, 72, 255];
      },
      getFillColor: (feature: any) => {
        if (feature?.properties?.puma?.trim() === geoid?.trim()) {
          return [119, 129, 190, 127];
        }
        return [0, 0, 0, 0];
      },
      lineWidthUnits: "pixels",
      getLineWidth: (feature: any) => {
        if (feature?.properties?.puma?.trim() === geoid?.trim()) {
          return 2.5;
        }
        return 0;
      },
      updateTriggers: {
        getLineColor: [geoid],
        getFillColor: [geoid],
        getLineWidth: [geoid],
      },
      lineWidthMinPixels: 0.5,
      stroked: true,
      pickable: true,
      extensions: [new PathStyleExtension({ offset: true })],
      getOffset: 0.5,
      onClick: (info: any) => {
        const id: any = info?.object?.properties?.puma
          ? info.object.properties.puma
          : null;
        if (typeof id === "string") {
          // ugh https://github.com/vercel/next.js/issues/9473
          toggleGeoSelect(id);
        }
      },
    }),
    new LabeledCartoLayer({
      passedId: BOROUGH,
      visible: geography === BOROUGH,
      type: MAP_TYPES.QUERY,
      id: "unique_id_borough",
      data: `SELECT * FROM dcp_borough_boundary`,
      uniqueIdProperty: "id",
      getLineColor: (feature: any) => {
        if (feature?.properties?.borocode?.toString() === geoid?.trim()) {
          return [42, 67, 101, 255];
        }
        return [45, 55, 72, 255];
      },
      getFillColor: (feature: any) => {
        if (feature?.properties?.borocode?.toString() === geoid?.trim()) {
          return [119, 129, 190, 127];
        }
        return [0, 0, 0, 0];
      },
      lineWidthUnits: "pixels",
      getLineWidth: (feature: any) => {
        if (feature?.properties?.borocode?.toString() === geoid?.trim()) {
          return 2.5;
        }
        return 0;
      },
      updateTriggers: {
        getLineColor: [geoid],
        getFillColor: [geoid],
        getLineWidth: [geoid],
      },
      lineWidthMinPixels: 0.5,
      stroked: true,
      pickable: true,
      extensions: [new PathStyleExtension({ offset: true })],
      getOffset: 0.5,
      onClick: (info: any) => {
        const id: number | null = info?.object?.properties?.borocode
          ? info.object.properties.borocode
          : null;
        if (typeof id === "number") {
          toggleGeoSelect(id.toString());
        }
      },
    }),
    new LabeledCartoLayer({
      passedId: CITYWIDE,
      visible: geography === CITYWIDE,
      type: MAP_TYPES.QUERY,
      id: "unique_id_citywide",
      data: `SELECT * FROM pff_2020_city_21c`,
      uniqueIdProperty: "id",
      getLineColor: [42, 67, 101, 255],
      getFillColor: [119, 129, 190, 127],
      lineWidthMinPixels: 3,
      stroked: true,
    }),
    new LabeledCartoLayer({
      passedId: NTA,
      visible: geography === NTA,
      type: MAP_TYPES.QUERY,
      id: "unique_id_nta",
      data: `SELECT * FROM ${process.env.NTA_LAYER}`,
      uniqueIdProperty: "id",
      getLineColor: (feature: any) => {
        if (feature?.properties?.ntacode == geoid) {
          return [42, 67, 101, 255];
        }
        return [45, 55, 72, 255];
      },
      getFillColor: (feature: any) => {
        const singleDRM = drmData.find(
          (nta: any) => nta.ntacode === feature?.properties?.ntacode
        );
        switch (singleDRM?.displacementriskindex_reclass) {
          case "Highest":
            return [119, 47, 122, 178];
          case "Higher":
            return [189, 46, 137, 178];
          case "Intermediate":
            return [237, 108, 160, 178];
          case "Lower":
            return [245, 182, 188, 178];
          case "Lowest":
            return [254, 239, 229, 178];
          default:
            return [0, 0, 0, 0];
        }
      },
      lineWidthUnits: "pixels",
      getLineWidth: (feature: any) => {
        if (feature?.properties?.ntacode == geoid) {
          return 2.5;
        }
        return 0;
      },
      updateTriggers: {
        getLineColor: [geoid],
        getLineWidth: [geoid],
      },
      lineWidthMinPixels: 0.5,
      stroked: true,
      pickable: true,
      extensions: [new PathStyleExtension({ offset: true })],
      getOffset: 0.5,
      onClick: (info: any) => {
        const id: string = info?.object?.properties?.ntacode
          ? info.object.properties.ntacode.trim()
          : null;
        if (typeof id === "string") {
          toggleGeoSelect(id);
        }
      },
    }),
  ];
};
