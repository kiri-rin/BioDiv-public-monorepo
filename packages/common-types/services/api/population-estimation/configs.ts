import { GeometriesImportConfig } from "../common-body";

export type PopulationRandomGenerationConfigType<FileType = string> = {
  areas: GeometriesImportConfig<FileType>;
  regionOfInterest: GeometriesImportConfig<FileType>;
  points: GeometriesImportConfig<FileType>;
  seed?: number;
  outputs: string;
  presenceArea: GeometriesImportConfig<FileType>;
  validationSplit?: number;
  crossValidation?: number;
};
export type PopulationDistanceConfigType<FileType = string> = {
  distanceFile: FileType;
  densityFunction: "hn" | "hr";
  outputs?: string;
};
export type PopulationDensityType<FileType = string> = {
  densityFile: FileType;
  totalArea: number;
  outputs?: string;
};
export type Configs<FileType = string> = (
  | {
      type: "random-points";
      config: PopulationRandomGenerationConfigType<FileType>;
    }
  | {
      type: "distance";
      config: PopulationDistanceConfigType<FileType>;
    }
  | {
      type: "density";
      config: PopulationDensityType<FileType>;
    }
) & { outputs?: string };
