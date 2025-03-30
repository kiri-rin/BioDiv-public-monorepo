import { EEFeature, EEFeatureCollection } from "../../types";
import { evaluatePromisify } from "../../utils/ee-image";
import { featureCollection } from "@turf/helpers";

export type GenerateRandpomPointsArgs = {
  count: number;
  area: EEFeature;
};
export const generateRandomPoints = async ({
  count,
  area,
}: GenerateRandpomPointsArgs): Promise<
  GeoJSON.FeatureCollection<GeoJSON.Point>
> => {
  const chunkSize = 4000;
  const allPoints = [];
  for (let i = 0; i * chunkSize <= count; i++) {
    const countToGenerate = Math.min(count - i * chunkSize, chunkSize);
    const generated = await evaluatePromisify(
      ee.FeatureCollection.randomPoints(area, countToGenerate)
    );
    allPoints.push(...generated.features);
  }
  return featureCollection(allPoints);
};
