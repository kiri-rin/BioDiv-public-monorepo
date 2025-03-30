import { readFileSync } from "fs";
import { parse } from "csv-parse/sync";

export function parseDataCsv(filePath: string): {
  data: { label: string; values: number[] }[];
} {
  const csvFile = readFileSync(filePath).toString();
  const csv = parse(csvFile);
  const header: string[] = csv[0];
  const data: { label: string; values: number[] }[] = [];
  header.forEach((it: any, index) => {
    // if (!["id", "longitude", "latitude"].includes(it)) {
    const values = csv
      .slice(1)
      .map((_it: any) => Number(String(_it[index]).replace(",", ".")));
    data.push({ label: it, values });
    // }
  });
  return { data };
}
