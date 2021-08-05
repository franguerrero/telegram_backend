const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "none",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    port: 3030,
  },
  output: {
    publicPath: "/",
  },
});
