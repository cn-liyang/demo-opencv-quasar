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
  const unknown = new cvObj.Mat();
  const markers = new cvObj.Mat();
  cvObj.cvtColor(src, gray, cvObj.COLOR_RGBA2GRAY, 0);
  cvObj.threshold(gray, gray, 0, 255, cvObj.THRESH_BINARY_INV + cvObj.THRESH_OTSU);
  // get background
  const M = new cvObj.Mat.ones(3, 3, cvObj.CV_8U);
  cvObj.erode(gray, gray, M);
  cvObj.dilate(gray, opening, M);
  cvObj.dilate(opening, coinsBg, M, new cvObj.Point(-1, -1), 3);
  // distance transform
  cvObj.distanceTransform(opening, distTrans, cvObj.DIST_L2, 5);
  cvObj.normalize(distTrans, distTrans, 1, 0, cvObj.NORM_INF);
  // get foreground
  cvObj.threshold(distTrans, coinsFg, 0.7, 255, cvObj.THRESH_BINARY);
  coinsFg.convertTo(coinsFg, cvObj.CV_8U, 1, 0);
  cvObj.subtract(coinsBg, coinsFg, unknown);
  // get connected components markers
  cvObj.connectedComponents(coinsFg, markers);
  for (let i = 0; i < markers.rows; i++) {
    for (let j = 0; j < markers.cols; j++) {
      markers.intPtr(i, j)[0] = markers.ucharPtr(i, j)[0] + 1;
      if (unknown.ucharPtr(i, j)[0] == 255) {
        markers.intPtr(i, j)[0] = 0;
      }
    }
  }
  cvObj.cvtColor(src, src, cvObj.COLOR_RGBA2RGB);
  cvObj.watershed(src, markers);
  // draw barriers
  for (let i = 0; i < markers.rows; i++) {
    for (let j = 0; j < markers.cols; j++) {
      if (markers.intPtr(i, j)[0] == -1) {
        src.ucharPtr(i, j)[0] = 255; // R
        src.ucharPtr(i, j)[1] = 0; // G
        src.ucharPtr(i, j)[2] = 0; // B
      }
    }
  }
  cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, src);
  src.delete();
  dst.delete();
  gray.delete();
  opening.delete();
  coinsBg.delete();
  coinsFg.delete();
  distTrans.delete();
  unknown.delete();
  markers.delete();
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
