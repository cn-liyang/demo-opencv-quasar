<script lang="ts" setup>
const inputId = "inputId";
const outputId = "outputId";

function doCv() {
  const src = opcv.imread(document.getElementById(inputId) as HTMLImageElement);
  const dst = new opcv.Mat();
  opcv.cvtColor(src, src, opcv.COLOR_RGBA2RGB);
  const M = opcv.Mat.ones(53, 53, opcv.CV_8U);
  opcv.morphologyEx(src, dst, opcv.MORPH_BLACKHAT, M);
  opcv.imshow(document.getElementById(outputId) as HTMLCanvasElement, dst);
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
