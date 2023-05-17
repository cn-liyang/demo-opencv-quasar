<script lang="ts" setup>
async function asyncCvIoImageFile(file: File) {
  const inputHtmlCanvasElement = await asyncPicaResizeImgFile2Canvas(file);
  // The native imread and imshow have the channels stored in BGR order.
  const src = cvObj.imread(inputHtmlCanvasElement);
  const dst = new cvObj.Mat();
  cvObj.cvtColor(src, dst, cvObj.COLOR_RGBA2GRAY);
  const outputHtmlCanvasElement = document.getElementById(ID_HTML_CANVAS_ELEMENT) as HTMLCanvasElement;
  cvObj.imshow(outputHtmlCanvasElement, dst);
  src.delete();
  dst.delete();
}

const heightModel = ref(0);
const widthModel = ref(0);
function onResize(size: { height: number; width: number }) {
  setRef(heightModel, size.height);
  setRef(widthModel, size.width);
}
const splitterModel = ref(50);
const splitterStyle = computed(() => ({
  height: `${getRef(heightModel)}px`,
  width: `${getRef(widthModel)}px`,
}));
</script>

<template>
  <q-card>
    <q-resize-observer @resize="onResize" :debounce="0" />
    <q-splitter
      v-model="splitterModel"
      before-class="overflow-hidden"
      after-class="overflow-hidden"
      :style="splitterStyle"
      :limits="[0, 100]"
    >
      <template v-slot:before>
        <img :src="$getImage('lena.png')" alt="Input Image" :height="heightModel" :width="widthModel" />
        <!--<img
          src="https://cdn.quasar.dev/img/parallax1.jpg"
          :width="width"
          class="absolute-top-left"
          alt="Input Image"
        />-->
      </template>
      <template v-slot:separator>
        <q-avatar color="primary" text-color="white" size="md" icon="drag_indicator" />
      </template>
      <template v-slot:after>
        <img
          src="https://cdn.quasar.dev/img/parallax1-bw.jpg"
          :height="heightModel"
          :width="widthModel"
          alt="Output Image"
        />
      </template>
    </q-splitter>
  </q-card>
</template>
