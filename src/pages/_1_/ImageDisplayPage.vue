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
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <InputImage :src="$getImage('lena.png')" />
    <!--    <InputFileImage @action="asyncCvIoImageFile" />-->
    <!--    <OutputCanvas />-->
  </div>
</template>
