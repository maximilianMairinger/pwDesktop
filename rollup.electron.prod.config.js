import { merge } from "webpack-merge"
import commonMod, {preLoad} from "./rollup.electron.common.config"
import { terser } from "rollup-plugin-terser"


export default [
  merge(commonMod, {
    plugins: [terser()]
  }),
  merge(preLoad, {
    plugins: [terser()]
  })
]


