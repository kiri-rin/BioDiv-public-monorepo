import { MaxentConfig } from "./maxent";
import { ClassificationControllerResult } from "./common-response";
import { RandomForestConfig } from "./random-forest";

export namespace ClassificationApi {
  export namespace PostMaxent {
    export type Params = {};
    export type Body = MaxentConfig;
    export type Response = ClassificationControllerResult;
  }
  export namespace PostRandomForest {
    export type Params = {};
    export type Body = RandomForestConfig;
    export type Response = ClassificationControllerResult;
  }
}
