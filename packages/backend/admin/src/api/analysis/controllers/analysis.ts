//TODO move to analysis-results
import { Strapi } from "@strapi/strapi";
import { Context, Request } from "koa";
import { rrrcnServicesClient } from "@rrrcn/admin/src/rrrcn-services-client";
import { StrapiApi } from "@rrrcn/common-types/admin/api/gis";
import { Result } from "@rrrcn/common-types/strapi/models/Result";
import { GisDataExportControllers } from "@rrrcn/admin/src/core-impl/gis/controllers/data-export";

const { PassThrough } = require("stream");
const gisExtractDataController = new GisDataExportControllers();
const analysisServices = {
  data: gisExtractDataController.extractData,
  "random-forest": rrrcnServicesClient.randomForest.bind(rrrcnServicesClient),
  population:
    rrrcnServicesClient.populationEstimation.bind(rrrcnServicesClient),
  migrations: "",
  survival: rrrcnServicesClient.estimateNestSurvival.bind(rrrcnServicesClient),
  maxent: rrrcnServicesClient.maxent.bind(rrrcnServicesClient),
  vulnerability:
    rrrcnServicesClient.vulnerabilityCalculation.bind(rrrcnServicesClient),
  ["habitat-area-vulnerability"]:
    rrrcnServicesClient.habitatAreaOverallVulnerabilityController.bind(
      rrrcnServicesClient
    ),

  ["data-selection-correlation"]:
    rrrcnServicesClient.dataSelectionCorrelation.bind(rrrcnServicesClient),
  ["data-selection-t-test"]:
    rrrcnServicesClient.dataSelectionTTest.bind(rrrcnServicesClient),
  ["data-selection-normal"]:
    rrrcnServicesClient.dataSelectionNormalTest.bind(rrrcnServicesClient),
  ["data-selection-moran"]:
    rrrcnServicesClient.dataSelectionMoranTest.bind(rrrcnServicesClient),
  ["grid-vulnerability"]:
    rrrcnServicesClient.vulnerabilityCalculation.bind(rrrcnServicesClient),
};
module.exports = ({ strapi }: { strapi: Strapi }) => ({
  async processAnalysis(
    ctx: Context & {
      request: Request & { fullBody: StrapiApi.PostAnalysis.Body };
    }
  ) {
    const user = ctx.state.user;
    const resultService = strapi.service("api::analysis.results");

    const { config, type } = ctx.request.fullBody;

    const resultEntity: Result =
      await resultService.startProcessingAnalysisRequest({
        type,
        user,
      });
    const { id: resultId, uid: resultUID } = resultEntity;
    ctx.body = resultEntity;
    resultStreams[resultId] = new PassThrough();
    strapi.service("api::analysis.results").processServiceAndStreamResults({
      service: analysisServices[type],
      strapi,
      config,
      stream: resultStreams[resultId],
      ctx,
      resultId,
      user,
    });
  },
  async getAvailableScripts(ctx) {
    return rrrcnServicesClient.getAvailableScripts();
  },
});
