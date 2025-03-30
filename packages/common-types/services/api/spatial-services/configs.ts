import { GeometriesImportConfig } from "@rrrcn/common-types/services/api/common-body";

export type GeneralizeAreaPointsControllerArgs = {
  area?: GeoJSON.Polygon;
  points: GeometriesImportConfig;
  cellSide: number;
  outputs: string;
};
export type BuffersCentroidsDistancesControllerArgs = {
  config: GeometriesImportConfig;
  outputs?: string;
};
