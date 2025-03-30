import { GeoJSON } from "geojson";

export type GenerateTracksResponse = {
  generatedTracks: GeneratedTrack<GeoJSON.Point>[];
  indexedAreas: { [p: string]: IndexedArea };
  grid: GeoJSON.FeatureCollection<GeoJSON.Polygon, GeoJSON.GeoJsonProperties>;
};

export type GeneratedTrack<
  PointType extends GeoJSON.Point | null = GeoJSON.Point | null
> = {
  id: IdType;
  points: GeoJSON.FeatureCollection<PointType, TrackPointProperties>;
};
export type IndexedArea = {
  id: IdType;
  neighboursAreasIds: { [p in Directions]?: IdType };
  probabilities: AreaMigrationProbabilities;
  area: GeoJSON.BBox;
  isDeadEnd?: boolean;
  tracksCount: number;
  altitudeStatistics: { [p: string | number]: number };
};

export type IdType = number;

export type NextAreaToIndex = {
  id: IdType;
  points: {
    point: TrackPoint;
    from: Directions;
  }[];
};
export type TrackPointProperties = {
  trackId?: IdType;
  id?: IdType;
  areaId?: IdType;
  altitude?: number;
};
export type TrackPoint = GeoJSON.Feature<
  GeoJSON.Point | null,
  TrackPointProperties
>;

export type AreaMigrationProbabilities = {
  probabilities: { [p in Directions]: number };
  altitudes: { count: number; value: number }[];
  months: number[];
  total: number;
};
export enum Directions {
  TOP = "top",
  LEFT = "left",
  BOTTOM = "bottom",
  RIGHT = "right",
  STOP = "stop",
}
