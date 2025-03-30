export default {
  async beforeCreate({ params }) {
    await strapi
      .service("api::sensitive-area.validate")
      .validateSensitiveAreaCreate(params.data, true);
  },

  async afterCreate({ params, result }) {
    if (!result.localizations?.find((it) => it.id)) {
      const entity = await strapi.db
        .query("api::sensitive-area.sensitive-area")
        .findOne({ where: { id: result.id }, populate: ["spatial_grid"] });
      const spatialGridId = entity.spatial_grid?.id;
      if (spatialGridId) {
        strapi.service("api::map.map-spatial-grid-cell").updateAreaCells({
          spatialGridId,
          entityWithPolygon: entity,
          fieldKey: "sensitive_areas",
          onSuccess: () => {
            strapi.db
              .query("api::sensitive-area.sensitive-area")
              .update({ where: { id: result.id }, data: { indexed: true } });
          },
        });
      }
    }
  },
  async beforeUpdate(event) {},
  async afterUpdate(event) {},
};
