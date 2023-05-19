<script lang="ts" setup>
const inputId = "inputId";
const outputId1 = "outputId1";
const outputId2 = "outputId2";

function doCv() {
  const src = opcv.imread(document.getElementById(inputId) as HTMLImageElement);
  const dstx = new opcv.Mat();
  const absDstx = new opcv.Mat();
  opcv.cvtColor(src, src, opcv.COLOR_RGB2GRAY, 0);
  opcv.Sobel(src, dstx, opcv.CV_8U, 1, 0, 3, 1, 0, opcv.BORDER_DEFAULT);
  opcv.Sobel(src, absDstx, opcv.CV_64F, 1, 0, 3, 1, 0, opcv.BORDER_DEFAULT);
  opcv.convertScaleAbs(absDstx, absDstx, 1, 0);
  opcv.imshow(document.getElementById(outputId1) as HTMLCanvasElement, dstx);
  opcv.imshow(document.getElementById(outputId2) as HTMLCanvasElement, absDstx);
  src.delete();
  dstx.delete();
  absDstx.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doCv" />
    <InputImage :id="inputId" :src="$getAssetsImage('lena.png')" />
    <div class="row no-wrap items-center q-gutter-x-md">
      <OutputCanvas :id="outputId1" />
      <OutputCanvas :id="outputId2" />
    </div>
  </div>
</template>
