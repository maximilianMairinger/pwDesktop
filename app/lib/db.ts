import { Data, DataBase } from "josm"
import localSettings from "./localSettings"



export const store = localSettings("clockSettings", {
  username: "",
  msSettings: {
    single: 500,
    "4some": 500,
    full: 500 
  }
})

export default store


export function doubleLink(initiallyCorrectData: Data<any>, otherData: Data<any>) {
  const otherDataSub = otherData.get((v) => {
    initiallyCorrectDataSub.setToData(v)
  }, false)
  const initiallyCorrectDataSub = initiallyCorrectData.get((v) => {
    otherDataSub.setToData(v)
  })
}
