const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const basePath = __dirname;
const contextPath = path.join(basePath, "src");

module.exports = {
  context: contextPath,
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: {
      common: path.join(contextPath, "common"),
      components: path.join(contextPath, "components"),
      images: path.join(contextPath, "images"),
      layout: path.join(contextPath, "layout"),
      api: path.join(contextPath, "api"),
    }
  },
  devtool: "eval-source-map",
  entry: {
    app: ["./index.tsx"],
  },
  stats: "errors-only",
  output: {
    filename: "[name].[chunkhash].js",
    publicPath: "/",
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.jpg$/,
        exclude: /node_modules/,
        use: [
            'file-loader?name=images/[name].[ext]'
        ],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: "index.html", //Name of file in ./dist/
      template: "index.html", //Name of template in ./src
    }),
  ],
};
