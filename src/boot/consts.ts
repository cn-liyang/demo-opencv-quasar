import { boot } from "quasar/wrappers";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $routes: typeof routes;
    $routeChildrenMain: typeof routeChildrenMain;
  }
}

export default boot(({ app }) => {
  app.config.globalProperties.$routes = routes;
  app.config.globalProperties.$routeChildrenMain = routeChildrenMain;
});
