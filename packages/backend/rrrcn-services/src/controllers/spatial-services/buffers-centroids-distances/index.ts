import { importGeometriesGeojson } from "../../../utils/import-geometries-geojson";
import {
  buffersCentroidsDistancesService,
  BuffersCentroidsDistancesServiceArgs,
} from "../../../services/spatial-services/buffers-centroids-distances";
import { FeatureCollection, Polygon } from "@turf/helpers";
import { ServicesSpatialServicesApiTypes } from "@rrrcn/common-types/services/api/spatial-services";

export const buffersCentroidsDistancesController = async (
  args: ServicesSpatialServicesApiTypes.BuffersCentroidsDistances.Body
) => {
  const geojson = await importGeometriesGeojson(args.config);

  // TODO validate
  (geojson as FeatureCollection<Polygon, any>).features.forEach((it) => {
    if (!it.properties) {
      it.properties = {};
    }
    it.properties.date_string = (it.properties.SOURCETHM as string)
      .split("kernel-")[1]
      .split(".shp")[0];
    it.properties.id = it.properties.AUTO_ID;
    it.properties.probability = it.properties.PROBABILIT;
  });
  return await buffersCentroidsDistancesService({
    buffers:
      geojson as unknown as BuffersCentroidsDistancesServiceArgs["buffers"],
  });
};
