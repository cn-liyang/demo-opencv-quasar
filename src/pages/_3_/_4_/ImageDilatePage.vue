<script lang="ts" setup>
const inputId = "inputId";
const outputId = "outputId";

function doCv() {
  const src = opcv.imread(document.getElementById(inputId) as HTMLImageElement);
  const dst = new opcv.Mat();
  const M = opcv.Mat.ones(5, 5, opcv.CV_8U);
  opcv.dilate(src, dst, M, new opcv.Point(-1, -1), 1, opcv.BORDER_CONSTANT, opcv.morphologyDefaultBorderValue());
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
