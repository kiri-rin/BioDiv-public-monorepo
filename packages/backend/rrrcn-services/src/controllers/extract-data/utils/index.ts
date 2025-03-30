import { GeoJSON } from "geojson";
import * as turf from "@turf/turf";

export const generateRandomPoints = (
  count: number,
  points: GeoJSON.FeatureCollection<GeoJSON.Point>,
  _area?: GeoJSON.Polygon
) => {
  const area = _area || turf.convex(points);
  return turf.randomPoint(count);
};

export const generateBackgroundPoints = (
  count: number,
  points: GeoJSON.FeatureCollection<GeoJSON.Point>,
  _area?: GeoJSON.Polygon
) => {
  const area = _area || turf.convex(points);
  return turf.randomPoint(count);
};
