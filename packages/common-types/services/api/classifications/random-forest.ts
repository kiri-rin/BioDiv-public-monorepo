import { CommonConfig, GeometriesImportConfig } from "../common-body";
import { RandomForestParamsConfig, TrainingPoints } from "./common-body";

export interface RandomForestConfig<FileType = string> extends CommonConfig {
  params: RandomForestParamsConfig;
  crossValidation?: number;
  regionOfInterest: GeometriesImportConfig<FileType>;
  trainingPoints: TrainingPoints<FileType>;
  classificationSplits?: number[];
  buffersPerAreaPoint?: number[];
  outputMode: "CLASSIFICATION" | "REGRESSION" | "PROBABILITY" | "MEAN";
  validation:
    | {
        type: "split";
        split: number;
        seed?: number;
        cross_validation?: boolean;
        render_mean?: boolean;
        render_best?: boolean;
        return_default?: "best" | "mean";
      }
    | {
        type: "external";
        points: TrainingPoints<FileType>;
      };
}
