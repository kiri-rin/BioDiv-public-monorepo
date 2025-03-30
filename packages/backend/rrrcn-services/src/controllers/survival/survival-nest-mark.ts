import axios from "axios";
import fs from "fs";
import { writeFile } from "fs/promises";
import FormData from "form-data";
import { ServicesSurvivalApi } from "@rrrcn/common-types/services/api/survival";

const apiRService = axios.create({
  baseURL: process.env.R_BASE_URL || "http://localhost:8000",
});
export const estimateNestSurvival = async (
  config: ServicesSurvivalApi.PostNestSurvival.Body
) => {
  const form = new FormData();
  form.append("data", fs.readFileSync(config.survivalFile).toString());
  try {
    const { data } = await apiRService.post("/survival", form, {
      params: {
        output: config.outputs,
        nocc: String(config.nocc),
      },
      headers: form.getHeaders(),
    });
    config.outputs &&
      (await writeFile(
        `${config.outputs}/result.json`,
        JSON.stringify(data, null, 4)
      ));
    return data;
  } catch (e) {
    console.log("ERROR IN DISTANCE");
    console.log(e);
    throw "Error in Distance service";
  }
};
