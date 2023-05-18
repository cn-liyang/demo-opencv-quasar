<script lang="ts" setup>
function doCv() {
  const src = cvObj.imread(document.getElementById(ID_HTML_IMAGE_ELEMENT) as HTMLImageElement);
  const dst = new cvObj.Mat();
  cvObj.cvtColor(src, src, cvObj.COLOR_RGBA2RGB);
  const M = cvObj.getStructuringElement(cvObj.MORPH_CROSS, new cvObj.Size(5, 5));
  cvObj.morphologyEx(src, dst, cvObj.MORPH_GRADIENT, M);
  cvObj.imshow(document.getElementById(ID_HTML_CANVAS_ELEMENT) as HTMLCanvasElement, dst);
  src.delete();
  dst.delete();
  M.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doCv" />
    <InputImage :src="$getAssetsImage('star.png')" />
    <OutputCanvas />
  </div>
</template>
