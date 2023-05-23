<script lang="ts" setup>
const inputId = "inputId";
const outputId = "outputId";

function doCv() {
  const src = cvObj.imread(<HTMLImageElement>document.getElementById(inputId));
  const dst = new cvObj.Mat.zeros(src.rows, src.cols, cvObj.CV_8UC3);
  const lines = new cvObj.Mat();
  cvObj.cvtColor(src, src, cvObj.COLOR_RGBA2GRAY, 0);
  cvObj.Canny(src, src, 50, 200);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cvObj.HoughLines(src, lines, 1, Math.PI / 180, 30, 0, 0, 0, Math.PI); // core
  for (let i = 0; i < lines.rows; ++i) {
    const rho = lines.data32F[i * 2];
    const theta = lines.data32F[i * 2 + 1];
    const a = Math.cos(theta);
    const b = Math.sin(theta);
    const x0 = a * rho;
    const y0 = b * rho;
    const startPoint = { x: x0 - 1000 * b, y: y0 + 1000 * a };
    const endPoint = { x: x0 + 1000 * b, y: y0 - 1000 * a };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cvObj.line(dst, startPoint, endPoint, [255, 0, 0, 255]);
  }
  cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), dst);
  src.delete();
  dst.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doCv" />
    <InputImage :id="inputId" :src="$getAssetsImage('star.png')" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
