<script lang="ts" setup>
const inputId = "inputId";
const outputId = "outputId";

function doCv() {
  const src = cvObj.imread(document.getElementById(inputId) as HTMLImageElement);
  const dst = new cvObj.Mat.zeros(src.cols, src.rows, cvObj.CV_8UC3);
  cvObj.cvtColor(src, src, cvObj.COLOR_RGBA2GRAY, 0);
  cvObj.threshold(src, src, 120, 200, cvObj.THRESH_BINARY);
  const contours = new cvObj.MatVector();
  const hierarchy = new cvObj.Mat();
  cvObj.findContours(src, contours, hierarchy, cvObj.RETR_CCOMP, cvObj.CHAIN_APPROX_SIMPLE);
  const poly = new cvObj.MatVector();
  for (let i = 0; i < contours.size(); ++i) {
    const tmp = new cvObj.Mat();
    const cnt = contours.get(i);
    cvObj.approxPolyDP(cnt, tmp, 3, true); // core
    poly.push_back(tmp);
    cnt.delete();
    tmp.delete();
  }
  for (let i = 0; i < poly.size(); ++i) {
    const color = new cvObj.Scalar(
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255)
    );
    cvObj.drawContours(dst, poly, i, color, 1, cvObj.LINE_8, hierarchy, 0);
  }
  cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, dst);
  src.delete();
  dst.delete();
  contours.delete();
  hierarchy.delete();
  poly.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doCv" />
    <InputImage :id="inputId" :src="$getAssetsImage('star.png')" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
