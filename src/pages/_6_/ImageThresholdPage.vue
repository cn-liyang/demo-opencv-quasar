<script lang="ts" setup>
const inputId = "inputId";
const inputTplId = "inputTplId";
const outputId = "outputId";

function doCv() {
  const src = cvObj.imread(document.getElementById(inputId) as HTMLImageElement);
  const tpl = cvObj.imread(document.getElementById(inputTplId) as HTMLImageElement);
  const dst = new cvObj.Mat();
  const mask = new cvObj.Mat();
  cvObj.matchTemplate(src, tpl, dst, cvObj.TM_CCOEFF, mask);
  const result = cvObj.minMaxLoc(dst, mask);
  const maxPoint = result.maxLoc;
  const color = new cvObj.Scalar(255, 0, 0, 255);
  const point = new cvObj.Point(maxPoint.x + tpl.cols, maxPoint.y + tpl.rows);
  cvObj.rectangle(src, maxPoint, point, color, 1, cvObj.LINE_8, 0);
  cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, src);
  src.delete();
  dst.delete();
  mask.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doCv" />
    <InputImage :id="inputId" :src="$getAssetsImage('lena.png')" />
    <InputImage :id="inputTplId" :src="$getAssetsImage('lena-tpl.png')" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
