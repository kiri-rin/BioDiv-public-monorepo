export type scriptKey =
  | "elevation"
  | "geomorph"
  | "era5_monthly"
  | "era5_hourly"
  | "global_habitat"
  | "dynamic_world"
  | "dynamic_world_means"
  | "dynamic_world_mode"
  | "global_wind_atlas"
  | "world_clim_bio"
  | "evi"
  | "world_cover"
  | "ndvi"
  | "landsat"
  | "alos"
  | "world_cover_convolve";
export type CommonConfig = {
  outputs?: string;
};
export type CsvImportConfig<FileType = string> = {
  type: "csv";
  path: FileType;
  latitude_key?: string;
  longitude_key?: string;
  id_key?: string;
};
export type DateInterval = [Date, Date];
export type DatesConfig = { [key: string]: DateInterval[] };
export type CommonScriptParams = {
  buffer?: number;
  dates?: DatesConfig;
  outputs?: string;
  mode?: "MEAN" | "SUM";
  scale?: number;
};
export type ShpImportConfig<FileType = string> = {
  type: "shp";
  path: FileType;
};
export type AssetImportConfig = { type: "asset"; path: string };
export type GeojsonImportConfig = {
  type: "geojson";
  json: GeoJSON.FeatureCollection;
};
export type GeojsonFileImportConfig<FileType = string> = {
  type: "geojson_file";
  path: FileType;
};
export type ComputedObjectImportConfig = {
  type: "computedObject";
  object: any;
};
export type GeometriesImportConfig<FileType = string> =
  | {
      type:
        | "asset"
        | "shp"
        | "csv"
        | "computedObject"
        | "geojson"
        | "geojson_file";
    } & (
      | CsvImportConfig<FileType>
      | ShpImportConfig<FileType>
      | GeojsonFileImportConfig<FileType>
      | GeojsonImportConfig
      | AssetImportConfig
      | ComputedObjectImportConfig
    );
export type ImageImportConfig = AssetImportConfig | ComputedObjectImportConfig;
export type ScriptConfig = {
  key: scriptKey;
  filename?: string;
  bands?: string[];
} & CommonScriptParams;
export type DataExtractionConfig<FileType = string> = {
  points: GeometriesImportConfig<FileType>;
  absence_points?: {
    points: GeometriesImportConfig<FileType>;
  };
  background_points?: {
    count: number;
    percent_inside_buffers: number;
    region_of_interest: GeometriesImportConfig<FileType>;
  } | null;
  random_points?: {
    count: number;
    region_of_interest?: GeometriesImportConfig<FileType>;
  } | null;
  inOneFile?: string;
  defaultScriptParams?: CommonScriptParams;
  scripts: (ScriptConfig | scriptKey)[];
} & CommonConfig;

export type populationEstimationType = {
  latitude_key?: string;
  longitude_key?: string;
  id_key?: string;
  outputs: string;
  seed?: number;
  areasSHPZIPPath: string;
  regionOfInterestCsvPath: string;
  classified_image_id: string;
} & (
  | { pointsCsvPath: string; pointsSHPZIPPath?: undefined }
  | { pointsCsvPath?: undefined; pointsSHPZIPPath: string }
);
export type ImageOrGeometryAsset = {
  type: "asset";
  image?: boolean;
  path: string;
};

export type populationEstimationType2 = {
  outputs: string;
  seed?: number;
  points: GeometriesImportConfig;
  areas: GeometriesImportConfig;
  regionOfInterest: GeometriesImportConfig;
  classified_image: ImageImportConfig;
};
