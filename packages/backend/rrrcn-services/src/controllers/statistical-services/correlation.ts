import { CorrelationConfig } from "@rrrcn/common-types/services/api/data-selection/configs";
import { CorrelationsService } from "../../services/statistics-services/correlations/correlations";
import { saveChart } from "../../services/charts";
import { getCorrelationChart } from "../../services/statistics-services/correlations-charts";
import { parseDataCsv } from "./utils/pars-csv";
import path from "path";
import { stringify } from "csv/sync";
import { writeFile } from "fs/promises";
import { getUncorrelatedVariables } from "../../services/statistics-services/correlations/filter-correlated";
import { readFileSync } from "fs";
import { parse } from "csv-parse/sync";

export const CorrelationsController = async (config: CorrelationConfig) => {
  const ttestFile = readFileSync(config.ttest).toString();
  const ttestCsv: string[][] = parse(ttestFile);
  const ttestValueIndex = ttestCsv[0].findIndex((it) => it === "pValue");
  const ttestLabelIndex = ttestCsv[0].findIndex((it) => it === "label");

  switch (config.data.type) {
    case "all": {
      const data = parseDataCsv(config.data.data);
      const labels = data.data.map((it) => it.label);

      const ttestValues = labels.map((label) =>
        Number(
          ttestCsv.find((it) => it[ttestLabelIndex] === label)?.[
            ttestValueIndex
          ] || 0
        )
      );

      const corrMatrix = CorrelationsService(data);
      if (config.outputs) {
        const { correlated, uncorrelated } = getUncorrelatedVariables(
          corrMatrix,
          ttestValues,
          config.correlationThreshold
        );

        await saveCorrData({
          _path: path.resolve(config.outputs, "."),
          uncorrelated,
          labels,
          correlated,
          corrMatrix,
        });
      }
      break;
    }
    case "split": {
      const absence = parseDataCsv(config.data.absence);
      const absenceLabels = absence.data.map((it) => it.label);

      const ttestAbsenceValues = absenceLabels.map((label) =>
        Number(
          ttestCsv.find((it) => it[ttestLabelIndex] === label)?.[
            ttestValueIndex
          ] || 0
        )
      );
      const presence = parseDataCsv(config.data.presence);
      const presenceLabels = presence.data.map((it) => it.label);
      const ttestPresenceValues = presenceLabels.map((label) =>
        Number(
          ttestCsv.find((it) => it[ttestLabelIndex] === label)?.[
            ttestValueIndex
          ] || 0
        )
      );
      const corrMatrixAbsence = CorrelationsService(absence);
      const corrMatrixPresence = CorrelationsService(presence);
      const { correlated: correlatedAbs, uncorrelated: uncorrelatedAbs } =
        getUncorrelatedVariables(
          corrMatrixAbsence,
          ttestAbsenceValues,
          config.correlationThreshold
        );
      const { correlated: correlatedPres, uncorrelated: uncorrelatedPres } =
        getUncorrelatedVariables(
          corrMatrixPresence,
          ttestPresenceValues,
          config.correlationThreshold
        );

      if (config.outputs) {
        await saveCorrData({
          _path: path.resolve(config.outputs, "./absence"),
          labels: absenceLabels,
          corrMatrix: corrMatrixAbsence,
          uncorrelated: uncorrelatedAbs,
          correlated: correlatedAbs,
        });
        await saveCorrData({
          _path: path.resolve(config.outputs, "./presence"),
          labels: presenceLabels,
          corrMatrix: corrMatrixPresence,
          uncorrelated: uncorrelatedPres,
          correlated: correlatedPres,
        });
      }
      break;
    }
  }
};
async function saveCorrData({
  _path,
  correlated,
  uncorrelated,
  labels,
  corrMatrix,
}: {
  corrMatrix: number[][];
  labels: string[];
  correlated: number[];
  uncorrelated: number[];
  _path: string;
}) {
  await saveCorrChart(corrMatrix, labels, path.resolve(_path, "corr.png"));
  await writeCorrMatrixCSV(corrMatrix, labels, path.resolve(_path, "corr.csv"));
  await writeVarsCSV(
    labels.filter((it, index) => correlated.includes(index)),
    path.resolve(_path, "corr_vars.csv")
  );
  await writeVarsCSV(
    labels.filter((it, index) => uncorrelated.includes(index)),
    path.resolve(_path, "uncorr_vars.csv")
  );
}
async function writeCorrMatrixCSV(
  correlationMatrix: number[][],
  labels: string[],
  path: string
) {
  const csv = [
    ["", ...labels],
    ...correlationMatrix.map((it, index) => [labels[index], ...it]),
  ];
  await writeFile(path, stringify(csv));
}
async function writeVarsCSV(labels: string[], path: string) {
  labels.length && (await writeFile(path, stringify(labels.map((it) => [it]))));
}
async function saveCorrChart(
  correlationMatrix: number[][],
  labels: string[],
  path: string
) {
  await saveChart(
    //@ts-ignore
    {
      chart: getCorrelationChart(
        correlationMatrix,
        //@ts-ignore

        labels
      ),
      width: labels.length * 60,
      height: labels.length * 30,
    },
    path
  );
}
