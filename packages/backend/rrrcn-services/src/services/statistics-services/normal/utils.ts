import * as mathjs from "mathjs";

export function cdfNormal(x: number) {
  return (1 + mathjs.erf(x / Math.sqrt(2))) / 2;
}
export const kolmogorovPValue = (d: number, n: number) => {
  const z = Math.sqrt(n) * d;
  const sum =
    new Array(100000).fill(0).reduce((acc, it, index) => {
      const i = index + 1;
      return acc + 2 * Math.pow(-1, i) * mathjs.exp(-2 * i * i * z * z);
    }, 0) + 1;
  return 1 - sum;
};
