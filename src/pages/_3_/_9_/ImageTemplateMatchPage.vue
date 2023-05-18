<script lang="ts" setup>
const inputId = "inputId";
const inputTpltId = "inputTpltId";
const outputId = "outputId";

function doCv() {
  const src = cvObj.imread(document.getElementById(inputId) as HTMLImageElement);
  const templ = cvObj.imread(document.getElementById(inputTpltId) as HTMLImageElement);
  const dst = new cvObj.Mat();
  const mask = new cvObj.Mat();
  cvObj.matchTemplate(src, templ, dst, cvObj.TM_CCOEFF, mask);
  const result = cvObj.minMaxLoc(dst, mask);
  const maxPoint = result.maxLoc;
  const color = new cvObj.Scalar(255, 0, 0, 255);
  const point = new cvObj.Point(maxPoint.x + templ.cols, maxPoint.y + templ.rows);
  cvObj.rectangle(src, maxPoint, point, color, 2, cvObj.LINE_8, 0);
  cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, dst);
  src.delete();
  dst.delete();
  mask.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doCv" />
    <InputImage :src="$getAssetsImage('lena.png')" :id="inputId" />
    <InputImage :src="$getAssetsImage('lena-tplt.png')" :id="inputTpltId" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
