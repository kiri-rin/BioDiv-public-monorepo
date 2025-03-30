export default {
  async beforeCreate({ params }) {
    // await strapi
    //   .service("api::map-spatial-grid-district.validate")
    //   .validateSpatialGridDistrictCreate(params.data, true);
  },
  async afterCreate({ params, result }) {
    // if (!result.localizations?.find((it) => it.id)) {
    //   const entity = await strapi.db
    //     .query("api::map.map-spatial-grid-district")
    //     .findOne({ where: { id: result.id }, populate: ["spatial_grid"] });
    //   const spatialGridId = entity.spatial_grid?.id;
    //
    //   if (spatialGridId) {
    //     strapi
    //       .service("api::map.map-spatial-grid-cell")
    //       .updateAreaCells({
    //         spatialGridId,
    //         entityWithPolygon: entity,
    //         fieldKey: "spatial_grid_district",
    //       });
    //   }
    // }
  },
  async beforeUpdate({ params }) {
    // delete params.data.polygon;
    // delete params.data.bbox_left;
    // delete params.data.bbox_right;
    // delete params.data.bbox_top;
    // delete params.data.bbox_bottom;
    // const entity = await strapi.db
    //   .query("api::map.map-spatial-grid-district")
    //   .findOne({ where: params.where, populate: ["spatial_grid"] });
    // const newSpatialGridId = params.data.spatial_grid?.connect?.[0]?.id;
    // if (!entity?.spatial_grid && newSpatialGridId) {
    //   const cells = await strapi
    //     .service("api::map.map-spatial-grid-cell")
    //     .getCellsInsidePolygon(params.data, newSpatialGridId);
    //   params.data.spatial_grid_cells.connect = cells.map((it) => ({
    //     id: it.id,
    //     position: { end: true },
    //   }));
    // }
  },
};
