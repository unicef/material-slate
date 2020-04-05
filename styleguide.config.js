const path = require('path')
const { styles, theme } = require('./styleguide.styles')
module.exports = {
  
  components: './src/**/[A-Z]*.{js,jsx}',
  title: 'UNICEF Material Slate',
  styles,
  theme,
  usageMode: 'expand',
  getComponentPathLine: componentPath => {
    const name = componentPath
      .split('/')
      .pop()
      .split('.js')[0]

    return `import { ${name} } from '@unicef/material-slate`
  },
  webpackConfig: {
    module: {
      rules: [
        // Babel loader, will use your project’s babel.config.js
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        // Other loaders that are needed for your components
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  } //End Webpack
}
