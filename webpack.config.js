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
        test: /\.(js|jsx|ts|tsx)$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules/slate-react"),
          path.resolve(__dirname, "node_modules/@material-ui/core"),
          path.resolve(__dirname, "node_modules/@material-ui/core/esm/Box/index.js")
          
        ],
        //exclude: /node_modules/,
        loader: "babel-loader",
        options: { 
          presets: [
            ["@babel/env", {targets: "> 0.25%, not dead", modules: false, debug: true}],
            '@babel/react'
          ], 
          plugins: [
            "@babel/plugin-transform-react-jsx",
            "@babel/plugin-proposal-object-rest-spread",
            ["@babel/plugin-transform-arrow-functions", {
              "spec": true
            }]
          ]
        }
      }
    ]
  },
  
  resolve: { 
    extensions: ["*", ".js", ".jsx"],
  },
  externals: [nodeExternals({whitelist: ['slate','slate-react','slate-history', '@material-ui/core']})],
  //externals: [nodeExternals()],
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