const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: { 
      bundle: "./src/index.js",
      example: './example/index.js'
  },
  mode: "development",
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env",'@babel/react'] }
      }
    ]
  },
  resolve: { 
    extensions: ["*", ".js", ".jsx"],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/"
  },
  devServer: {
    contentBase: path.join(__dirname, "example/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        from: 'src/**/*',
        to: '',
      }]),
    new BundleAnalyzerPlugin()
  ] 
};