import { featureCollection, point, polygon } from "@turf/helpers";
import { parse as parseDate } from "date-fns";
type JSCSVTable = { [colName: string]: any }[];
export const importGeojsonPolygonFromCsv = ({
  csv,
  lat_key = "latitude",
  long_key = "longitude",
  inheritProps = [],
}: {
  csv: JSCSVTable;
  lat_key?: string;
  long_key?: string;
  id_key?: string;
  inheritProps?: string[];
}) => {
  const coordinates = csv.map((row: any) => [
    Number(row[long_key]),
    Number(row[lat_key]),
  ]);
  if (
    coordinates[0][0] === coordinates[coordinates.length - 1][0] &&
    coordinates[0][1] === coordinates[coordinates.length - 1][1]
  ) {
    coordinates.pop();
  }
  console.log({ coordinates });

  return {
    type: "Feature",
    geometry: { type: "Polygon", coordinates: [coordinates] },
  };
};

export function importGeojsonPointsFromCsv({
  csv,
  lat_key = "latitude",
  long_key = "longitude",
  id_key = "id",
  inheritProps = [],
}: {
  csv: JSCSVTable;
  lat_key?: string;
  long_key?: string;
  id_key?: string;
  inheritProps?: string[];
  inheritStringProps?: string[];
}) {
  return featureCollection(
    csv.map((row: any) =>
      point([Number(row[long_key]), Number(row[lat_key])], {
        ...Object.entries(row).reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {} as any),
        id: row[id_key],
        longitude: row[long_key],
        latitude: row[lat_key],
        ...(row.date && {
          date: parseDate(row.date + " Z", "dd.MM.yyyy k:mm X", new Date()),
        }),
        ...inheritProps?.reduce((acc, key) => {
          acc[key] = Number(row[key]);
          return acc;
        }, {} as any),
      })
    )
  );
}
