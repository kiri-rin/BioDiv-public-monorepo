import { importGeojsonPointsFromCsv, importGeojsonPolygonFromCsv } from "./csv";
import { featureCollection } from "@turf/turf";
import { FeatureCollectionWithFilename } from "shpjs";
import { GeometriesImportConfig } from "@rrrcn/common-types/services/api/common-body";

type JSCSVTable = { [colName: string]: any }[];

export const importGeometriesGeojsonCreator = <FileType, FileDataType>(
  readFile: (file: FileType) => Promise<FileDataType>,
  parseCsv: (input: FileDataType, options?: any) => Promise<JSCSVTable>,
  shpParse: (
    base: FileDataType,
    whiteList?: readonly string[]
  ) => Promise<FeatureCollectionWithFilename | FeatureCollectionWithFilename[]>,
  parseJSON: (fileData: FileDataType) => Promise<JSON>
) =>
  async function importGeometriesGeojson(
    conf: GeometriesImportConfig<FileType>,
    geometryType: "points" | "polygon" = "points",
    inheritProps = [] as string[]
  ): Promise<any> {
    // | GeoJSON.FeatureCollection
    // | GeoJSON.FeatureCollection[]
    // | GeoJSON.Feature
    // | undefined
    switch (conf.type) {
      case "csv": {
        const pointsFile = await readFile(conf.path);
        const pointsParsed = await parseCsv(pointsFile, {
          delimiter: ",",
          columns: true,
        });
        console.log({ pointsParsed });
        return (
          geometryType === "polygon"
            ? importGeojsonPolygonFromCsv
            : importGeojsonPointsFromCsv
        )({
          csv: pointsParsed,
          lat_key: conf.latitude_key,
          long_key: conf.longitude_key,
          id_key: conf.id_key,
          inheritProps,
        });
      }
      case "shp": {
        const shapeBuffer = await readFile(conf.path);
        return await shpParse(shapeBuffer);
      }
      case "geojson": {
        const fc = featureCollection(
          conf.json?.features.map((it, index) => ({
            ...it,
            id: String(it.id) || index,
            properties: { ...it.properties, id: it.id || index },
          })) || []
        );
        return fc;
      }
      case "geojson_file": {
        if (!conf.path) {
          return null;
        }
        const json = await parseJSON(await readFile(conf.path));
        console.log({ json });
        return importGeometriesGeojson(
          //@ts-ignore
          { type: "geojson", json },
          geometryType,
          inheritProps
        );
      }
    }
  };
