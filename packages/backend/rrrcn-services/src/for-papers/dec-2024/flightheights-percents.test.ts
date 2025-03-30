import { withGEE } from "../../index";
import { getFeatures } from "../../utils/ee-image";
import { reduceRegionsFromImageOrCollection } from "../../utils/io";
import { elevationScript } from "../../services/ee-data/scripts/elevation";
import fs from "fs";
import { featureCollection } from "@turf/helpers";
import { GeoJSON } from "geojson";
import { distance } from "@turf/turf";
import { parse } from "date-fns";
it("", async () => {
  const bordalaytrack = require("./boralday212519-point-summer2-2024-natal.json");
  const umyt289 = require("./umyt289-point-summer2-2024.json");
  const ushkysh287 = require("./ushkysh287-points-summer2-2024-natal.json");
  ushkysh287.features = ushkysh287.features.reverse();
  bordalaytrack.features.forEach(
    //@ts-ignore

    (it) => {
      it.properties.dateTime = parse(
        it.properties.UTC_DATETI + " Z",
        "dd.MM.yyyy k:mm X",
        new Date()
      );
    }
  );

  ushkysh287.features.forEach(
    //@ts-ignore
    (it) => {
      it.properties.dateTime = parse(
        it.properties.TIMESTAMP + " Z",
        "yyyy-MM-dd kk:mm:ss X",
        new Date()
      );
    }
  );
  const bordalaytrackflightLocations = bordalaytrack.features.filter(
    //@ts-ignore
    (it, index, arr) =>
      (arr[index + 1]
        ? pointSpeed(it, arr[index + 1])
        : arr[index - 1]
        ? pointSpeed(arr[index - 1], it)
        : 0) >= 5
  );
  const ushkyshflightLocations = ushkysh287.features.filter(
    //@ts-ignore
    (it, index, arr) =>
      (arr[index + 1]
        ? pointSpeed(it, arr[index + 1])
        : arr[index - 1]
        ? pointSpeed(arr[index - 1], it)
        : 0) >= 5
  );
  console.log(
    bordalaytrackflightLocations.length / bordalaytrack.features.length
  );
  console.log(ushkyshflightLocations.length / ushkysh287.features.length);
  console.log(
    "TOTAL",
    (bordalaytrackflightLocations.length + ushkyshflightLocations.length) /
      (bordalaytrack.features.length + ushkysh287.features.length)
  );
}, 30000);

function pointSpeed(
  point: GeoJSON.Feature<GeoJSON.Point>,
  nextPoint: GeoJSON.Feature<GeoJSON.Point>
) {
  const firstPointTime: Date = point.properties!.dateTime;
  const secondPointTime: Date = nextPoint.properties!.dateTime;
  const _distance = distance(point, nextPoint, { units: "kilometers" });
  const timeDiff = secondPointTime.getTime() - firstPointTime.getTime();
  const timeDiffHours = timeDiff / (1000 * 60 * 60);
  if (!timeDiffHours) {
    return 0;
  }
  return Math.abs(_distance / timeDiffHours);
}
