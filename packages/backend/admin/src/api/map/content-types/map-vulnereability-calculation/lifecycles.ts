export default {
  async beforeDelete({ params }) {
    const results = await strapi.db
      .query("api::map.map-vulnerability-result")
      .findMany({
        where: { map_vulnereability_calculation: params.where.id },
      });
    for (let res of results) {
      await strapi.db
        .query("api::map.map-vulnerability-result")
        .delete({ where: { id: res.id } });
    }
  },
};
