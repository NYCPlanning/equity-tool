import { CartoLayer } from "@deck.gl/carto";
import { CompositeLayer } from "@deck.gl/core";
import { TextLayer } from "@deck.gl/layers";
import pumaLabels from "@data/dcp_puma_2010_centers.json";
import ntaLabels from "@data/dcp_nta_2020_centers.json";

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
    console.log("zoom", this.context.viewport.zoom);

    return [
      new CartoLayer(
        { ...this.props },
        {
          id: this.props.passedId,
          uniqueIdProperty: "id",
        }
      ),
      new TextLayer(
        {},
        {
          visible: this.props.visible,
          data: pumaLabels.features,
          id: `${this.props.passedId}_pumatextlayer`,
          uniqueIdProperty: "id",
          getPosition: (x: any) => x.coordinates,
          getText: (x: any) => x.label.toUpperCase(),
          getSize: 200,
          billboard: true,
          getColor: [74, 85, 104, 255],
          fontFamily: "Helvetica Neue",
          fontSettings: {
            sdf: true,
          },
          outlineWidth: 1,
          outlineColor: [255, 255, 255, 255],
          maxWidth: 1000,
          sizeUnits: "meters",
        }
      ),
      new TextLayer(
        {},
        {
          visible: this.props.visible,
          data: ntaLabels.features,
          id: `${this.props.passedId}_ntatextlayer`,
          uniqueIdProperty: "id",
          getPosition: (x: any) => x.coordinates,
          getText: (x: any) => x.label.toUpperCase(),
          getSize: 150,
          billboard: true,
          getColor: [74, 85, 104, 255],
          fontFamily: "Helvetica Neue",
          fontSettings: {
            sdf: true,
          },
          outlineWidth: 1,
          outlineColor: [255, 255, 255, 255],
          maxWidth: 1000,
          sizeUnits: "meters",
        }
      ),
    ];
  }

  //https://deck.gl/docs/api-reference/core/composite-layer
  filterSubLayer({ layer, viewport }: { layer: any; viewport: any }) {
    if (layer.id.slice(-14) === "_pumatextlayer") {
      return 12 < viewport.zoom && viewport.zoom < 15;
    } else if (layer.id.slice(-13) === "_ntatextlayer") {
      return 13 < viewport.zoom && viewport.zoom < 15;
    }
    return true;
  }
}
