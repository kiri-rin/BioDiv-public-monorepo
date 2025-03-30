import { CommonArea } from "@rrrcn/admin/src/core/common/entities/area";
import * as turf from "@turf/turf";
import {
  IMapSpatialGrid,
  IMapSpatialGridDistrict,
  IMapSpatialGridCell,
} from "@rrrcn/admin/src/core/vulnerability-map/entities/spatial-grid";
import GeoJSON from "geojson";
import { MapSpatialGridDistrict } from "@rrrcn/common-types/strapi/custom-models/MapSpatialGridDistrict";
import { MapSpatialGridCell } from "@rrrcn/common-types/strapi/custom-models/MapSpatialGridCell";
import { MapSpatialGrid } from "@rrrcn/common-types/strapi/custom-models/MapSpatialGrid";

export class StrapiMapSpatialGrid implements IMapSpatialGrid<number> {
  private _area: CommonArea;
  private strapiGrid: MapSpatialGrid;
  private _isFulfilled: boolean;
  constructor(strapiSpatialGrid: MapSpatialGrid) {
    this._area = new CommonArea(
      turf.feature(
        strapiSpatialGrid.polygon as GeoJSON.Polygon | GeoJSON.MultiPolygon
      )
    );
    this.strapiGrid = strapiSpatialGrid;
  }
  get area() {
    return this._area; //TODO full copy
  }
  get id() {
    return this.strapiGrid.id;
  }
  get cellSize() {
    return this.strapiGrid.cell_size;
  }
  get title() {
    return this.strapiGrid.title;
  }
  get isFulfilled() {
    return this._isFulfilled;
  }
}

export class StrapiMapSpatialGridDistrict
  implements IMapSpatialGridDistrict<number>
{
  private _area: CommonArea;
  private spatialGridDistrict: MapSpatialGridDistrict;
  constructor(strapiDistrict: MapSpatialGridDistrict) {
    this._area = new CommonArea(
      turf.feature(
        strapiDistrict.polygon as GeoJSON.Polygon | GeoJSON.MultiPolygon
      )
    );
    this.spatialGridDistrict = strapiDistrict;
  }
  get area() {
    return this._area; //TODO full copy
  }
  get id() {
    return this.spatialGridDistrict.id;
  }
  get spatialGridId() {
    return this.spatialGridDistrict.map_spatial_grid.id;
  }
  get isIndexed() {
    return false;
  }
  get title() {
    return this.spatialGridDistrict.name;
  }
}

export class StrapiMapSpatialGridCell implements IMapSpatialGridCell<number> {
  private _area: CommonArea;
  private strapiCell: MapSpatialGridCell;
  constructor(strapiCell: MapSpatialGridCell) {
    this.strapiCell = strapiCell;
    this._area = new CommonArea(
      strapiCell.polygon as GeoJSON.Feature<
        GeoJSON.Polygon | GeoJSON.MultiPolygon
      >
    );
  }
  get area() {
    return this._area;
  }
  get id() {
    return this.strapiCell.id;
  }
}
