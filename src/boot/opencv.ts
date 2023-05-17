import { boot } from "quasar/wrappers";
import cv from "@techstark/opencv-js";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $cvObj: typeof cv;
  }
}

const cvObj = cv;

export default boot(({ app }) => {
  app.config.globalProperties.$cvObj = cvObj;
});

export { cvObj };
