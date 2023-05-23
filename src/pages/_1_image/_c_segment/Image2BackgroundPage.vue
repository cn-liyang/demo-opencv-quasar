<script lang="ts" setup>
const inputId = "inputId";
const inputTplId = "inputTplId";
const outputId = "outputId";

function doCv() {
  const src = cvObj.imread(<HTMLImageElement>document.getElementById(inputId));
  const dst = new cvObj.Mat();
  const gray = new cvObj.Mat();
  const opening = new cvObj.Mat();
  const coinsBg = new cvObj.Mat();
  cvObj.cvtColor(src, gray, cvObj.COLOR_RGBA2GRAY, 0);
  cvObj.threshold(gray, gray, 0, 255, cvObj.THRESH_BINARY_INV + cvObj.THRESH_OTSU);

  const M = new cvObj.Mat.ones(3, 3, cvObj.CV_8U);
  cvObj.erode(gray, gray, M);
  cvObj.dilate(gray, opening, M);
  cvObj.dilate(opening, coinsBg, M, new cvObj.Point(-1, -1), 3);

  cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), gray);
  src.delete();
  dst.delete();
  gray.delete();
  opening.delete();
  coinsBg.delete();
  M.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doCv" />
    <InputImage :id="inputId" :src="$getAssetsImage('coin.png')" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
