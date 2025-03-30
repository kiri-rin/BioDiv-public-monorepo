import {
  BuffersCentroidsDistancesControllerArgs,
  GeneralizeAreaPointsControllerArgs,
} from "@rrrcn/common-types/services/api/spatial-services/configs";

export namespace ServicesSpatialServicesApiTypes {
  export namespace GeneralizeAreaPoints {
    export type Body = GeneralizeAreaPointsControllerArgs;
    export type Params = NonNullable<unknown>;
    export type Response = NonNullable<unknown>;
  }
  export namespace BuffersCentroidsDistances {
    export type Body = BuffersCentroidsDistancesControllerArgs;
    export type Params = NonNullable<unknown>;
    export type Response = NonNullable<unknown>;
  }
}
