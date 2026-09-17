import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url'
import replace from '@rollup/plugin-replace'
import { defineConfig } from 'rollup'

const externalPackages = [
  'react',
  'react-dom',
  'prop-types',

  '@mui/material',
  '@mui/icons-material',

  '@emotion/react',
  '@emotion/styled',

  'slate',
  'slate-history',
  'slate-react',
  'slate-dom',
]

export default defineConfig({
  input: 'src/index.js',

  external: id =>
    externalPackages.some(pkg => id === pkg || id.startsWith(`${pkg}/`)),

  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      interop: 'auto',
    },
  ],

  plugins: [
    nodeResolve({
      extensions: ['.js', '.jsx'],
    }),

    commonjs(),

    url(),

    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),

    replace({
      preventAssignment: true,
    }),
  ],
})
