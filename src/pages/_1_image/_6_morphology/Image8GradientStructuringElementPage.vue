<script lang="ts" setup>
const inputId = "inputId";
const outputId = "outputId";

function doIt() {
  const src = cvObj.imread(<HTMLImageElement>document.getElementById(inputId));
  const dst = new cvObj.Mat();
  cvObj.cvtColor(src, src, cvObj.COLOR_RGBA2RGB);
  const M = cvObj.getStructuringElement(cvObj.MORPH_CROSS, new cvObj.Size(5, 5));
  cvObj.morphologyEx(src, dst, cvObj.MORPH_GRADIENT, M);
  cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), dst);
  src.delete();
  dst.delete();
  M.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doIt" />
    <InputImage :id="inputId" :src="$getAssetsImage('star.png')" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
