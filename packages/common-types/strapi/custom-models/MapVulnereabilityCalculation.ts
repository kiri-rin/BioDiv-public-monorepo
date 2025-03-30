import { MapVulnereabilityCalculation as StrapiMapVulnereabilityCalculation } from "../models/MapVulnereabilityCalculation";
import {
  WindfarmCollisionConfigType,
  WindfarmInstanceConfigType,
} from "@rrrcn/common-types/services/api/vulnerability/single-transit/config";
export type MapVulnereabilityCalculation = Omit<
  StrapiMapVulnereabilityCalculation,
  "vulnerability_configs"
> & {
  vulnerability_configs: MapVulnereabilityCalculationConfig;
};
export type MapVulnereabilityCalculationConfig = {
  windfarmConfig: WindfarmCollisionConfigType;
  windfarmInstanceConfig: WindfarmInstanceConfigType;
  overrides: {
    flightheights: [number, number][];
    percentAtRotorHeight?: number;
    birdDensitiesPerMonth?: number[];
    updownProportion: number;
    speed: number;
    flight_type: "flapping" | "gliding";
  };
};
