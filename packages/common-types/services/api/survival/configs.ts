export type SurvivalNestConfig<FileType = string> = {
  survivalFile: FileType;
  nocc: number;
  outputs?: string;
};
