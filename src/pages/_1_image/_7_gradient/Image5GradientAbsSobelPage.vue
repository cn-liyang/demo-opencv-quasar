<script lang="ts" setup>
const inputId = "inputId";
const outputId1 = "outputId1";
const outputId2 = "outputId2";

function doIt() {
  const src = cvObj.imread(<HTMLImageElement>document.getElementById(inputId));
  const dstx = new cvObj.Mat();
  const absDstx = new cvObj.Mat();
  cvObj.cvtColor(src, src, cvObj.COLOR_RGB2GRAY, 0);
  cvObj.Sobel(src, dstx, cvObj.CV_8U, 1, 0, 3, 1, 0, cvObj.BORDER_DEFAULT);
  cvObj.Sobel(src, absDstx, cvObj.CV_64F, 1, 0, 3, 1, 0, cvObj.BORDER_DEFAULT);
  cvObj.convertScaleAbs(absDstx, absDstx, 1, 0);
  cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId1), dstx);
  cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId2), absDstx);
  src.delete();
  dstx.delete();
  absDstx.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doIt" />
    <InputImage :id="inputId" :src="$getAssetsImage('lena.png')" />
    <div class="row no-wrap items-center q-gutter-x-md">
      <OutputCanvas :id="outputId1" />
      <OutputCanvas :id="outputId2" />
    </div>
  </div>
</template>
