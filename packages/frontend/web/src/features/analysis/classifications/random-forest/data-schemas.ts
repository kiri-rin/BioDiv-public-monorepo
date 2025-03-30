import { DataExtractionInput, ScriptInputConfig } from "./data-extraction";
import * as yup from "yup";
import { DatesInputSchema } from "@/components/date-inputs/dates-schemas";
import { GeometryInputSchema } from "../../common/geometry-validations";

export interface ValidDataExtractionInput
  extends Omit<DataExtractionInput, "background_points"> {
  //@ts-ignore
  background_points?:
    | Required<DataExtractionInput["background_points"]>
    | NonNullable<unknown>
    | null;
}
export const ScriptInputSchema: yup.Schema<ScriptInputConfig> = yup.object({
  key: yup.string<ScriptInputConfig["key"]>().min(1).required(),
  dates: DatesInputSchema,
});
export const DefaultScriptParamsSchema = yup.object({
  dates: DatesInputSchema,
  buffer: yup.number(),
  outputs: yup.string(),
  mode: yup.string<"MEAN" | "SUM">(),
  scale: yup.number(),
});
export const DataExtractionValidationSchema: yup.Schema<ValidDataExtractionInput> =
  yup.object({
    defaultScriptParams: DefaultScriptParamsSchema,
    scripts: yup.array(ScriptInputSchema).min(1).required(),
    points: GeometryInputSchema(),
    random_points: yup
      .object({ count: yup.number().required().min(1) })
      .nullable()
      .optional(),
    background_points: yup
      .lazy<yup.Schema<ValidDataExtractionInput["background_points"]>>(
        (value) => {
          if (value?.count) {
            return yup.object({
              count: yup.number().required().min(1),
              percent_inside_buffers: yup.number().required().min(0).max(1),
              region_of_interest: GeometryInputSchema(),
            });
          } else {
            return yup.object({}).optional();
          }
        }
      )
      .optional(),
  });
