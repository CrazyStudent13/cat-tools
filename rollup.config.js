import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/main.js',
  output: {
    file: 'index.js',
    format: 'cjs',
    name: 'common',
  },
  plugins: [commonjs()],
}
