module.exports = {
  routes: [
    {
      method: "POST",
      path: "/spatial-services/generalize-area-points",
      handler: "spatial-services.generalizeAreaPoints",
      config: {
        policies: [],
        middlewares: ["global::merge-form"],
        prefix: "",
      },
    },
    {
      method: "POST",
      path: "/spatial-services/find-buffers-distances",
      handler: "spatial-services.findBuffersDistances",
      config: {
        policies: [],
        middlewares: ["global::merge-form"],
        prefix: "",
      },
    },
  ],
};
