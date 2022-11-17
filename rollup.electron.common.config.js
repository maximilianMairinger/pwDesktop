import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'


export default {
  input: 'electron/src/electron.ts',
  output: {
    file: 'electron/dist/electron.js',
    format: 'cjs'
  },
  plugins: [
    typescript({tsconfig: "./tsconfig.electron.json", noEmitOnError: false}), 
    resolve({modulesOnly: true, preferBuiltins: true}),
    commonJS({
      include: 'node_modules/**'
    }),
    json()
  ]
};
