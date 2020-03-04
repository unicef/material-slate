import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
// import sourcemaps from 'rollup-plugin-sourcemaps'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    url(),
    babel({
      babelrc: false,
      presets: [
        [
          'env',
          {
            modules: false,
          },
        ],
        'stage-0',
        'react',
      ],
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
    resolve( {extensions: ['.js', '.jsx']}),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react/index.js': [
          'cloneElement',
          'createContext',
          'Component',
          'createElement',
        ],
        'node_modules/react-dom/index.js': ['render', 'hydrate'],
        'node_modules/react-is/index.js': [
          'isElement',
          'isValidElementType',
          'ForwardRef',
        ],
      },
    }),
  ],
}
