// @ts-ignore
import jStat from "jstat";

function mean(data: number[]) {
  return data.reduce((sum, value) => sum + value, 0) / data.length;
}

function variance(data: number[]) {
  const m = mean(data);
  return (
    data.reduce((sum, value) => sum + Math.pow(value - m, 2), 0) /
    (data.length - 1)
  );
}

export function tTestService(data1: number[], data2: number[]) {
  const mean1 = mean(data1);
  const mean2 = mean(data2);
  const var1 = variance(data1);
  const var2 = variance(data2);
  const n1 = data1.length;
  const n2 = data2.length;

  const tStatistic = (mean1 - mean2) / Math.sqrt(var1 / n1 + var2 / n2);

  const degreesOfFreedom = n1 + n2 - 2; // Степени свободы

  // Получаем p-значение на основе t-статистики
  const pValue =
    2 * (1 - jStat.studentt.cdf(Math.abs(tStatistic), degreesOfFreedom));
  return { tStatistic, pValue, mean1, mean2, var1, var2 };
}
