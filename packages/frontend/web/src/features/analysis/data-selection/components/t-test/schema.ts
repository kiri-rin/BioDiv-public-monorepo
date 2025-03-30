import * as yup from "yup";
import { lazy } from "yup";
import { TTestConfig } from "@rrrcn/common-types/services/api/data-selection/configs";

export type TTestInputConfig = TTestConfig<File>;

export const TTestDataSchema: yup.Schema<TTestInputConfig["data"]> = lazy(
  (value: any) => {
    switch (value.type) {
      case "split": {
        return yup.object({
          type: yup.string().required(),
          presence: yup.mixed().required(),
          absence: yup.mixed().required(),
        });
      }
      default:
      case "all-points": {
        return yup.object({
          type: yup.string().required(),
          data: yup.mixed().required(),
          presence_key: yup.string().required(),
        });
      }
    }
  }
) as unknown as yup.Schema<TTestInputConfig["data"]>;
export const TTestSchema: yup.Schema<TTestInputConfig> = yup.object({
  data: TTestDataSchema,
});
