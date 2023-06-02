<script lang="ts" setup>
const outputId = "outputId";

async function asyncInputImageFile(file: File) {
  const htmlCanvasElement = await asyncPicaResizeImageFile2Canvas(file);
  // The native imread and imshow have the channels stored in BGR order.
  const mat = cvObj.imread(htmlCanvasElement);
  cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), mat);
  mat.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <InputFileImage @action="asyncInputImageFile" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
