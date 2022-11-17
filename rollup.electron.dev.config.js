import { merge } from "webpack-merge"
import commonMod, {preLoad} from "./rollup.electron.common.config"
import { terser } from "rollup-plugin-terser"


export default [
  merge(commonMod, {
    watch: {
      include: ['electron/src/**'],
      exclude: 'node_modules/**'
    }
  }),
  merge(preLoad, {
    watch: {
      include: ['electron/src/**'],
      exclude: 'node_modules/**'
    }
  })
]
