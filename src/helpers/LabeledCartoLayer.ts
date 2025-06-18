import { CartoLayer } from "@deck.gl/carto";
import { CompositeLayer } from "@deck.gl/core";
import { TextLayer } from "@deck.gl/layers";
import pumaLabels from "@data/dcp_puma_2020_centers.json";
import ntaLabels from "@data/dcp_nta_2020_centers.json";
import boroLabels from "@data/dcp_boro_2020_centers.json";
import { Geography } from "@constants/geography";

export const defaultProps = {
  // Inherit all of CartoLayer's props
  ...CartoLayer.defaultProps,
  // Label for each feature
  getLabel: { type: "accessor", value: (x: any) => x.label.toUpperCase() },
  // Label size for each feature
  getLabelSize: { type: "accessor", value: 32 },
  // Label color for each feature
  getLabelColor: { type: "accessor", value: [0, 0, 0, 255] },
  // Label always facing the camera
  billboard: true,
  // Label size units
  labelSizeUnits: "pixels",
  // Label background color
  labelBackground: { type: "color", value: null, optional: true },
  // Label font
  fontFamily: "Monaco, monospace",
};

export class LabeledCartoLayer extends CompositeLayer<any, any> {
  // Force update layer and re-render sub layers when viewport changes
  shouldUpdateState({ changeFlags }: { changeFlags: any }) {
    return changeFlags.somethingChanged;
  }
  renderLayers() {
    const { NTA } = Geography;

    return [
      new CartoLayer(
        { ...this.props },
        {
          id: this.props.passedId,
          uniqueIdProperty: "id",
        }
      ),
      new TextLayer({
        visible: this.props.visible && this.props.passedId == NTA,
        data: ntaLabels.features,
        id: `${this.props.passedId}_ntatextlayer_drm`,
        uniqueIdProperty: "id",
        getPosition: (x: any) => x.coordinates,
        getText: (x: any) => x.label.toUpperCase(),
        getSize: 125,
        billboard: true,
        getColor: [74, 85, 104, 200],
        fontFamily: "Helvetica Neue, sans-serif",
        fontSettings: {
          sdf: true,
        },
        outlineWidth: 1,
        outlineColor: [255, 255, 255, 255],
        maxWidth: 800,
        sizeUnits: "meters",
        fontWeight: 700,
      }),
      new TextLayer({
        visible: this.props.visible && this.props.passedId !== NTA,
        data: ntaLabels.features,
        id: `${this.props.passedId}_ntatextlayer_cd`,
        uniqueIdProperty: "id",
        getPosition: (x: any) => x.coordinates,
        getText: (x: any) => x.label.toUpperCase(),
        getSize: 125,
        billboard: true,
        getColor: [74, 85, 104, 200],
        fontFamily: "Helvetica Neue, sans-serif",
        fontSettings: {
          sdf: true,
        },
        outlineWidth: 1,
        outlineColor: [255, 255, 255, 255],
        maxWidth: 800,
        sizeUnits: "meters",
      }),
      new TextLayer({
        visible: this.props.visible && this.props.passedId !== NTA,
        data: pumaLabels.features,
        id: `${this.props.passedId}_pumatextlayer`,
        uniqueIdProperty: "id",
        getPosition: (x: any) => x.coordinates,
        getText: (x: any) => x.label.toUpperCase(),
        getSize: 200,
        billboard: true,
        getColor: [74, 85, 104, 255],
        fontFamily: "Helvetica Neue, sans-serif",
        fontSettings: {
          sdf: true,
        },
        outlineWidth: 1,
        outlineColor: [255, 255, 255, 255],
        maxWidth: 800,
        sizeUnits: "meters",
      }),
      new TextLayer({
        visible: this.props.visible,
        data: boroLabels.features,
        id: `${this.props.passedId}_borotextlayer`,
        uniqueIdProperty: "id",
        getPosition: (x: any) => x.coordinates,
        getText: (x: any) => x.label.toUpperCase(),
        getSize: 14,
        billboard: true,
        getColor: [74, 85, 104, 255],
        fontFamily: "Helvetica Neue, sans-serif",
        fontSettings: {
          sdf: true,
        },
        outlineWidth: 1,
        outlineColor: [255, 255, 255, 255],
        maxWidth: 2800,
        sizeUnits: "pixels",
      }),
    ];
  }

  //https://deck.gl/docs/api-reference/core/composite-layer
  filterSubLayer({ layer, viewport }: { layer: any; viewport: any }) {
    if (layer.id.slice(-14) === "_pumatextlayer") {
      return 10.5 < viewport.zoom && viewport.zoom < 13;
    } else if (layer.id.slice(-17) === "_ntatextlayer_drm") {
      return 11 < viewport.zoom && viewport.zoom < 15;
    } else if (layer.id.slice(-16) === "_ntatextlayer_cd") {
      return 12 < viewport.zoom && viewport.zoom < 15;
    } else if (layer.id.slice(-14) === "_borotextlayer") {
      return viewport.zoom < 11;
    }
    return true;
  }
}
