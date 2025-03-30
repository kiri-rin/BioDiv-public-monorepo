const bordalaytrack = require("./boralday212519-point-summer2-2024-natal.json");
const umyt289 = require("./umyt289-point-summer2-2024.json");
const ushkysh287 = require("./ushkysh287-points-summer2-2024-natal.json");

const bordalaytrackflightLocations = bordalaytrack.features.filter(
  (it) => it.properties.SPEED_KM_H > 5
);
const umyt289flightLocations = umyt289.features.filter(
  (it) => it.properties.speed > 5
);
const ushkyshflightLocations = ushkysh287.features.filter(
  (it) => it.properties.speed > 5
);
console.log(
  bordalaytrackflightLocations.length / bordalaytrack.features.length
);
console.log(umyt289flightLocations.length / umyt289.features.length);
console.log(ushkyshflightLocations.length / ushkysh287.features.length);
console.log(
  "TOTAL",
  (bordalaytrackflightLocations.length + ushkyshflightLocations.length) /
    (bordalaytrack.features.length + ushkysh287.features.length)
);
