<script lang="ts" setup>
const inputId = "inputId";
const inputTpltId = "inputTpltId";
const outputId = "outputId";

function doCv() {
  const src = opcv.imread(document.getElementById(inputId) as HTMLImageElement);
  const tplt = opcv.imread(document.getElementById(inputTpltId) as HTMLImageElement);
  const dst = new opcv.Mat();
  const mask = new opcv.Mat();
  opcv.matchTemplate(src, tplt, dst, opcv.TM_CCOEFF, mask);
  const result = opcv.minMaxLoc(dst, mask);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const maxPoint = result.maxLoc;
  const color = new opcv.Scalar(255, 0, 0, 255);
  const point = new opcv.Point(maxPoint.x + tplt.cols, maxPoint.y + tplt.rows);
  opcv.rectangle(src, maxPoint, point, color, 1, opcv.LINE_8, 0);
  opcv.imshow(document.getElementById(outputId) as HTMLCanvasElement, src);
  src.delete();
  dst.delete();
  mask.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doCv" />
    <InputImage :id="inputId" :src="$getAssetsImage('lena.png')" />
    <InputImage :id="inputTpltId" :src="$getAssetsImage('lena-tplt.png')" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
