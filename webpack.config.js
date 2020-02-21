const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: { 
      bundle: "./src/index.js",
      example: './example/index.js'
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
  },
  devServer: {
    contentBase: path.join(__dirname, "example/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};