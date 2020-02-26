const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Webpack for production. Default config
// For development use webpack.dev.config.js

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
  externals: [{
    react: 'react',
    reactDOM: 'react-dom',
    slate: 'slate',
    slateReact: 'slate-react',
    materialUI: /^@material-ui\/core\/.*/,
    reactHotLoader: 'react-hot-loader'
    }
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/"
  },

  plugins: [
    new CleanWebpackPlugin(), 
    //new BundleAnalyzerPlugin()
  ] 
};