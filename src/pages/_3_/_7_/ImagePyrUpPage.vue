<script lang="ts" setup>
const inputId = "inputId";
const outputId = "outputId";

function doCv() {
  const src = opcv.imread(document.getElementById(inputId) as HTMLImageElement);
  const dst = new opcv.Mat();
  opcv.pyrUp(src, dst, new opcv.Size(0, 0), opcv.BORDER_DEFAULT);
  opcv.imshow(document.getElementById(outputId) as HTMLCanvasElement, dst);
  src.delete();
  dst.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doCv" />
    <InputImage :id="inputId" :src="$getAssetsImage('lena.png')" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
