import { Strapi } from "@strapi/strapi";
import { errors } from "@strapi/utils";
import * as turf from "@turf/turf";
import { validateAndFulfillPolygonWithBbox } from "../../../utils/validations/polygon-with-bbox";
const { ApplicationError } = errors;
export default ({ strapi }: { strapi: Strapi }) => ({
  validateSpatialGridDistrictCreate(entity) {
    validateAndFulfillPolygonWithBbox(entity, true);
  },
});
