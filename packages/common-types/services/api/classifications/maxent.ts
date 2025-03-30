import {
    CommonConfig,
    GeometriesImportConfig
} from "../common-body";
import {RandomForestConfig} from "./random-forest";
import {AllTrainingPoints, RandomForestParamsConfig, SeparateTrainingPoints} from "./common-body";

export interface MaxentConfig<FileType = string> extends CommonConfig {
    params: RandomForestParamsConfig;
    crossValidation?: number;
    backgroundCount?: number;
    regionOfInterest: GeometriesImportConfig<FileType>;
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
        | { type: "external"; points: RandomForestConfig["trainingPoints"] };
    trainingPoints:
        | AllTrainingPoints<FileType>
        | SeparateTrainingPoints<FileType>;
    classificationSplits?: number[];
    buffersPerAreaPoint?: number[];
}