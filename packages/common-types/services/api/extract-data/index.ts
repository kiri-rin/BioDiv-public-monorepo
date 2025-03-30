import { DataExtractionConfig } from "@rrrcn/common-types/services/api/common-body";

export namespace ServicesExtractDataApiTypes {
  export namespace ExtractData {
    export type Body = DataExtractionConfig;
    export type Params = NonNullable<unknown>;
    export type Response = NonNullable<unknown>; //TODO add valid types
  }
}
