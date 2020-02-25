const path = require("path");
const webpack = require("webpack");
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  entry: { 
      bundle: "./src/index.js",
      //example: './example/index.js'
  },
  mode: "production",
  devtool: 'source-map',
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
  plugins: [new webpack.HotModuleReplacementPlugin(),
   // new BundleAnalyzerPlugin()
  ] 
};