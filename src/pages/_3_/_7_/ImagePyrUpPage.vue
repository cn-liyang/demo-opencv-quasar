<script lang="ts" setup>
const inputId = "inputId";
const outputId = "outputId";

function doCv() {
  const src = cvObj.imread(document.getElementById(inputId) as HTMLImageElement);
  const dst = new cvObj.Mat();
  cvObj.pyrUp(src, dst, new cvObj.Size(0, 0), cvObj.BORDER_DEFAULT);
  cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, dst);
  src.delete();
  dst.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doCv" />
    <InputImage :src="$getAssetsImage('lena.png')" :id="inputId" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
