const path = require('path')
const { styles, theme } = require('./styleguide.styles')
module.exports = {
  components: './src/**/[A-Z]*.{js,jsx}',
  title: 'UNICEF Material Slate',
  styles,
  theme,
  usageMode: 'expand',
  getComponentPathLine: componentPath => {
    const name = componentPath.split('/').pop().split('.js')[0]

    return `import { ${name} } from '@unicef/material-slate`
  },
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.js$/,
          include: /node_modules\/(@mui|@emotion)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env', '@babel/preset-react'],
            },
          },
        },
      ],
    },
  },
}
