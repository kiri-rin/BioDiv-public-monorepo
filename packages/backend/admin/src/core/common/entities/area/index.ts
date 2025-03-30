import GeoJSON, { BBox } from "geojson";
import { bbox, bboxPolygon } from "@turf/turf";
import * as turf from "@turf/turf";

export class CommonArea {
  private _polygon: GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon>;
  private _bbox: BBox;
  get polygon() {
    return this._polygon;
  }
  set polygon(
    polygon: GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon>
  ) {
    this._polygon = polygon;
    this._bbox = bbox(this._polygon.geometry);
  }
  get bbox() {
    return this._bbox;
  }
  constructor(
    polygon: GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon>
  ) {
    this.polygon = polygon;
  }
  intersects(area: CommonArea): CommonArea | null {
    const intersection = turf.intersect(area.polygon, this._polygon);
    return intersection ? new CommonArea(intersection) : null;
  }
  area(): number {
    return turf.area(this._polygon);
  }
  insideBBOX(point: GeoJSON.Feature<GeoJSON.Point>) {
    return turf.inside(point, bboxPolygon(this._bbox)); //todo optimize?
  }
}

export interface CommonEntityWithArea {
  area: CommonArea;
}
