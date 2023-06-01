<script lang="ts" setup>
const outputId = "outputId";

async function asyncCvIoImageFile(file: File) {
  // The native imread and imshow have the channels stored in BGR order.
  const mat = cvObj.imread(await asyncPicaResizeImageFile2Canvas(file));
  cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), mat);
  mat.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <InputFileImage @action="asyncCvIoImageFile" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
