const path = require("path");
const webpack = require("webpack");
const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
module.exports = {
  webpack: {
    plugins: {
      add: [
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
        }),
      ],
    },
    configure: (config) => {
      // Remove guard against importing modules outside of \`src\`.
      // Needed for workspace projects.
      config.resolve.plugins = config.resolve.plugins.filter(
        (plugin) => !(plugin instanceof ModuleScopePlugin)
      );
      // console.log(webpack.ProvidePlugin);

      // Add support for importing workspace projects.
      config.resolve.plugins.push(
        new TsConfigPathsPlugin({
          configFile: path.resolve(__dirname, "tsconfig.json"),
          extensions: [".ts", ".tsx", ".js", ".jsx"],
          mainFields: ["module", "main"],
        })
      );

      const oneOfRule = config.module.rules.find((rule) => rule.oneOf);
      // Replace include option for babel loader with exclude
      // so babel will handle workspace projects as well.
      oneOfRule.oneOf.forEach((r) => {
        if (r.loader && r.loader.indexOf("babel") !== -1) {
          r.exclude = /.yarn/;
          delete r.include;
        }
      });

      return config;
    },
  },
};
