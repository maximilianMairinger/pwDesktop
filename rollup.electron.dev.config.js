import { merge } from "webpack-merge"
import commonMod from "./rollup.electron.common.config"


export default merge(commonMod, {
  watch: {
    include: ['electron/src/**'],
    exclude: 'node_modules/**'
  }
})
