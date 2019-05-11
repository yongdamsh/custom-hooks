module.exports = {
  external: ['intersection-observer', 'react'],
  input: 'src/useElementVisibility.js',
  output: {
    name: 'useElementVisibility',
    file: 'dist/useElementVisibility.js',
    format: 'umd',
    globals: {
      react: 'React',
    },
  }
};
