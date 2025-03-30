import { TrainingPoints } from "./common-body";
import {
  AssetImportConfig,
  CommonConfig,
  ComputedObjectImportConfig,
} from "../common-body";

export type ValidateClassifiedImageConfig<FileType = string> = {
  classified_image: AssetImportConfig | ComputedObjectImportConfig;
  validationPoints: TrainingPoints<FileType>;
} & CommonConfig;
