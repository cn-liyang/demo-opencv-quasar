<script lang="ts" setup>
const outputId = "outputId";

async function asyncCvIoImageFile(file: File) {
  // The native imread and imshow have the channels stored in BGR order.
  const mat = cvObj.imread(await asyncPicaResizeImgFile2Canvas(file));
  cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, mat);
  mat.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <InputFileImage @action="asyncCvIoImageFile" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
