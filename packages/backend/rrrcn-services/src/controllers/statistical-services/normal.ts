import { ServicesDataSelectionApi } from "@rrrcn/common-types/services/api/data-selection";
import { parseDataCsv } from "./utils/pars-csv";
import { lillieforsTest } from "../../services/statistics-services/normal/lilliefors";
import { kolmogorovSmirnovTest } from "../../services/statistics-services/normal/kolmogorov";
import { NormalTestVariables } from "@rrrcn/common-types/services/api/data-selection/configs";
import { stringify } from "csv/sync";
import { writeFile } from "fs/promises";
import path from "path";

export const normalTestController = async (
  config: ServicesDataSelectionApi.NormalApi.Body
): Promise<ServicesDataSelectionApi.NormalApi.Response> => {
  const data = parseDataCsv(config.data).data;
  const normal = [];
  const notNormal = [];
  for (const { label, values } of data) {
    const lilliefors = lillieforsTest(values);
    const kolmogorov = kolmogorovSmirnovTest(values);
    if (lilliefors.res || kolmogorov.res) {
      normal.push({ label, values, lilliefors, kolmogorov });
    } else {
      notNormal.push({ label, values, lilliefors, kolmogorov });
    }
  }
  const res = { notNormal, normal };
  if (config.outputs) {
    await Promise.all([
      writeNormalTestVairablesCsv(
        normal,
        path.join(config.outputs, "normal.csv")
      ),
      writeNormalTestVairablesCsv(
        notNormal,
        path.join(config.outputs, "notNormal.csv")
      ),
    ]);
  }
  return res;
};

async function writeNormalTestVairablesCsv(
  vars: NormalTestVariables,
  output: string
) {
  const header = [
    "label",
    "komogorovStat",
    "kolmogorovCriticalValue",
    "kolmogorovRes",
    "kolmogorovPValue",
    "lillieforsStat",
    "lillieforsCriticalValue",
    "lillieforsRes",
    "lillieforsPValue",
  ];
  const csv = [header];
  vars.forEach(({ label, kolmogorov, lilliefors }) => {
    csv.push([
      label,
      String(kolmogorov.score),
      String(kolmogorov.critical),
      String(kolmogorov.res),
      String(kolmogorov.pValue),
      String(lilliefors.score),
      String(lilliefors.critical),
      String(lilliefors.res),
      String(lilliefors.pValue),
    ]);
  });
  await writeFile(output, stringify(csv));
}
