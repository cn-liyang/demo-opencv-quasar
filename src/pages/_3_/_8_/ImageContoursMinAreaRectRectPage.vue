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
  const cnt = contours.get(0);
  const rotatedRect = cvObj.minAreaRect(cnt); // core
  rotatedRect.points();
  const contoursColor = new cvObj.Scalar(0, 255, 0);
  const rectangleColor = new cvObj.Scalar(255, 0, 0);
  cvObj.drawContours(dst, contours, 0, contoursColor, 1, cvObj.LINE_8, hierarchy, 100);
  const point1 = new cvObj.Point(rect.x, rect.y);
  const point2 = new cvObj.Point(rect.x + rect.width, rect.y + rect.height);
  cvObj.rectangle(dst, point1, point2, rectangleColor, 1, cvObj.LINE_AA, 0);
  cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, dst);
  src.delete();
  dst.delete();
  contours.delete();
  hierarchy.delete();
  cnt.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doCv" />
    <InputImage :id="inputId" :src="$getAssetsImage('star.png')" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
