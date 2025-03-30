export default {
  routes: [
    {
      method: "POST",
      path: "/bird-tracks/uploadMany",
      handler: "batch.uploadMany",
      config: {
        policies: [],
        // middlewares: ["global::merge-form"],
        prefix: "",
      },
    },
  ],
};
