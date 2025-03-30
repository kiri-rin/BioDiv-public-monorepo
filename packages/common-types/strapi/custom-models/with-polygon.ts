import { Feature, MultiPolygon, Polygon } from "geojson";

export type WithPolygon<Type> = Omit<Type, "polygon"> & {
  polygon: Feature<Polygon | MultiPolygon>;
};
