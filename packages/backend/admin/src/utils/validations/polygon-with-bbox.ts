import { errors } from "@strapi/utils";
import * as turf from "@turf/turf";
import GeoJSON, {
  Feature,
  FeatureCollection,
  GeometryCollection,
  Polygon,
} from "geojson";
import { MultiPolygon } from "@turf/turf";
const { ApplicationError } = errors;
export type EntityWithPolygon = {
  polygon?: Feature<Polygon | MultiPolygon, any>;
  bbox_left?: number;
  bbox_right?: number;
  bbox_top?: number;
  bbox_bottom?: number;
};
export type EntityWithPolygonOrFC = Omit<EntityWithPolygon, "polygon"> & {
  polygon?:
    | Feature<Polygon | MultiPolygon | GeometryCollection, any>
    | FeatureCollection<Polygon, any>;
};
export function validateAndFulfillPolygonWithBbox(
  entity: EntityWithPolygonOrFC,
  required?: boolean
) {
  if (
    !entity?.polygon &&
    !(
      entity.bbox_left &&
      entity.bbox_right &&
      entity.bbox_top &&
      entity.bbox_bottom
    )
  ) {
    if (required) {
      throw new ApplicationError("polygon or bbox is required");
    }
    return;
  }
  if (entity?.polygon) {
    try {
      console.log(entity.polygon);
      entity.polygon = (
        entity?.polygon.type !== "FeatureCollection"
          ? entity.polygon?.geometry?.type === "GeometryCollection"
            ? turf
                .combine(
                  turf.featureCollection(
                    entity.polygon.geometry.geometries
                      .filter(
                        (it) =>
                          it.type === "Polygon" || it.type === "MultiPolygon"
                      )
                      .map((it: GeoJSON.Polygon | GeoJSON.MultiPolygon) =>
                        turf.feature(it)
                      )
                  )
                )
                .features.find((it) => it.geometry.type === "MultiPolygon")
            : entity.polygon
          : turf
              .combine(entity.polygon)
              .features.find((it) => it.geometry.type === "MultiPolygon")
      ) as Feature<Polygon | MultiPolygon, any>;
      const polygon = entity.polygon;

      const bbox = turf.bbox(polygon);
      entity.bbox_left = bbox[0];
      entity.bbox_bottom = bbox[1];
      entity.bbox_right = bbox[2];
      entity.bbox_top = bbox[3];
    } catch (e) {
      console.error(e);
      throw new ApplicationError("Invalid polygon");
    }
  } else {
    try {
      entity.polygon = turf.bboxPolygon([
        entity.bbox_left,
        entity.bbox_bottom,
        entity.bbox_right,
        entity.bbox_top,
      ]);
    } catch (e) {
      throw new ApplicationError("Invalid bbox");
    }
  }
}
