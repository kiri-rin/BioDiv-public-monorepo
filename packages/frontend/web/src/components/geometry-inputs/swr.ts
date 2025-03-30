import { GeoJSON } from "geojson";
import { GeometryInputConfig } from "@/components/geometry-inputs/geometry-input";
import useSWR from "swr";
import { importGeometriesGeojson } from "@/components/geometry-inputs/utils";
export type GeometryInputGeojsonKeyType = [
  string, //key
  GeometryInputConfig, //config
  "points" | "polygon"
];
export const GeometryInputGeojsonFetcher = async ([
  key,
  config,
  type,
]: GeometryInputGeojsonKeyType): Promise<GeoJSON> => {
  return await importGeometriesGeojson(config, type);
};
export const useGeometryInputGeojson = (
  config: GeometryInputConfig,
  type: "points" | "polygon" = "points"
) => {
  return useSWR(
    [`geometryInputGeojson`, config, type],
    GeometryInputGeojsonFetcher,
    {
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      shouldRetryOnError: () => false,
    }
  );
};
