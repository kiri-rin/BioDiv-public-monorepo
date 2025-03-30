import ss from "simple-statistics";
import { cdfNormal, kolmogorovPValue } from "./utils";

export function lillieforsTest(data: number[]) {
  const n = data.length;
  const mean = ss.mean(data);
  const stdDev = ss.standardDeviation(data);

  const sortedData = data.slice().sort((a, b) => a - b);

  const dMax = Math.max(
    ...sortedData.map((value, index) => {
      const empiricalCdf = (index + 1) / n;
      const theoreticalCdf = cdfNormal((value - mean) / stdDev);
      return Math.max(
        Math.abs(empiricalCdf - theoreticalCdf),
        Math.abs(index / n - theoreticalCdf)
      );
    })
  );

  // Критическое значение для уровня значимости 0.05
  const criticalValue = 0.886 / Math.sqrt(n);
  const pValue = kolmogorovPValue(dMax, n);

  return {
    critical: criticalValue,
    score: dMax,
    res: dMax < criticalValue,
    pValue,
  };
}
