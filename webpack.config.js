const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        use: ["file-loader"]
      }
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".css"],
  },
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(__dirname, "./docs"),
    filename: "bundle.js",
  },
  // [webpack-dev-server] "hot: true" automatically applies HMR plugin, you don't have to add it manually to your webpack configuration.
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    historyApiFallback: true,
    hot: true,
    // contentBase is deprecated by static in webpack v5
    proxy: {
      '/': 'http://localhost:3000/',
    }
    // contentBase: path.resolve(__dirname, "./docs"),
 
  },
};
