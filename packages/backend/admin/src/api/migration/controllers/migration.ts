import { Strapi } from "@strapi/strapi";
import { Context, Request } from "koa";
import { MigrationGenerationConfigType } from "@rrrcn/common-types/services/api/migrations/generate-tracks/config";
import { rrrcnServicesClient } from "@rrrcn/admin/src/rrrcn-services-client";

const { PassThrough } = require("stream");

module.exports = ({ strapi }: { strapi: Strapi }) => ({
  async generateTracks(
    ctx: Context & {
      request: Request & { body: MigrationGenerationConfigType };
    }
  ) {
    const resultService = strapi.service("api::result.result");

    const config = ctx.request.body;
    const { id: resultId, uid: resultUID } = await resultService.create({
      data: {
        status: "processing",
        type: "migration",
      },
    });
    resultStreams[resultId] = new PassThrough();
    return strapi
      .service("api::analysis.results")
      .processServiceAndStreamResults({
        service: rrrcnServicesClient.generateMigrationTracks,
        strapi,
        config,
        stream: resultStreams[resultId],
        ctx,
        resultId,
        user: ctx.state.user,
      });
  },
});
