import { Strapi } from "@strapi/strapi";
import type { AnalysisResult } from "@rrrcn/common-types/strapi/models/AnalysisResult";
import { ClassificationControllerResult } from "@rrrcn/common-types/services/api/classifications/common-response";
export interface AnalysisResultClassification extends AnalysisResult {
  analysis_data: ClassificationControllerResult;
}
export default function ({ strapi }: { strapi: Strapi }) {
  return {
    async createHabitatAreaDataFromAnalysisResult(
      entity: AnalysisResultClassification
    ) {
      for (const { polygon, meta } of entity.analysis_data.geojson_geometries) {
        await strapi.service("api::map.map-habitat-area").create({
          data: {
            analysis_result: entity.id,
            polygon,
            meta,
            publishedAt: null,
          },
        });
      }
    },
  };
}
