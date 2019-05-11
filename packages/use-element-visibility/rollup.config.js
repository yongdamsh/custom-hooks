const babel = require('rollup-plugin-babel');
const minify = require('rollup-plugin-babel-minify');

const isProduction = process.env.BUILD === 'production';

module.exports = {
  external: ['intersection-observer', 'react'],
  input: 'src/useElementVisibility.js',
  output: {
    name: 'useElementVisibility',
    file: isProduction ? 'dist/useElementVisibility.min.js' : 'dist/useElementVisibility.js',
    format: 'umd',
    globals: {
      react: 'React',
    },
  },
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    isProduction && minify(),
  ],
};
