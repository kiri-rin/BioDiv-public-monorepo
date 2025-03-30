import { sampleCorrelation } from "simple-statistics";

export type CorrelationsServiceArgs = {
  data: { label: string; values: number[] }[];
};
export const CorrelationsService = ({ data }: CorrelationsServiceArgs) => {
  const numOfDatasets = data.length;
  const correlationMatrix: number[][] = Array.from(
    { length: data.length },
    () => Array(numOfDatasets).fill(0)
  );
  data.forEach(({ label, values }, i, arr) => {
    const normValues = normalize(values);
    arr.forEach(({ label: _label, values: _values }, j) => {
      const _normValues = normalize(_values);

      correlationMatrix[i][j] = sampleCorrelation(normValues, _normValues);
    });
  });

  return correlationMatrix;
};
const normalize = (values: number[]) => {
  const norm = Math.sqrt(values.reduce((acc, cur) => acc + cur * cur, 0));
  return values.map((it) => (norm ? it / norm : 0));
};
