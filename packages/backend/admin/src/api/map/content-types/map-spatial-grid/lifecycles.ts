export default {
  async beforeCreate({ params }) {
    // params.data = new StrapiMapSpatialGrid(params.data).strapiData;
    // await strapi
    //   .service("api::map-spatial-grid.validate")
    //   .validateSpatialGridCreate(params.data, true);
  },
  // async beforeUpdate({ params }) {
  //   await strapi
  //     .service("api::map-spatial-grid.validate")
  //     .validateSpatialGridCreate(params.data);
  // },
  async beforeDelete({ params: { where } }) {
    // const spatialGrid = await strapi
    //   .query("api::map.map-spatial-grid")
    //   .findOne({ where });
    // const ids = await strapi
    //   .query("api::map.map-spatial-grid-cell")
    //   .findMany({ where: { spatial_grid: { id: spatialGrid.id } } });
    // for (const id of ids) {
    //   await strapi
    //     .query("api::map.map-spatial-grid-cell")
    //     .delete({ where: { id: id.id } });
    // }
  },
  async afterCreate({ params, result }) {
    // if (!result.localizations?.find((it) => it.id)) {
    //   //check if there already was some localization of thi grid
    //   await strapi
    //     .service("api::map.map-spatial-grid-cell")
    //     .createGridCells({
    //       polygon: result.polygon,
    //       gridId: result.id,
    //       cell_size: result.cell_size,
    //     });
    // }
  },
};
