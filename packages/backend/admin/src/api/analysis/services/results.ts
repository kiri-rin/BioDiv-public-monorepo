import { extractData } from "@rrrcn/services/src/controllers/extract-data/extract-data";
import { Strapi } from "@strapi/strapi";
import fs from "fs";
import { addMinutes } from "../../utils";
const archiver = require("archiver");

module.exports = ({ strapi }: { strapi: Strapi }) => ({
  async processServiceAndStreamResults<
    T extends (...args) => any = typeof extractData
  >({
    service,
    strapi,
    resultId,
    config,
    ctx,
    stream,
    user,
  }: {
    strapi: Strapi;
    ctx;
    service: T;
    config: Parameters<T>[0];
    resultId: string;
    stream;
    user;
  }): Promise<Awaited<ReturnType<T>>> {
    const resultService = strapi.service("api::result.result");
    let logs = "";
    const tempFolderPath = resultService.getResultFolder(resultId);

    try {
      const logsFileStream = fs.createWriteStream(tempFolderPath + "/logs.txt");
      stream.pipe(logsFileStream);
      fs.mkdirSync(tempFolderPath, { recursive: true });
      const archive = archiver("zip", {
        zlib: { level: 9 }, // Sets the compression level.
      });

      ctx.state.logger = (...args: any[]) => {
        resultStreams[resultId].write(
          //TODO find out how it works in strapi
          "data: " + args.map((it) => it.toString()).join(" ") + "\n\n"
        );
        logs += args.map((it) => it.toString()).join(" ") + "\n\n";
      };
      return await service({
        ...config,
        outputs: tempFolderPath,
      })
        .then((res) => {
          const output = fs.createWriteStream(tempFolderPath + `.zip`);
          output.on("close", function () {
            stream.end("id: success\ndata: success \n\n");
          });
          archive.on("error", function (err) {
            console.error({ err });
            throw err;
          });
          archive.on("end", async () => {
            fs.rmSync(tempFolderPath, { recursive: true });
            console.log({ res }, "FINISH");
            await this.completeProcessingAnalysisRequest({
              resultId,
              analysis_data: res,
              logs,
              user,
            });
          });

          archive.pipe(output);
          archive.directory(tempFolderPath, false);
          archive.finalize();
          return res;
        })
        .catch(async (e) => {
          console.log(e);
          logs += e;
          await this.errorProcessingAnalysisRequest({
            resultId,
            logs,
            user,
          });
          stream.end(`id: error\ndata: ${e} \n\n`);
        });
    } catch (e) {
      fs.rmSync(tempFolderPath, { recursive: true });
      logs += e;
      await this.errorProcessingAnalysisRequest({
        resultId,
        logs,
        user,
      });
      stream.end(`id: error\ndata: ${e} \n\n`);
    }
  },
  async startProcessingAnalysisRequest({ user, type }) {
    const resultService = strapi.service("api::result.result");

    return await resultService.create({
      data: {
        status: "processing",
        type,
        user: user?.id || null,
      },
    });
  },
  async completeProcessingAnalysisRequest({
    resultId,
    analysis_data,
    logs,
    user,
  }) {
    const resultService = strapi.service("api::result.result");
    const finishedResultService = strapi.service(
      "api::analysis-result.analysis-result"
    );
    const finished_at = new Date();
    const expires_at = user?.result_expires_hours_default //TODO extract common between error and complete
      ? addMinutes(
          finished_at,
          user.result_expires_hours_default * 60
        ).toISOString()
      : null;

    let { type } = await resultService.update(resultId, {
      data: {
        status: "completed",
        finished_at: finished_at.toISOString(),
        expires_at: expires_at,

        logs,
      },
    });
    if (type === "maxent" || type === "random-forest") {
      type = "classification";
    }
    await finishedResultService.create({
      data: {
        analysis_data,
        analysis_type: type,
        finished_at: finished_at.toISOString(),
        expires_at: expires_at,
        users_result: resultId,
        // spatial_grid_cell: analysis_data?.meta?.spatial_grid_cell,
      },
    });
  },
  async errorProcessingAnalysisRequest({ resultId, logs, user }) {
    const resultService = strapi.service("api::result.result");
    const finished_at = new Date();
    const expires_at = user?.result_expires_hours_default
      ? addMinutes(
          finished_at,
          user.result_expires_hours_default * 60
        ).toISOString()
      : null;
    await resultService.update(resultId, {
      data: {
        status: "error",

        finished_at: finished_at.toISOString(),
        expires_at: expires_at,
        logs,
      },
    });
  },
});
