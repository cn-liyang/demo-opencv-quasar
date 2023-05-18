<script lang="ts" setup>
function doCv() {
  const src = cvObj.imread(document.getElementById(ID_HTML_IMAGE_ELEMENT) as HTMLImageElement);
  const dst = new cvObj.Mat();
  const M = cvObj.Mat.ones(5, 5, cvObj.CV_8U);
  cvObj.dilate(src, dst, M, new cvObj.Point(-1, -1), 1, cvObj.BORDER_CONSTANT, cvObj.morphologyDefaultBorderValue());
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
