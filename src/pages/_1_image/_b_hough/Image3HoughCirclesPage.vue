<script lang="ts" setup>
const inputId = "inputId";
const outputId = "outputId";

function doIt() {
  const src = cvObj.imread(<HTMLImageElement>document.getElementById(inputId));
  const dst = new cvObj.Mat.zeros(src.rows, src.cols, cvObj.CV_8U);
  const circles = new cvObj.Mat();
  cvObj.cvtColor(src, src, cvObj.COLOR_RGBA2GRAY, 0);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cvObj.HoughCircles(src, circles, cvObj.HOUGH_GRADIENT, 1, 45, 75, 40, 0, 0); // core
  for (let i = 0; i < circles.cols; ++i) {
    const x = circles.data32F[i * 3];
    const y = circles.data32F[i * 3 + 1];
    const radius = circles.data32F[i * 3 + 2];
    const center = new cvObj.Point(x, y);
    const color = new cvObj.Scalar(255, 0, 0);
    cvObj.circle(dst, center, radius, color);
  }
  cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), dst);
  src.delete();
  dst.delete();
  circles.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doIt" />
    <InputImage :id="inputId" :src="$getAssetsImage('coin.png')" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
