import { ServicesExtractDataApiTypes } from "@rrrcn/common-types/services/api/extract-data";
import GeoJSON from "geojson";
import * as turf from "@turf/turf";
import nearestNeighborAnalysis from "@turf/nearest-neighbor-analysis";
import { importGeometriesGeojson } from "@rrrcn/services/src/utils/import-geometries-geojson";
import { rrrcnServicesClient } from "@rrrcn/admin/src/rrrcn-services-client";
import path from "path";

export class GisDataExportControllers {
  async extractData(
    body: ServicesExtractDataApiTypes.ExtractData.Body
  ): Promise<ServicesExtractDataApiTypes.ExtractData.Response> {
    const res: any = {};
    let points: GeoJSON.FeatureCollection<GeoJSON.Point>;
    if (body.random_points || body.background_points) {
      points = await importGeometriesGeojson(body.points);
    }
    if (body.random_points) {
      const polygon = turf.convex(points);
      const randomPoints = randomPointsOnPolygon(
        body.random_points.count,
        polygon.geometry
      );
      randomPoints.forEach((point, index) => {
        point.properties = {
          id: index,
          latitude: point.geometry.coordinates[1],
          longitude: point.geometry.coordinates[0],
        };
      });
      const randomPointsConfig: ServicesExtractDataApiTypes.ExtractData.Body = {
        ...body,
        points: { type: "geojson", json: turf.featureCollection(randomPoints) },
        outputs: path.join(body.outputs, "random_points"),
      };
      res.random = await rrrcnServicesClient.extractData(randomPointsConfig);
    }
    if (body.background_points) {
      const regionOfInterest: GeoJSON.Feature<GeoJSON.Polygon> = (
        await importGeometriesGeojson(body.background_points.region_of_interest)
      ).features[0];
      console.log(regionOfInterest);
      const {
        properties: {
          nearestNeighborAnalysis: { observedMeanDistance },
        },
      } = nearestNeighborAnalysis(points, { studyArea: regionOfInterest });
      const buffered = turf.buffer<GeoJSON.Point>(points, observedMeanDistance);
      const bufferedMultiPolygon = turf
        .combine(buffered)
        .features.find(
          (it) => it.geometry.type === "MultiPolygon"
        ) as GeoJSON.Feature<GeoJSON.MultiPolygon>;
      const insideCount = Math.round(
        body.background_points.count *
          body.background_points.percent_inside_buffers
      );
      const outsideCount = body.background_points.count - insideCount;
      const insidePoints = randomPointsOnPolygon(
        insideCount,
        bufferedMultiPolygon.geometry
      );
      const outsidePoints = randomPointsOnPolygon(
        outsideCount,
        regionOfInterest.geometry,
        bufferedMultiPolygon.geometry
      );
      const backgroundPoints = turf.featureCollection([
        ...outsidePoints,
        ...insidePoints,
      ]);
      backgroundPoints.features.forEach((point, index) => {
        point.properties = {
          id: index,
          latitude: point.geometry.coordinates[1],
          longitude: point.geometry.coordinates[0],
        };
      });

      const backgroundPointsConfig: ServicesExtractDataApiTypes.ExtractData.Body =
        {
          ...body,
          points: { type: "geojson", json: backgroundPoints },
          outputs: path.join(body.outputs, "background_points"),
        };
      res.backgroundPoints = await rrrcnServicesClient.extractData(
        backgroundPointsConfig
      );
    }
    res.presence = await rrrcnServicesClient.extractData(body);
    return res;
  }
}

function randomPointsOnPolygon(
  number: number,
  polygon: GeoJSON.Polygon | GeoJSON.MultiPolygon,
  exclude?: GeoJSON.Polygon | GeoJSON.MultiPolygon
): GeoJSON.Feature<GeoJSON.Point>[] {
  const points: GeoJSON.Feature<GeoJSON.Point>[] = [];
  const bbox = turf.bbox(polygon);
  const count = number;

  for (let i = 0; i <= count; i++) {
    if (i === count) {
      return points;
    }

    const point = turf.randomPoint(1, { bbox: bbox });

    if (turf.inside(point.features[0], polygon)) {
      if (exclude && turf.inside(point.features[0], exclude)) {
        i--;
      } else {
        points.push(point.features[0]);
      }
    } else {
      i = --i;
    }
  }
}
