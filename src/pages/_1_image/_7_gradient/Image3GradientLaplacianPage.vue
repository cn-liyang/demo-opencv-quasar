<script lang="ts" setup>
const inputId = "inputId";
const outputId = "outputId";

function doIt() {
  const src = cvObj.imread(<HTMLImageElement>document.getElementById(inputId));
  const dst = new cvObj.Mat();
  cvObj.cvtColor(src, src, cvObj.COLOR_RGB2GRAY, 0);
  cvObj.Laplacian(src, dst, cvObj.CV_8U, 1, 1, 0, cvObj.BORDER_DEFAULT);
  cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), dst);
  src.delete();
  dst.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doIt" />
    <InputImage :id="inputId" :src="$getAssetsImage('lena.png')" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
