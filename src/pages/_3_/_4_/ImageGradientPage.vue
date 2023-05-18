<script lang="ts" setup>
const inputId = "inputId";
const outputId = "outputId";

function doCv() {
  const src = cvObj.imread(document.getElementById(inputId) as HTMLImageElement);
  const dst = new cvObj.Mat();
  cvObj.cvtColor(src, src, cvObj.COLOR_RGBA2RGB);
  const M = cvObj.Mat.ones(5, 5, cvObj.CV_8U);
  cvObj.morphologyEx(src, dst, cvObj.MORPH_GRADIENT, M);
  cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, dst);
  src.delete();
  dst.delete();
  M.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doCv" />
    <InputImage :src="$getAssetsImage('star.png')" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
