import { inside } from "@turf/turf";

export default {
  async beforeCreate({ params }) {
    // await strapi
    //   .service("api::map-habitat-area.validate")
    //   .validateHabitatAreaCreate(params.data, true);
  },
  async afterCreate({ params, result }) {
    // if (!result.localizations?.find((it) => it.id)) {
    //   const entity = await strapi.db
    //     .query("api::map.map-habitat-area")
    //     .findOne({ where: { id: result.id }, populate: ["spatial_grid"] });
    //   const spatialGridId = entity.spatial_grid?.id;
    //
    //   if (spatialGridId) {
    //     strapi
    //       .service("api::map.map-spatial-grid-cell")
    //       .updateAreaCells({
    //         spatialGridId,
    //         entityWithPolygon: entity,
    //         fieldKey: "habitat_areas",
    //       });
    //   }
    // }
  },
  async beforeUpdate(event) {
    const { params } = event;
    // delete params.data.polygon;
    // delete params.data.bbox_left;
    // delete params.data.bbox_right;
    // delete params.data.bbox_top;
    // delete params.data.bbox_bottom;
    const entity = await strapi.db
      .query("api::map.map-habitat-area")
      .findOne({ where: params.where, populate: ["spatial_grid"] });
    console.log("BEFORE UPDATE ", entity);
    if (params?.data?.points?.features) {
      // params.data.points.features = params.data.points.features.filter((it) =>
      //   inside(it, entity.polygon)
      // );
      params.data.points_count = params.data.points.features.length;
    }
    params.data.months_densities = params.data.months_presence_old.map(
      (it, index) =>
        params.data.points_count * it * params.data.old_flight_percent +
        params.data.points_count *
          params.data.months_presence_new[index] *
          params.data.new_flight_percent
    );
    // const newSpatialGridId = params.data.spatial_grid?.connect?.[0]?.id;
    //
    // if (!entity.spatial_grid && newSpatialGridId) {
    //   event.state = { updateCells: true };
    // } else {
    //   if (params.data.spatial_grid) {
    //     params.data.spatial_grid.connect = [];
    //   }
    // }
    // if (
    //   entity.spatial_grid &&
    //   params.data.spatial_grid?.disconnect?.find(
    //     (it) => it.id === entity.spatial_grid.id
    //   )
    // ) {
    //   params.data.spatial_grid_cells = { set: [] };
    // }
  },
  async afterUpdate(event) {
    // const { params, result } = event;
    // const entity = await strapi.db
    //   .query("api::map.map-habitat-area")
    //   .findOne({ where: params.where, populate: ["spatial_grid"] });
    // const newSpatialGridId = params.data.spatial_grid?.connect?.[0]?.id;
    // if (event.state.updateCells) {
    //   strapi
    //     .service("api::map.map-spatial-grid-cell")
    //     .updateAreaCells({
    //       spatialGridId: newSpatialGridId,
    //       entityWithPolygon: entity,
    //       fieldKey: "habitat_areas",
    //     });
    // }
  },
};
