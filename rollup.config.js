import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    name: 'common',
  },
  plugins: [commonjs()],
}
