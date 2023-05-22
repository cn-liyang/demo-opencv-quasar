import { boot } from "quasar/wrappers";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $length500: number;
    $routes: typeof routes;
    $routeChildrenMain: typeof routeChildrenMain;
  }
}

export default boot(({ app }) => {
  app.config.globalProperties.$length500 = LENGTH_500;
  app.config.globalProperties.$routes = routes;
  app.config.globalProperties.$routeChildrenMain = routeChildrenMain;
});
