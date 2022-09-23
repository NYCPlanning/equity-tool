import { useRouter } from "next/router";
import { CartoLayer, MAP_TYPES } from "@deck.gl/carto";
import { CompositeLayer } from "@deck.gl/core";
import { TextLayer } from '@deck.gl/layers';
import { PathStyleExtension } from "@deck.gl/extensions";
import { Geography } from "@constants/geography";
import { useView } from "@hooks/useView";
import { useGeoid } from "@hooks/useGeoid";
import { useGeography } from "@hooks/useGeography";
import drmData from "@data/DRI_Subindices_Indicators.json";
import ReactGA from "react-ga4";
import pumaLabels from "@data/dcp_puma_2010_centers.json";
import ntaLabels from "@data/dcp_nta_2020_centers.json";


export const defaultProps = {
    // Inherit all of CartoLayer's props
    ...CartoLayer.defaultProps,
    // Label for each feature
    getLabel: {type: 'accessor', value: x => x.text},
    // Label size for each feature
    getLabelSize: {type: 'accessor', value: 32},
    // Label color for each feature
    getLabelColor: {type: 'accessor', value: [0, 0, 0, 255]},
    // Label always facing the camera
    billboard: true,
    // Label size units
    labelSizeUnits: 'pixels',
    // Label background color
    labelBackground: {type: 'color', value: null, optional: true},
    // Label font
    fontFamily: 'Monaco, monospace'
}
/*
export const getLabelAnchors = {
  // Extract anchor positions from features. We will be placing labels at these positions.
  return: function(feature: { geometry: { type: any; coordinates: any; }; })  {
    const {type, coordinates} = feature.geometry;
    switch (type) {
      case 'Point':
        return [coordinates];
      case 'MultiPoint':
        return coordinates;
      case 'Polygon':
        return [turf.centerOfMass(feature).geometry.coordinates];
      case 'MultiPolygon':
        let polygons = coordinates.map(rings => turf.polygon(rings));
        const areas = polygons.map(turf.area);
        const maxArea = Math.max.apply(null, areas);
        // Filter out the areas that are too small
        return polygons.filter((f, index) => areas[index] > maxArea * 0.5)
          .map(f => turf.centerOfMass(f).geometry.coordinates);
      default:
        return [];
    }
  }
} */
  
const { DISTRICT, BOROUGH, CITYWIDE, NTA } = Geography;

export class LabeledCartoLayer extends CompositeLayer<any, any> {
  // updateState({changeFlags}) {
  //   const {data} = this.props;
  //   if (changeFlags.dataChanged && data) {
  //     const labelData = (data.features || data)
  //       .flatMap((feature, index) => {
  //         const labelAnchors = getLabelAnchors(feature);
  //         return labelAnchors.map(p => this.getSubLayerRow({position: p}, feature, index));
  //       });

  //     this.setState({labelData});
  //   }
  // }

  // Force update layer and re-render sub layers when viewport changes
  shouldUpdateState({changeFlags}) {
    return changeFlags.somethingChanged;
  }
  renderLayers() {
    console.log('zoom', this.context.viewport.zoom)
    // const {
    //   getLabel,
    //   getLabelSize,
    //   getLabelColor,
    //   labelSizeUnits,
    //   labelBackground,
    //   billboard,
    //   fontFamily
    // } = this.props;

    return [
      new CartoLayer({...this.props}, {
        id: this.props.passedId,
        uniqueIdProperty: "id",
      }),
      new TextLayer({}, {
        visible: this.props.visible,
        data: pumaLabels.features,
        id: `${this.props.passedId}_pumatextlayer`,
        uniqueIdProperty: "id",
        getPosition: x => x.coordinates,
        getText: x => x.label.toUpperCase(),
        getSize: 200,
        billboard: true,
        getColor: [74, 85, 104, 255],
        fontFamily: 'Helvetica Neue',
        fontSettings: {
          sdf: true,
        },
        outlineWidth: 1,
        outlineColor: [255, 255, 255, 255],
        maxWidth: 1000,
        sizeUnits: 'meters',
      }),
      new TextLayer({}, {
        visible: this.props.visible,
        data: ntaLabels.features,
        id: `${this.props.passedId}_ntatextlayer`,
        uniqueIdProperty: "id",
        getPosition: x => x.coordinates,
        getText: x => x.label.toUpperCase(),
        getSize: 200,
        billboard: true,
        getColor: [74, 85, 104, 255],
        fontFamily: 'Helvetica Neue',
        fontSettings: {
          sdf: true,
        },
        outlineWidth: 1,
        outlineColor: [255, 255, 255, 255],
        maxWidth: 1000,
        sizeUnits: 'meters',
      }),
    ];
    
  }

  //https://deck.gl/docs/api-reference/core/composite-layer
  filterSubLayer({layer, viewport}) {
    if(layer.id.slice(-14) === "_pumatextlayer") {
      return ((12 < viewport.zoom) && (viewport.zoom < 15))
    } else if(layer.id.slice(-13) === "_ntatextlayer") {
      return ((13 < viewport.zoom) && (viewport.zoom < 15))
    }
    return true;
  }
}
