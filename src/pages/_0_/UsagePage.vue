<script lang="ts" setup>
async function asyncCvIoImageFile(file: File) {
  const inputHtmlCanvasElement = await asyncPicaResizeImgFile2Canvas(file);
  // The native imread and imshow have the channels stored in BGR order.
  const mat = cvObj.imread(inputHtmlCanvasElement);
  const outputHtmlCanvasElement = document.getElementById(ID_HTML_CANVAS_ELEMENT) as HTMLCanvasElement;
  cvObj.imshow(outputHtmlCanvasElement, mat);
  mat.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <InputFileImage @action="asyncCvIoImageFile" />
    <OutputCanvas />
  </div>
</template>
