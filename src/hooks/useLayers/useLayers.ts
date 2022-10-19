import { useRouter } from "next/router";
import { CartoLayer, MAP_TYPES } from "@deck.gl/carto";
import { PathStyleExtension } from "@deck.gl/extensions";
import { Geography } from "@constants/geography";
import { useView } from "@hooks/useView";
import { useGeoid } from "@hooks/useGeoid";
import { useGeography } from "@hooks/useGeography";
import drmData from "@data/DRI_Subindices_Indicators.json";
import ReactGA from "react-ga4";
import { useState } from "react";
import { defaultProps, LabeledCartoLayer } from "@helpers/LabeledCartoLayer";

export const useLayers = (
  setTooltip: (string: string) => void,
  ntaOutlineLayer: boolean,
  districtOutlineLayer: boolean
): LabeledCartoLayer[] | undefined => {
  LabeledCartoLayer.layerName = "LabeledCartoLayer";
  LabeledCartoLayer.defaultProps = defaultProps;

  const router = useRouter();

  const view = useView();
  const geoid = useGeoid();
  const geography = useGeography();

  const [currentGeo, setCurrentGeo] = useState<string | undefined>(undefined);

  const { DISTRICT, BOROUGH, CITYWIDE, NTA } = Geography;

  const toggleGeoSelect = (newGeoid: string) => {
    if (newGeoid.toString().trim() === geoid?.trim()) {
      ReactGA.event({
        category: "Clear Geoselection",
        action: `${geography}`,
        label: `${newGeoid}`,
      });
      router.push(`/map/${view}/${geography}/`, undefined, { shallow: true });
    } else {
      ReactGA.event({
        category: "Select Geo",
        action: `${geography}`,
        label: `${newGeoid}`,
      });
      router.push(`/map/${view}/${geography}?geoid=${newGeoid}`, undefined, {
        shallow: true,
      });
    }
  };

  return [
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
        if (
          feature?.properties?.puma?.trim() === currentGeo &&
          currentGeo !== geoid
        )
          return [250, 255, 0];
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
        } else if (feature?.properties?.puma?.trim() === currentGeo) {
          return 3;
        }
        return 0;
      },
      updateTriggers: {
        getLineColor: [currentGeo, geoid],
        getFillColor: [geoid],
        getLineWidth: [currentGeo, geoid],
      },
      lineWidthMinPixels: 0.5,
      stroked: true,
      pickable: true,
      extensions: [new PathStyleExtension({ offset: true })],
      getOffset: 0.5,
      onHover: (info: any) => {
        if (info.picked === false && currentGeo !== undefined) {
          setCurrentGeo(undefined);
        } else if (info?.object?.properties?.puma?.toString() !== currentGeo) {
          setCurrentGeo(info?.object?.properties?.puma);
        }
        setTooltip(info);
      },
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
        if (
          feature?.properties?.borocode?.toString() === currentGeo &&
          currentGeo !== geoid
        )
          return [250, 255, 0];
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
        } else if (feature?.properties?.borocode?.toString() === currentGeo) {
          return 3;
        }
        return 0;
      },
      updateTriggers: {
        getLineColor: [currentGeo, geoid],
        getFillColor: [geoid],
        getLineWidth: [currentGeo, geoid],
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
      onHover: (info: any) => {
        if (info.picked === false && currentGeo !== undefined) {
          setCurrentGeo(undefined);
        } else if (
          info?.object?.properties?.borocode?.toString() !== currentGeo
        ) {
          setCurrentGeo(info?.object?.properties?.borocode.toString());
        }
        setTooltip(info);
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
        if (feature?.properties?.ntacode === currentGeo && currentGeo !== geoid)
          return [250, 255, 0];
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
        if (feature?.properties?.ntacode === currentGeo) {
          return 3;
        }
        return 0;
      },
      updateTriggers: {
        getLineColor: [currentGeo, geoid],
        getLineWidth: [currentGeo, geoid],
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
      onHover: (info: any) => {
        if (info.picked === false && currentGeo !== undefined) {
          setCurrentGeo(undefined);
        } else if (
          info?.object?.properties?.ntacode?.toString() !== currentGeo
        ) {
          setCurrentGeo(info?.object?.properties?.ntacode);
        }
        setTooltip(info);
      },
    }),
    new CartoLayer({
      visible: ntaOutlineLayer,
      type: MAP_TYPES.QUERY,
      id: "unique_id_nta_outline",
      data: `SELECT * FROM ${process.env.NTA_LAYER}`,
      uniqueIdProperty: "id",
      getLineColor: [114, 138, 238, 192],
      getFillColor: [0, 0, 0, 0],
      lineWidthUnits: "pixels",
      getLineWidth: 3,
      lineWidthMinPixels: 0.5,
      stroked: true,
      extensions: [new PathStyleExtension({ offset: false })],
      getOffset: 0.5,
    }),
    new CartoLayer({
      visible: districtOutlineLayer,
      type: MAP_TYPES.QUERY,
      id: "unique_id_district_outline",
      data: `SELECT * FROM dcp_puma_2010`,
      uniqueIdProperty: "id",
      getLineColor: [202, 240, 140, 192],
      getFillColor: [0, 0, 0, 0],
      lineWidthUnits: "pixels",
      getLineWidth: 3,
      lineWidthMinPixels: 0.5,
      stroked: true,
      extensions: [new PathStyleExtension({ offset: false })],
      getOffset: 0.5,
    }),
  ];
};
