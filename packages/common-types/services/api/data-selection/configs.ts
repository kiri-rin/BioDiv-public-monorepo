import {
  CommonConfig,
  GeometriesImportConfig,
} from "@rrrcn/common-types/services/api/common-body";

export type CorrelationConfig<FileType = string> = {
  correlationThreshold: number;
  data: CorrelationDataConfig<FileType>;
  ttest: FileType;
} & CommonConfig;
export type TTestConfig<FileType = string> = {
  data: TTestDataConfig<FileType>;
} & CommonConfig;
export type NormalConfig<FileType = string> = {
  data: FileType;
} & CommonConfig;

export type MoranConfig<FileType = string> = {
  points: GeometriesImportConfig<FileType>;
  areas: GeometriesImportConfig<FileType>;
} & CommonConfig;
export type CorrelationDataConfig<FileType = string> =
  | CorrelationAllDataConfig<FileType>
  | CorrelationSplitDataConfig<FileType>;
export type CorrelationAllDataConfig<FileType = string> = {
  type: "all";
  data: FileType;
  presence_key: string;
};
export type CorrelationSplitDataConfig<FileType = string> = {
  type: "split";
  presence: FileType;
  absence: FileType;
};

export type TTestDataConfig<FileType = string> =
  | TTestAllDataConfig<FileType>
  | TTestSplitDataConfig<FileType>;
export type TTestAllDataConfig<FileType = string> = {
  type: "all";
  data: FileType;
  presence_key: string;
};
export type TTestSplitDataConfig<FileType = string> = {
  type: "split";
  presence: FileType;
  absence: FileType;
};
export type NormalTestResult = {
  critical: number;
  score: number;
  res: boolean;
  pValue: number;
};
export type NormalTestVariables = {
  label: string;
  values: number[];
  lilliefors: NormalTestResult;
  kolmogorov: NormalTestResult;
}[];
