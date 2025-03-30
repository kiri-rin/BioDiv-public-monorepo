import { GenerateTracksResponse } from "./generate-tracks/response";
import { MigrationGenerationConfigType } from "./generate-tracks/config";

export namespace MigrationsApi {
  export namespace PostGenerateTracks {
    export type Params = {};
    export type Body = MigrationGenerationConfigType;
    export type Response = GenerateTracksResponse;
  }
}
