import { DatesInputConfig } from "@/components/date-inputs/script-dates";

import type {
  DataExtractionConfig,
  DatesConfig,
} from "@rrrcn/common-types/services/api/common-body";
import { getDateIntervals } from "../../../../../../helpers/src/dates";
import { ValidDataExtractionInput } from "@/features/analysis/classifications/random-forest/data-schemas";

export const mapDatesConfigToRequest = (
  dates: DatesInputConfig
): DatesConfig => {
  return dates.reduce((acc, it) => {
    acc[it.key] = it.dateIntervals.flatMap((interval) => {
      switch (interval.type) {
        case "date": //@ts-ignore
          return [[new Date(interval?.date), new Date(interval?.date)]];
        case "range": //@ts-ignore
          return [interval?.dates.map((it) => new Date(it))];
        case "repeated":
          return getDateIntervals(
            interval?.dates?.years || [],
            interval?.dates?.months || [],
            interval?.dates?.days || [[1, "end"]]
          );
      }
    });
    return acc;
  }, {} as any) as DatesConfig;
};
export const mapScriptsConfigToRequest = (
  config: Partial<ValidDataExtractionInput>
): Partial<DataExtractionConfig<File | undefined>> => {
  return {
    ...config,
    //@ts-ignore
    background_points: config.background_points?.count
      ? config.background_points
      : undefined,
    defaultScriptParams: {
      ...config.defaultScriptParams,
      dates: config.defaultScriptParams?.dates
        ? mapDatesConfigToRequest(
            config.defaultScriptParams?.dates as DatesInputConfig
          )
        : undefined,
    },
    scripts: config.scripts?.map((script) => ({
      ...script,
      dates:
        script.dates &&
        mapDatesConfigToRequest(script.dates as DatesInputConfig),
    })),
  };
};
