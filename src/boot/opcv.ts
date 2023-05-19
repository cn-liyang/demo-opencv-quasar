import { boot } from "quasar/wrappers";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $opcv: typeof opcv;
  }
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const opcv = cv;

export default boot(({ app }) => {
  app.config.globalProperties.$opcv = opcv;
});

export { opcv };
