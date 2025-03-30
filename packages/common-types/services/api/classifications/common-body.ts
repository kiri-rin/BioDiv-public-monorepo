import {
  AssetImportConfig,
  CommonScriptParams,
  ComputedObjectImportConfig,
  GeometriesImportConfig,
  ScriptConfig,
  scriptKey,
} from "../common-body";

export type RandomForestParamsConfig =
  | AssetImportConfig
  | ComputedObjectImportConfig
  | {
      type: "scripts";
      defaultScriptParams?: CommonScriptParams;
      scripts: (ScriptConfig | scriptKey)[];
    };
export type SeparateTrainingPoints<FileType = string> = {
  type: "separate-points";
  absencePoints?: GeometriesImportConfig<FileType>;
  presencePoints: GeometriesImportConfig<FileType>;
};
export type AllTrainingPoints<FileType = string> = {
  type: "all-points";
  allPoints: {
    points: GeometriesImportConfig<FileType>;
    presenceProperty?: string;
  };
};
export type TrainingPoints<FileType> =
  | AllTrainingPoints<FileType>
  | Required<SeparateTrainingPoints<FileType>>;
