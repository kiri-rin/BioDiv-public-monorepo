export const getUncorrelatedVariables = (
  corrMatrix: number[][],
  tTest: number[],
  threshold: number
) => {
  const correlated: number[] = [];
  const uncorrelated: number[] = [];
  corrMatrix.forEach((row, i) => {
    if (uncorrelated.includes(i) || correlated.includes(i)) {
      return;
    }
    const correlatedIndices = row
      .map((corr, j) => [corr, j])
      .filter(([corr]) => Math.abs(corr) >= threshold)
      .map(([_, j]) => j)
      .filter((j) => !correlated.includes(j))
      .slice()
      .sort((a, b) => tTest[a] - tTest[b]);
    if (correlatedIndices.length > 0) {
      uncorrelated.push(correlatedIndices[0]);
      correlatedIndices.length > 1 &&
        correlated.push(...correlatedIndices.slice(1));
    } else {
      uncorrelated.push(i);
    }
  });
  return { correlated, uncorrelated };
};
