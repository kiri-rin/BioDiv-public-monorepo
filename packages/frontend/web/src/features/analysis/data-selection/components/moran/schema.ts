import * as yup from "yup";
import { MoranConfig } from "@rrrcn/common-types/services/api/data-selection/configs";
import { GeometryInputSchema } from "@/features/analysis/common/geometry-validations";

export type MoranInputConfig = MoranConfig<File | undefined>;

export const MoranTestSchema: yup.Schema<MoranInputConfig> = yup.object({
  areas: GeometryInputSchema(),
  points: GeometryInputSchema(),
});
