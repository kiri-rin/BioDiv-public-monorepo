import { VulnerabilityFormType } from "../../../context/vulnerability-areas";
import { Feature, MultiPolygon, Polygon } from "@turf/helpers";
import { MigrationPath } from "@rrrcn/common-types/services/api/migrations/generate-tracks/config";
import { ServicesVulnerabilityApiTypes } from "@rrrcn/common-types/services/api/vulnerability";

export const habitatAreaVulnerabilityFormToRequest = (
  form: Required<VulnerabilityFormType>,
  migrations: MigrationPath[],
  area: Feature<Polygon | MultiPolygon>,
  birds_count: number
): ServicesVulnerabilityApiTypes.OverallHabitatAreaVulnerability.Body => {
  const {
    bladeFormRadiusArray,
    flight_type,
    bladeFormChordsArray,
    blades,
    chord,
    hubheight,
    length,
    nocturnalActivity,
    numberOfTurbines,
    offset,
    omega,
    pitch,
    radius,
    speed,
    yinc,
    xinc,
    updownProportion,

    timeOfWorkPerMonth,
    wingspan,
  } = form;

  const bladeForm = bladeFormRadiusArray.map(
    (it, index) => [it, bladeFormChordsArray[index]] as [number, number]
  );
  //@ts-ignore fixme
  return {
    area,
    birds_count,
    yinc,
    xinc,
    windfarmInstanceConfig: {
      timeOfWorkPerMonth,
      offset,
      hubheight,
    },
    windfarmConfig: {
      radius,
      blades,
      chord,
      omega,
      numberOfTurbines,
      pitch,
      bladeForm,
    },
    updownProportion,
    birdConfig: {
      wingspan,
      flight_type,
      length,
      speed,
      nocturnalActivity,
    },
  };
};
