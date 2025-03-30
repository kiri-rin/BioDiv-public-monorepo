import { ServicesDataSelectionApi } from "@rrrcn/common-types/services/api/data-selection";
import { parseDataCsv } from "./utils/pars-csv";
import { tTestService } from "../../services/statistics-services/t-test";
import { stringify } from "csv/sync";
import { writeFile } from "fs/promises";
import path from "path";

export const tTestController = async (
  config: ServicesDataSelectionApi.TTestApi.Body
): Promise<ServicesDataSelectionApi.TTestApi.Response> => {
  let presence: { label: string; values: number[] }[] = [];
  let absence: { label: string; values: number[] }[] = [];
  const res: ServicesDataSelectionApi.TTestApi.Response = [];
  const data_source = config.data;
  switch (data_source.type) {
    case "split": {
      presence = parseDataCsv(data_source.presence).data;
      absence = parseDataCsv(data_source.absence).data;
      break;
    }
    case "all": {
      const data = parseDataCsv(data_source.data).data;
      const presence_key_data = data.find(
        (it) => it.label === data_source.presence_key
      );
      presence = data.map((it) => {
        const values = it.values.filter(
          (val, index) => presence_key_data?.values[index]
        );
        return { ...it, values };
      });
      absence = data.map((it) => {
        const values = it.values.filter(
          (val, index) => !presence_key_data?.values[index]
        );
        return { ...it, values };
      });
      break;
    }
  }

  for (const { label, values: presence_values } of presence) {
    const { values: absence_values } =
      absence.find((it) => it.label === label) || {};
    if (!absence_values) {
      continue;
    }
    const ttest = tTestService(presence_values, absence_values);
    res.push({ label, ttest });
  }
  if (config.outputs) {
    await writeTTestCSV(res, path.resolve(config.outputs, "./ttest.csv"));
  }
  return res;
};
async function writeTTestCSV(
  ttestRes: ServicesDataSelectionApi.TTestApi.Response,
  output: string
) {
  const fields = [
    "mean1",
    "mean2",
    "var1",
    "var2",
    "tStatistic",
    "pValue",
  ] as (keyof ServicesDataSelectionApi.TTestApi.Response[number]["ttest"])[];
  const header = ["label", ...fields];
  const csv = [];
  csv.push(header);
  ttestRes.forEach(({ label, ttest }) => {
    csv.push([label, ...fields.map((it) => ttest[it])]);
  });
  const csvString = stringify(csv);
  await writeFile(output, csvString);
}
