import { boot } from "quasar/wrappers";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $htmlVideoElementId: string;
    $htmlImageElementId: string;
    $htmlCanvasElementId: string;
    $htmlCanvasElementIdX: string;
    $htmlCanvasElementIdY: string;
    $sizeInch6Width: number;
    $sizeInch6Height: number;
    $sizeSquare: number;
    $routes: typeof routes;
    $routeMainChildren: typeof routeMainChildren;
    $qTabs: typeof Q_TABS;
  }
}

export default boot(({ app }) => {
  app.config.globalProperties.$htmlVideoElementId = ID_HTML_VIDEO_ELEMENT;
  app.config.globalProperties.$htmlImageElementId = ID_HTML_IMAGE_ELEMENT;
  app.config.globalProperties.$htmlCanvasElementId = ID_HTML_CANVAS_ELEMENT;
  app.config.globalProperties.$htmlCanvasElementIdX = ID_HTML_CANVAS_ELEMENT_X;
  app.config.globalProperties.$htmlCanvasElementIdY = ID_HTML_CANVAS_ELEMENT_Y;
  app.config.globalProperties.$sizeInch6Width = SIZE_INCH6_WIDTH;
  app.config.globalProperties.$sizeInch6Height = SIZE_INCH6_HEIGHT;
  app.config.globalProperties.$sizeSquare = SIZE_SQUARE;
  app.config.globalProperties.$routes = routes;
  app.config.globalProperties.$routeMainChildren = routeMainChildren;
  app.config.globalProperties.$qTabs = Q_TABS;
});
