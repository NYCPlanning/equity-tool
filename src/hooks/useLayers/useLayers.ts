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

export const useLayers = (
  setTooltip: (string: string) => void
): CartoLayer<any, any>[] | null => {
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
      visible: geography === DISTRICT,
      type: MAP_TYPES.QUERY,
      id: DISTRICT,
      data: `SELECT * FROM dcp_puma_2010`,
      uniqueIdProperty: "id",
      getLineColor: (feature: any) => {
        if (feature?.properties?.puma?.trim() === geoid?.trim()) {
          setCurrentGeo(undefined);
          return [42, 67, 101, 255];
        }
        if (
          feature?.properties?.puma?.trim() === currentGeo?.trim() &&
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
        } else if (feature?.properties?.puma?.trim() === currentGeo?.trim()) {
          return 3;
        }
        return 0;
      },
      updateTriggers: {
        getLineColor: [currentGeo],
        getFillColor: [currentGeo],
        getLineWidth: [currentGeo],
      },
      lineWidthMinPixels: 0.5,
      stroked: true,
      pickable: true,
      extensions: [new PathStyleExtension({ offset: true })],
      getOffset: 0.5,
      onHover: (info: any) => {
        if (info.object && currentGeo !== geoid)
          setCurrentGeo(info.object.properties.puma);
        else setCurrentGeo(undefined);
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
    new CartoLayer({
      visible: geography === BOROUGH,
      type: MAP_TYPES.QUERY,
      id: BOROUGH,
      data: `SELECT * FROM dcp_borough_boundary`,
      uniqueIdProperty: "id",
      getLineColor: (feature: any) => {
        if (feature?.properties?.borocode?.toString() === geoid?.trim()) {
          setCurrentGeo(undefined);
          return [42, 67, 101, 255];
        }
        if (
          feature?.properties?.borocode?.toString() === currentGeo?.trim() &&
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
        } else if (
          feature?.properties?.borocode?.toString() === currentGeo?.trim()
        ) {
          return 3;
        }
        return 0;
      },
      updateTriggers: {
        getLineColor: [currentGeo],
        getFillColor: [currentGeo],
        getLineWidth: [currentGeo],
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
        if (info?.object?.properties?.borocode.toString() === currentGeo)
          return;
        else if (
          info.object &&
          currentGeo !== geoid &&
          info.object.properties.borocode.toString() !== currentGeo
        )
          setCurrentGeo(info.object.properties.borocode.toString());
        else setCurrentGeo(undefined);
        setTooltip(info);
      },
    }),
    new CartoLayer({
      visible: geography === CITYWIDE,
      type: MAP_TYPES.QUERY,
      id: CITYWIDE,
      data: `SELECT * FROM pff_2020_city_21c`,
      uniqueIdProperty: "id",
      getLineColor: [42, 67, 101, 255],
      getFillColor: [119, 129, 190, 127],
      lineWidthMinPixels: 3,
      stroked: true,
    }),
    new CartoLayer({
      visible: geography === NTA,
      type: MAP_TYPES.QUERY,
      id: NTA,
      data: `SELECT * FROM ${process.env.NTA_LAYER}`,
      uniqueIdProperty: "id",
      getLineColor: (feature: any) => {
        if (feature?.properties?.ntacode == geoid) {
          setCurrentGeo(undefined);
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
        getLineColor: [currentGeo],
        getLineWidth: [currentGeo],
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
        if (info.object && currentGeo !== geoid)
          setCurrentGeo(info.object.properties.ntacode);
        else setCurrentGeo(undefined);
        setTooltip(info);
      },
    }),
  ];
};
