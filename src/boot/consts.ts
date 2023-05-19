import { boot } from "quasar/wrappers";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $sizeInch6Width: number;
    $sizeInch6Height: number;
    $sizeSquare: number;
    $routes: typeof routes;
    $routeChildrenMain: typeof routeChildrenMain;
  }
}

export default boot(({ app }) => {
  app.config.globalProperties.$sizeInch6Width = SIZE_INCH6_WIDTH;
  app.config.globalProperties.$sizeInch6Height = SIZE_INCH6_HEIGHT;
  app.config.globalProperties.$sizeSquare = SIZE_SQUARE;
  app.config.globalProperties.$routes = routes;
  app.config.globalProperties.$routeChildrenMain = routeChildrenMain;
});
