<script lang="ts" setup>
async function asyncCvIoImageFile(file: File) {
  const htmlCanvasElementInput = await asyncPicaResizeImgFile2Canvas(file);
  const mat = cvObj.imread(htmlCanvasElementInput);
  const htmlCanvasElementOutput = document.getElementById(ID_HTML_CANVAS_ELEMENT) as HTMLCanvasElement;
  cvObj.imshow(htmlCanvasElementOutput, mat);
  mat.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ImageFileInput @action="asyncCvIoImageFile" />
    <ImageFileOutput />
  </div>
</template>
