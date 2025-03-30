module.exports = {
  routes: [
    {
      method: "POST",
      path: "/migration/generate-tracks",
      handler: "migration.generateTracks",
      config: {
        policies: [],
        prefix: "",
      },
    },
  ],
};
