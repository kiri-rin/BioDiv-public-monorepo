import { importGeometriesGeojsonCreator } from "@rrrcn/frontend-helpers/src/geometry/parsers";
import { parse } from "csv-parse/browser/esm/sync";
import { parseZip } from "shpjs";
import { featureCollection } from "@turf/turf";
export const importGeometriesGeojson = importGeometriesGeojsonCreator<
  File | undefined,
  File | undefined
>(
  async (file: File | undefined) => {
    console.log(await file?.text());
    return Promise.resolve(file);
  },
  async (file, ...args) => parse((await file?.text()) || "", ...args),
  async (base) => {
    if (!base) {
      return Promise.resolve(featureCollection([]));
    }
    console.log("TRYING TO PARSE SHP", Buffer);
    const res = await parseZip(await base?.arrayBuffer()!);
    console.log({ res });
    return res;
  },
  async (file) => {
    const text = await file?.text();
    return JSON.parse(text || "");
  }
);
