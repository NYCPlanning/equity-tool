// This file imports community-supported types for Deckgl (https://github.com/danmarshall/deckgl-typings)
// because it does not yet include typings. In addition to importing those types, this files is used
// to export types that are missing or not yet implemented by deckgl-typings.
import * as DeckTypings from "@danmarshall/deckgl-typings";
import * as DeckCartoTypings from "@danmarshall/deckgl-typings/deck.gl__carto";
declare module "deck.gl" {
  export namespace DeckTypings {}
}

declare module "@deck.gl/carto" {
  export namespace DeckCartoTypings {}
  export { default as CartoLayer } from "@deck.gl/carto/layers/carto-layer";
  export { API_VERSIONS, MAP_TYPES } from "@deckgl/carto/api/maps-api-common";
}
