import Manager from "../manager";
import {ImportanceMap, Import} from "../../../../../lib/lazyLoad"
import NotFoundPage from "../../_page/notFound/notFound"
import { declareComponent } from "../../../../../lib/declareComponent"
import HighlightAbleIcon from "../../../_icon/_highlightAbleIcon/highlightAbleIcon";
import WelcomePage from "../../_page/welcome/welcome"
import ModeOptionPage from "../../_page/modeOptionPage/modeOptionPage"



export default class PageManager extends Manager {
  constructor(pageChangeCallback?: (page: string, sectiones: {[link: string]: HighlightAbleIcon}[], domainLevel: number) => void, sectionChangeCallback?: (section: string) => void, onScroll?: (scrollProgress: number) => void, onUserScroll?: (scrollProgress: number, userInited: boolean) => void) {

    super(new ImportanceMap<() => Promise<any>, any>(
      {
        key: new Import("selectMode", 10, (welcome: typeof WelcomePage) =>
            new welcome()
        ), val: () => import(/* webpackChunkName: "selectMode" */"../../_page/selectPage/selectPage")
      },
      {
        key: new Import("single", 10, (page: typeof ModeOptionPage) =>
            new page("single")
        ), val: () => import(/* webpackChunkName: "modeOptionPage" */"../../_page/modeOptionPage/modeOptionPage")
      },
      {
        key: new Import("4some", 10, (page: typeof ModeOptionPage) =>
            new page("4some")
        ), val: () => import(/* webpackChunkName: "modeOptionPage" */"../../_page/modeOptionPage/modeOptionPage")
      },
      {
        key: new Import("single/run", 10, (page: typeof WelcomePage) =>
            new page()
        ), val: () => import(/* webpackChunkName: "single" */"../../_page/_gamePage/singlePage/singlePage")
      },
      {
        key: new Import("4some/run", 10, (page: typeof WelcomePage) =>
            new page()
        ), val: () => import(/* webpackChunkName: "4some" */"../../_page/_gamePage/4some/4some")
      },
      {
        key: new Import("", 10, (welcome: typeof WelcomePage) =>
            new welcome()
        ), val: () => import(/* webpackChunkName: "welcome" */"../../_page/welcome/welcome")
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