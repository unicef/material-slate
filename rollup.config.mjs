import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import url from '@rollup/plugin-url'
import replace from '@rollup/plugin-replace'

import { defineConfig } from 'rollup'

export default defineConfig({
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    nodeResolve({ extensions: ['.js', '.jsx'] }),
    commonjs({
      include: 'node_modules/**',
    }),
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
