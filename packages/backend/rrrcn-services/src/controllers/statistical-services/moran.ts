import axios from "axios";
import { writeFile } from "fs/promises";
import { ServicesDataSelectionApi } from "@rrrcn/common-types/services/api/data-selection";
import { importGeometriesGeojson } from "../../utils/import-geometries-geojson";

const apiRService = axios.create({
  baseURL: process.env.R_BASE_URL || "http://localhost:8000",
});
export const moranTestController = async (
  config: ServicesDataSelectionApi.MoranApi.Body
) => {
  const points = await importGeometriesGeojson(config.points);
  const areas = await importGeometriesGeojson(config.areas);
  // console.log(points);
  // console.log(areas);
  // //@ts-ignore
  // delete points.filename;
  // //@ts-ignore
  // delete areas.filename;
  try {
    const { data } = await apiRService.post(
      "/moran",
      {
        points_geojson: JSON.stringify(points),
        areas_geojson: JSON.stringify(areas),
        output: config.outputs,
      },
      {
        params: {},
        headers: { "Content-Type": "application/json" },
      }
    );
    config.outputs &&
      (await writeFile(
        `${config.outputs}/result.json`,
        JSON.stringify(data, null, 4)
      ));
    return data;
  } catch (e) {
    console.log("ERROR IN R");
    console.log(e);
    throw "R service";
  }
};
