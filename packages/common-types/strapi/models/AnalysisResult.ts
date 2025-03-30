import { Result } from "./Result";
import { Species } from "./Species";
import { Upload_File } from "./Upload_File";
export type AnalysisResult = {
  id: number;
  users_result: Result | null;
  analysis_type:
    | (
        | "data"
        | "population"
        | "survival"
        | "classification"
        | "migration"
        | "vulnerability"
        | "grid-vulnerability"
        | "habitat-area-vulnerability"
        | "data-selection-correlation"
        | "data-selection-t-test"
        | "data-selection-normal"
        | "data-selection-moran"
      )
    | null;
  analysis_data: object | null;
  admin_comment: string | null;
  parent_results: AnalysisResult[] | null;
  children_results: AnalysisResult[] | null;
  species: Species | null;
  expires_at: string | null;
  soure_files: Upload_File[] | null;
  result_files: Upload_File[] | null;
  dont_expires: boolean | null;
  createdAt: string | null;
  updatedAt: string | null;
  createdBy: any | null;
  updatedBy: any | null;
};
