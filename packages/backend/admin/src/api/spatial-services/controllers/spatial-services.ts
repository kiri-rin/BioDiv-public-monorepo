import { Strapi } from "@strapi/strapi";

import { rrrcnServicesClient } from "@rrrcn/admin/src/rrrcn-services-client";
import { ServicesSpatialServicesApiTypes } from "@rrrcn/common-types/services/api/spatial-services";

export default ({ strapi }: { strapi: Strapi }) => ({
  async generalizeAreaPoints(ctx) {
    const args: ServicesSpatialServicesApiTypes.GeneralizeAreaPoints.Body =
      ctx.request.fullBody; //TODO validate
    return await rrrcnServicesClient.generalizeAreaPointsController(args);
  },
  async findBuffersDistances(ctx) {
    const args: ServicesSpatialServicesApiTypes.BuffersCentroidsDistances.Body =
      ctx.request.fullBody; //TODO validate
    return await rrrcnServicesClient.buffersCentroidsDistancesController(args);
  },
});
