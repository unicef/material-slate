const path = require('path')
const { styles, theme } = require('./styleguide.styles')
module.exports = {
  title: 'UNICEF Material UI Text Editor',
  styles,
  theme,
  showUsage: true,
  getComponentPathLine: componentPath => {
    const name = componentPath
      .split('/')
      .pop()
      .split('.js')[0]

    return `import { ${name} } from '@unicef/material-ui-texteditor`
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
  },
  sections: [
    {
      name: 'Introduction',
      sections: [
        {
          name: '',
          content: 'src/docs/Introduction.md',
        },
        {
          name: 'Installation',
          content: 'src/docs/Installation.md',
        },
        {
          name: 'Usage',
          content: 'src/docs/Usage.md',
        },
        {
          name: 'Example',
          external: true,
          href: 'https://unicef.github.io/material-ui-richeditor/example',
        },
      ],
    },
    {
      name: 'Components',
      components: () => [
        path.resolve(__dirname, 'src/', 'RichSlate.js'),
        path.resolve(__dirname, 'src/', 'RichEditable.js'),
        path.resolve(__dirname, 'src/', 'createRichEditor.js'),
        path.resolve(__dirname, 'src/components/', 'RichToolbar.js'),
        path.resolve(__dirname, 'src/components/', 'RichHoverToolbar.js'),
        path.resolve(__dirname, 'src/components', 'RichSlateButton.js'),
      ],
      usageMode: 'expand',
    },
  ],
}
