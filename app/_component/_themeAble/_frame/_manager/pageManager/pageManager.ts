import Manager from "../manager";
import {ImportanceMap, Import} from "../../../../../lib/lazyLoad"
import { declareComponent } from "../../../../../lib/declareComponent"
import HighlightAbleIcon from "../../../_icon/_highlightAbleIcon/highlightAbleIcon";

import NotFoundPage from "../../_page/notFound/notFound"
import LoginPage from "../../_page/loginPage/loginPage"
import UploadPage from "../../_page/uploadPage/uploadPage"


export default class PageManager extends Manager {
  constructor(pageChangeCallback?: (page: string, sectiones: {[link: string]: HighlightAbleIcon}[], domainLevel: number) => void, sectionChangeCallback?: (section: string) => void, onScroll?: (scrollProgress: number) => void, onUserScroll?: (scrollProgress: number, userInited: boolean) => void) {

    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("login", 10, (login: typeof LoginPage) =>
            new login()
        ), val: () => import(/* webpackChunkName: "loginMode" */"../../_page/loginPage/loginPage")
      },
      {
        key: new Import("", 10, (upload: typeof UploadPage) =>
            new upload()
        ), val: () => import(/* webpackChunkName: "uploadMode" */"../../_page/uploadPage/uploadPage")
      },
      {
        key: new Import("", 60, (notFoundPage: typeof NotFoundPage) =>
          new notFoundPage()
        ), val: () => import(/* webpackChunkName: "notFoundPage" */"../../_page/notFound/notFound")
      }
    ), 0, pageChangeCallback, true, onScroll, onUserScroll)
  }


  stl() {
    return super.stl() + require("./pageManager.css").toString()
  }
  pug() {
    return "";
  }
}


declareComponent("page-manager", PageManager)