import { boot } from "quasar/wrappers";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $getAssetsImage: typeof getAssetsImage;
  }
}

export default boot(({ app }) => {
  app.config.globalProperties.$getAssetsImage = getAssetsImage;
});
