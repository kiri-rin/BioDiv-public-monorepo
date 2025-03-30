import { generalizeAreaPointsService } from "../../../services/spatial-services/generalize-area-points";
import * as turf from "@turf/turf";
import { FeatureCollection, Point } from "@turf/turf";
import { importGeometriesGeojson } from "../../../utils/import-geometries-geojson";
import { writeFile } from "fs/promises";
import { ServicesSpatialServicesApiTypes } from "@rrrcn/common-types/services/api/spatial-services";

export const generalizeAreaPointsController = async (
  args: ServicesSpatialServicesApiTypes.GeneralizeAreaPoints.Body
) => {
  const pointsCollection: FeatureCollection<Point, any> =
    await importGeometriesGeojson(args.points, "points");
  const points = args.area
    ? pointsCollection.features.filter((it) =>
        turf.booleanPointInPolygon(it, args.area!)
      )
    : pointsCollection.features;
  // for (let i = 0; i < points.length; i += 10000) {
  const res = await generalizeAreaPointsService({
    points: points,
    cellSide: args.cellSide,
  });
  console.log(res.length, "res length");
  await writeFile(
    `${args.outputs}/generalize_${args.cellSide}.json`,
    JSON.stringify(res, null, 4)
  );
  // }
  return res;
};
