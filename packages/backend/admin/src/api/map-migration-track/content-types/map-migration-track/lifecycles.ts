import { StrapiMapMigrationTrack } from "@rrrcn/admin/src/core-impl/map/entities/migration-track";
import { GeoJSON } from "geojson";
import { distance } from "@turf/turf";

export default {
  async beforeCreate({ params }) {
    const track = new StrapiMapMigrationTrack(params.data);
    params.data.locations_count = track.track.features.length;
    params.data.flight_locations_count = track.track.features.length;
    const flightLocations = track.track.features.filter((it, index, arr) => {
      const calcSpeed = arr[index + 1]
        ? pointSpeed(it, arr[index + 1])
        : arr[index - 1]
        ? pointSpeed(arr[index - 1], it)
        : 0;
      //@ts-ignore
      it.properties.calc_speed = calcSpeed;
      return calcSpeed >= 5;
    });

    params.data.flight_locations_count = flightLocations.length;
    params.data.average_flight_speed = flightLocations.length
      ? flightLocations.reduce(
          //@ts-ignore
          (acc, it) => acc + it.properties.calc_speed,
          0
        ) / flightLocations.length
      : 0;
  },
};
function pointSpeed(
  point: GeoJSON.Feature<GeoJSON.Point>,
  nextPoint: GeoJSON.Feature<GeoJSON.Point>
) {
  const firstPointTime: Date = point.properties!.date;
  const secondPointTime: Date = nextPoint.properties!.date;
  if (!firstPointTime || !secondPointTime) {
    return 0;
  }
  const _distance = distance(point, nextPoint, { units: "kilometers" });
  const timeDiff = secondPointTime.getTime() - firstPointTime.getTime();
  const timeDiffHours = timeDiff / (1000 * 60 * 60);
  if (!timeDiffHours) {
    return 0;
  }
  return Math.abs(_distance / timeDiffHours);
}
