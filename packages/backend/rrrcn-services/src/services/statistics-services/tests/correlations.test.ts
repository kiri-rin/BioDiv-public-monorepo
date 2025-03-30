import { readFileSync } from "fs";
import { parse } from "csv-parse/sync";
import path from "path";
import { CorrelationsService } from "../correlations/correlations";
import { saveChart } from "../../charts";
import { getCorrelationChart } from "../correlations-charts";

it("", () => {
  const csvFile = readFileSync(
    path.resolve(__dirname, "./falco-dataset.csv")
  ).toString();
  const csv = parse(csvFile);
  const header: string[] = csv[0];
  const data: any[] = [];
  header.forEach((it: any, index) => {
    if (!["id", "longitude", "latitude"].includes(it)) {
      const values = csv.slice(1).map((_it: any) => Number(_it[index]));
      data.push({ label: it, values });
    }
  });
  //@ts-ignore
  const corr = CorrelationsService({ data });
  //@ts-ignore
  saveChart(
    //@ts-ignore
    {
      chart: getCorrelationChart(
        corr,
        //@ts-ignore

        header.filter((it: any, index) => {
          if (!["id", "longitude", "latitude"].includes(it)) {
            return true;
          }
        }) as string[]
      ),
      width: 4000,
      height: 2000,
    },
    "./chart.png"
  );
});
