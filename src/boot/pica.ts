import { boot } from "quasar/wrappers";
import pica, { Pica } from "pica";
import imageBlobReduce, { ImageBlobReduce } from "image-blob-reduce";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $picaObj: Pica;
    $picaReducer: ImageBlobReduce;
  }
}

const picaObj = pica();
const picaReducer = imageBlobReduce();

export default boot(({ app }) => {
  app.config.globalProperties.$picaObj = picaObj;
  app.config.globalProperties.$picaReducer = picaReducer;
});

export { picaObj, picaReducer };
