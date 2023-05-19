import { boot } from "quasar/wrappers";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $cvObj: typeof cvObj;
  }
}

const cvObj = cv;

export default boot(({ app }) => {
  app.config.globalProperties.$cvObj = cvObj;
});

export { cvObj };
