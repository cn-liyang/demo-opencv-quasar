<script lang="ts" setup>
const inputId = "inputId";
const outputId = "outputId";

function doIt() {
  const src = cvObj.imread(<HTMLImageElement>document.getElementById(inputId));
  const dst = new cvObj.Mat.zeros(src.cols, src.rows, cvObj.CV_8UC3);
  cvObj.cvtColor(src, src, cvObj.COLOR_RGBA2GRAY, 0);
  cvObj.threshold(src, src, 120, 200, cvObj.THRESH_BINARY);
  const contours = new cvObj.MatVector();
  const hierarchy = new cvObj.Mat();
  cvObj.findContours(src, contours, hierarchy, cvObj.RETR_CCOMP, cvObj.CHAIN_APPROX_SIMPLE);
  const hull = new cvObj.MatVector();
  for (let i = 0; i < contours.size(); ++i) {
    const tmp = new cvObj.Mat();
    const cnt = contours.get(i);
    cvObj.convexHull(cnt, tmp); // core
    hull.push_back(tmp);
    cnt.delete();
    tmp.delete();
  }
  for (let i = 0; i < hull.size(); ++i) {
    const color = new cvObj.Scalar(
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255)
    );
    cvObj.drawContours(dst, hull, i, color, 1, cvObj.LINE_8, hierarchy, 0);
  }
  cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), dst);
  src.delete();
  dst.delete();
  contours.delete();
  hierarchy.delete();
  hull.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doIt" />
    <InputImage :id="inputId" :src="$getAssetsImage('star.png')" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
