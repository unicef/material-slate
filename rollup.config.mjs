import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'

const NODE_ENV = process.env.NODE_ENV || 'development'
const outputFile = NODE_ENV === 'production' ? './lib/prod.js' : './lib/dev.js'

export default {
  input: './src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    babel({
      babelrc: false,
      presets: [
        [
          '@babel/env',
          {
            modules: false,
          },
        ],
        '@babel/react',
      ],
      exclude: 'node_modules/**',
    }),
    resolve({ extensions: ['.js', '.jsx'] }),
    commonjs(),
  ],
  external: [
    'react',
    'react-is',
    'react-dom',
    'prop-types',
    'styled-components',
  ],
  onwarn: function (message) {
    if (message.code === 'MODULE_LEVEL_DIRECTIVE') return
    console.error(message)
  },
}
