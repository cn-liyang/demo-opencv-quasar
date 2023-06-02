<script lang="ts" setup>
const inputId = "inputId";
const outputId = "outputId";

function doIt() {
  const src = cvObj.imread(<HTMLImageElement>document.getElementById(inputId));
  const dst = new cvObj.Mat.zeros(src.rows, src.cols, cvObj.CV_8UC3);
  const lines = new cvObj.Mat();
  cvObj.cvtColor(src, src, cvObj.COLOR_RGBA2GRAY, 0);
  cvObj.Canny(src, src, 50, 200);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cvObj.HoughLinesP(src, lines, 1, Math.PI / 180, 2, 0, 0); // core
  for (let i = 0; i < lines.rows; ++i) {
    const startPoint = new cvObj.Point(lines.data32S[i * 4], lines.data32S[i * 4 + 1]);
    const endPoint = new cvObj.Point(lines.data32S[i * 4 + 2], lines.data32S[i * 4 + 3]);
    const color = new cvObj.Scalar(255, 0, 0);
    cvObj.line(dst, startPoint, endPoint, color);
  }
  cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), dst);
  src.delete();
  dst.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doIt" />
    <InputImage :id="inputId" :src="$getAssetsImage('star.png')" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
