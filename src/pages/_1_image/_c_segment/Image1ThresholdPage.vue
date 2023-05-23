<script lang="ts" setup>
const inputId = "inputId";
const inputTplId = "inputTplId";
const outputId = "outputId";

function doCv() {
  const src = cvObj.imread(<HTMLImageElement>document.getElementById(inputId));
  const dst = new cvObj.Mat();
  const gray = new cvObj.Mat();
  cvObj.cvtColor(src, gray, cvObj.COLOR_RGBA2GRAY, 0);
  cvObj.threshold(gray, gray, 0, 255, cvObj.THRESH_BINARY_INV + cvObj.THRESH_OTSU);
  cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), gray);
  src.delete();
  dst.delete();
  gray.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doCv" />
    <InputImage :id="inputId" :src="$getAssetsImage('coin.png')" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
