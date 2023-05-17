import { boot } from "quasar/wrappers";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $htmlVideoElementId: string;
    $htmlImageElementId: string;
    $htmlCanvasElementId: string;
    $getImage: (name: string) => string;
  }
}

export default boot(({ app }) => {
  app.config.globalProperties.$htmlVideoElementId = ID_HTML_VIDEO_ELEMENT;
  app.config.globalProperties.$htmlImageElementId = ID_HTML_IMAGE_ELEMENT;
  app.config.globalProperties.$htmlCanvasElementId = ID_HTML_CANVAS_ELEMENT;
  app.config.globalProperties.$getImage = (name: string) => `src/assets/${name}`;
});
