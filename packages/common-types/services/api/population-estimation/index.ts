import {
  Configs,
  PopulationDensityType,
  PopulationDistanceConfigType,
  PopulationRandomGenerationConfigType,
} from "./configs";

export namespace PopulationEstimationApi {
  export namespace PostGeneratePointsEstimate {
    export type Params = {};
    export type Body<FileType = string> =
      PopulationRandomGenerationConfigType<FileType>;
    export type Response = {};
  }
  export namespace PostDistanceEstimate {
    export type Params = {};
    export type Body<FileType = string> =
      PopulationDistanceConfigType<FileType>;
    export type Response = {};
  }
  export namespace PostDensityEstimate {
    export type Params = {};
    export type Body<FileType = string> = PopulationDensityType<FileType>;
    export type Response = {};
  }
  export namespace PostEstimate {
    export type Params = {};
    export type Body<FileType = string> = Configs<FileType>;
    export type Response = {};
  }
}
