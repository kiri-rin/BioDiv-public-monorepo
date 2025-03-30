import { AnalysisBodyType } from "@rrrcn/common-types/admin/api/gis/analysis";
import { Result } from "@rrrcn/common-types/strapi/models/Result";

export namespace StrapiApi {
  export namespace PostAnalysis {
    export type Body = AnalysisBodyType;
    export type Response = Result;
    export type Params = NonNullable<unknown>;
  }
}
