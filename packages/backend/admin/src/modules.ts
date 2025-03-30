import moduleAlias from "module-alias";

moduleAlias.addAlias(
  "@rrrcn/common-helpers/src",
  "@rrrcn/common-helpers/dist/src"
);
moduleAlias.addAlias("@rrrcn/services/src", "@rrrcn/services/dist");
moduleAlias.addAlias("@rrrcn/common-types", "@rrrcn/common-types/dist");
moduleAlias.addAlias("@rrrcn/admin/src", `${__dirname}`);
