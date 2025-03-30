import { withGEE } from "../../index";
import { getFeatures } from "../../utils/ee-image";
import { reduceRegionsFromImageOrCollection } from "../../utils/io";
import { elevationScript } from "../../services/ee-data/scripts/elevation";
import fs from "fs";
import { featureCollection } from "@turf/helpers";

it("", async () => {
  await withGEE(async () => {
    const bordalaytrack = require("./boralday212519-point-summer2-2024-natal.json");
    const ushkysh287 = require("./ushkysh287-points-summer2-2024-natal.json");

    const bordalaytrackflightLocations = bordalaytrack.features.filter(
      //@ts-ignore

      (it) => it.properties.SPEED_KM_H > 5
    );

    const ushkyshflightLocations = ushkysh287.features.filter(
      //@ts-ignore

      (it) => it.properties.speed > 5
    );
    const bordalayelevations = await getFeatures(
      await reduceRegionsFromImageOrCollection(
        ee.FeatureCollection(bordalaytrack.features),
        elevationScript({
          regions: ee.FeatureCollection(bordalaytrack.features),
        }).elevation,
        undefined,
        ["elevation"]
      )
    );
    const ushkyshElevations = await getFeatures(
      await reduceRegionsFromImageOrCollection(
        ee.FeatureCollection(ushkyshflightLocations),
        elevationScript({
          regions: ee.FeatureCollection(ushkyshflightLocations),
        }).elevation,
        undefined,
        ["elevation"]
      )
    );

    //@ts-ignore
    const bordElev = bordalaytrackflightLocations.map((it, index) => {
      it.properties.elevation =
        parseFloat(it.properties.ALTITUDE_M) -
        bordalayelevations[index].properties.elevation;
      return it;
    });
    //@ts-ignore
    const ushkyshElev = ushkyshflightLocations.map((it, index) => {
      it.properties.elevation =
        parseFloat(it.properties.altitude) -
        ushkyshElevations[index].properties.elevation;
      return it;
    });
    const ushkyshOnRotorHeight = ushkyshElev.filter(
      //@ts-ignore
      (it) =>
        it.properties.elevation >= 29.5 && it.properties.elevation <= 150.5
    );
    const bordElevOnRotorHeight = bordElev.filter(
      //@ts-ignore
      (it) =>
        it.properties.elevation >= 29.5 && it.properties.elevation <= 150.5
    );
    console.log(ushkyshOnRotorHeight.length / ushkyshElev.length);
    console.log(bordElevOnRotorHeight.length / bordElev.length);
    console.log(
      (ushkyshOnRotorHeight.length + bordElevOnRotorHeight.length) /
        (ushkyshElev.length + bordElev.length)
    );
    fs.writeFileSync(
      "./bordElev.json",
      JSON.stringify(featureCollection(bordElev))
    );
    fs.writeFileSync(
      "./ushkyshElev.json",
      JSON.stringify(featureCollection(ushkyshElev))
    );
    fs.writeFileSync(
      "./ushkyshEleva.json",
      JSON.stringify(featureCollection(ushkyshElevations))
    );
    fs.writeFileSync(
      "./bordEleva.json",
      JSON.stringify(featureCollection(bordalayelevations))
    );
  });
}, 30000);
async function commonTrackFlightHeightLocations(
  track: any,
  altitudeKey: string = "altitude"
) {
  const trackFlight = track.features.filter(
    //@ts-ignore

    (it) => it.properties.speed > 5
  );
  const tracklevations = await getFeatures(
    await reduceRegionsFromImageOrCollection(
      ee.FeatureCollection(trackFlight),
      elevationScript({
        regions: ee.FeatureCollection(trackFlight),
      }).elevation,
      undefined,
      ["elevation"]
    )
  );
  tracklevations.forEach((it: any) => {
    it.properties.elevation =
      parseFloat(it.properties["altitudeKey"]) - it.properties.elevation;
  });
  return {
    trackOnRotorHeight: tracklevations.filter(
      //@ts-ignore
      (it) =>
        it.properties.elevation >= 29.5 && it.properties.elevation <= 150.5
    ),
    tracklevations,
  };
}
