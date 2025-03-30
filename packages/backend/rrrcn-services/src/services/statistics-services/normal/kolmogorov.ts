import ss from "simple-statistics";
import { NormalTestResult } from "./index";
import { cdfNormal, kolmogorovPValue } from "./utils";

export function kolmogorovSmirnovTest(data: number[]): NormalTestResult {
  const n = data.length;
  const mean = ss.mean(data);
  const stdDev = ss.standardDeviation(data);

  // Преобразуем данные в z-оценки
  const zScores = data.map((x) => (x - mean) / stdDev).sort((a, b) => a - b);

  const dMax = Math.max(
    ...zScores.map((value, index) => {
      const cdf = cdfNormal(value);
      console.log("FNOrm", index, cdf);
      console.log("D+", index, (index + 1) / n - cdf);
      console.log("D-", index, -index / n + cdf);
      return Math.max((index + 1) / n - cdf, -index / n + cdf);
    })
  );

  // Критическое значение для уровня значимости 0.05
  const criticalValue = 1.36 / Math.sqrt(n);
  const pValue = kolmogorovPValue(dMax, n);

  return {
    critical: criticalValue,
    score: dMax,
    res: dMax < criticalValue,
    pValue,
  };
}
