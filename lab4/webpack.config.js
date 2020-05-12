const HtmlWebpackPlugin = require("html-webpack-plugin");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const webpack = require("webpack");
require("dotenv").config();

const ENV = process.env.APP_ENV;

function setDevTool() {
  switch (ENV) {
    case "dev":
      return "inline-sourse-map";
    case "prod":
      return "source-map";
    default:
      return "eval-source-map";
  }
}

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: __dirname + "/src/public/index.html",
  inject: "body",
});
const dotenvPlugin = new webpack.DefinePlugin({
  API: JSON.stringify(process.env.API),
});
const jqueryPlugin = new webpack.ProvidePlugin({
  $: "jquery",
  jQuery: "jquery",
});

const config = {
  entry: __dirname + "/src/app/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
    publicPath: "/",
  },
  devtool: setDevTool(),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: [/node_modules/],
      },
      {
        test: /\.{sass|scss}$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [jqueryPlugin, dotenvPlugin, htmlWebpackPlugin],
  devServer: {
    contentBase: "./src/public",
    port: 3000,
  },
};

if (ENV === "prod") {
  const uglifyJSPlugin = new UglifyJsPlugin();
  const copyWebpackPlugin = new CopyWebpackPlugin([
    { from: __dirname + "/src/public" },
  ]);

  config.plugins.push(uglifyJSPlugin, copyWebpackPlugin);
}

module.exports = config;
