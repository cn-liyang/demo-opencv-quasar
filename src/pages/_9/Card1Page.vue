<script lang="ts" setup>
const outputId = "outputId";

async function asyncCvIoImageFile(file: File) {
  const src = cvObj.imread(await asyncPicaImgFile2Canvas(file));
  const dst = new cvObj.Mat();
  cvObj.cvtColor(src, src, cvObj.COLOR_RGBA2RGB);
  cvObj.bilateralFilter(src, src, 9, 75, 75, cvObj.BORDER_DEFAULT);
  cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, src);
  src.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <InputFileImage @action="asyncCvIoImageFile" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
