const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Webpack for production. Default config
// For development use webpack.dev.config.js

// Ref https://webpack.js.org/guides/author-libraries/

module.exports = {
  entry: { 
      bundle: "./src/index.js",
  },
  mode: "production",
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env",'@babel/react'] }
      }
    ]
  },
  resolve: { 
    extensions: ["*", ".js", ".jsx"],
  },
  externals: [nodeExternals()],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "dist/"),
    library: '',
    libraryTarget: 'commonjs',
  },

  plugins: [
    new CleanWebpackPlugin(), 
    //new BundleAnalyzerPlugin()
  ] 
};