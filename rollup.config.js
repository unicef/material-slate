// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

import * as react from 'react'; //https://stackoverflow.com/questions/56988390/not-able-to-get-namedexports-for-reactdom-in-commonjs-plugin-in-rollup
import * as reactDom from 'react-dom';
import * as reactIs from 'react-is';
import * as propTypes from 'prop-types';


export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
    sourcemap: true
  },
  plugins: [
    resolve({
      extensions: ['.js', '.jsx'], 
    }),
    babel({
      babelrc: false,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
          },
        ],
        '@babel/preset-react',
      ],
      exclude: 'node_modules/**',
      plugins: ["@babel/external-helpers"],
    }),
    commonjs({
      namedExports: {
        react: Object.keys(react),
        'react-dom': Object.keys(reactDom),
        'react-is': Object.keys(reactIs),
        'prop-types': Object.keys(propTypes),
        'node_modules/esrever/esrever.js': [ 'reverse' ]
      }
    })
  ]
};