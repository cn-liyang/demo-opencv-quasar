import { boot } from "quasar/wrappers";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $htmlVideoElementId: string;
    $htmlCanvasElementId: string;
  }
}

export default boot(({ app }) => {
  app.config.globalProperties.$htmlVideoElementId = ID_HTML_VIDEO_ELEMENT;
  app.config.globalProperties.$htmlCanvasElementId = ID_HTML_CANVAS_ELEMENT;
});
