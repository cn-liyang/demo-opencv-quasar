<script lang="ts" setup>
const inputId = "inputId";
const outputId = "outputId";

function doCv() {
  const src = opcv.imread(document.getElementById(inputId) as HTMLImageElement);
  const dst = opcv.Mat.zeros(src.cols, src.rows, opcv.CV_8UC3);
  opcv.cvtColor(src, src, opcv.COLOR_RGBA2GRAY, 0);
  opcv.threshold(src, src, 120, 200, opcv.THRESH_BINARY);
  const contours = new opcv.MatVector();
  const hierarchy = new opcv.Mat();
  opcv.findContours(src, contours, hierarchy, opcv.RETR_CCOMP, opcv.CHAIN_APPROX_SIMPLE);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  for (let i = 0; i < contours.size(); ++i) {
    const color = new opcv.Scalar(
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255)
    );
    opcv.drawContours(dst, contours, i, color, 1, opcv.LINE_8, hierarchy, 100);
  }
  opcv.imshow(document.getElementById(outputId) as HTMLCanvasElement, dst);
  src.delete();
  dst.delete();
  contours.delete();
  hierarchy.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doCv" />
    <InputImage :id="inputId" :src="$getAssetsImage('lena.png')" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
