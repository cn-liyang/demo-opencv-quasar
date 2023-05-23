<script lang="ts" setup>
const inputId = "inputId";
const outputId = "outputId";

function doCv() {
  const src = cvObj.imread(<HTMLImageElement>document.getElementById(inputId));
  const dst = new cvObj.Mat.zeros(src.cols, src.rows, cvObj.CV_8UC3);
  cvObj.cvtColor(src, src, cvObj.COLOR_RGBA2GRAY, 0);
  cvObj.threshold(src, src, 120, 200, cvObj.THRESH_BINARY);
  const contours = new cvObj.MatVector();
  const hierarchy = new cvObj.Mat();
  const line = new cvObj.Mat();
  cvObj.findContours(src, contours, hierarchy, cvObj.RETR_CCOMP, cvObj.CHAIN_APPROX_SIMPLE);
  const cnt = contours.get(0);
  const ellipse = cvObj.fitLine(cnt, line, cvObj.DIST_L2, 0, 0.01, 0.01); // core
  const contoursColor = new cvObj.Scalar(0, 255, 0);
  const lineColor = new cvObj.Scalar(255, 0, 0);
  cvObj.drawContours(dst, contours, 0, contoursColor, 1, cvObj.LINE_8, hierarchy, 100);
  const vx = line.data32F[0];
  const vy = line.data32F[1];
  const x = line.data32F[2];
  const y = line.data32F[3];
  const lefty = Math.round((-x * vy) / vx + y);
  const righty = Math.round(((src.cols - x) * vy) / vx + y);
  const point1 = new cvObj.Point(src.cols - 1, righty);
  const point2 = new cvObj.Point(0, lefty);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cvObj.line(dst, point1, point2, lineColor, 2, cvObj.LINE_AA, 0); // core
  cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), dst);
  src.delete();
  dst.delete();
  contours.delete();
  hierarchy.delete();
  line.delete();
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
