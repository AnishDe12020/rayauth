export default {
    entryPoints: ['src/index.ts'],
    format: ['cjs', 'esm'],
    minify: true,
    sourcemap: true,
    outfile: 'dist/index.js',
    external: ['react', 'react-dom'],
  };
  