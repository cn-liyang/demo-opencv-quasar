<script lang="ts" setup>
const inputId = "inputId";
const inputTplId = "inputTplId";
const outputId = "outputId";

function doCv() {
  const src = cvObj.imread(document.getElementById(inputId) as HTMLImageElement);
  const dst = new cvObj.Mat();
  const gray = new cvObj.Mat();
  const opening = new cvObj.Mat();
  const coinsBg = new cvObj.Mat();
  const coinsFg = new cvObj.Mat();
  const distTrans = new cvObj.Mat();
  cvObj.cvtColor(src, gray, cvObj.COLOR_RGBA2GRAY, 0);
  cvObj.threshold(gray, gray, 0, 255, cvObj.THRESH_BINARY_INV + cvObj.THRESH_OTSU);

  const M = new cvObj.Mat.ones(3, 3, cvObj.CV_8U);
  cvObj.erode(gray, gray, M);
  cvObj.dilate(gray, opening, M);
  cvObj.dilate(opening, coinsBg, M, new cvObj.Point(-1, -1), 3);
  cvObj.distanceTransform(opening, distTrans, cvObj.DIST_L2, 5);
  cvObj.normalize(distTrans, distTrans, 1, 0, cvObj.NORM_INF);

  cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, distTrans);
  src.delete();
  dst.delete();
  gray.delete();
  opening.delete();
  coinsBg.delete();
  coinsFg.delete();
  distTrans.delete();
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
