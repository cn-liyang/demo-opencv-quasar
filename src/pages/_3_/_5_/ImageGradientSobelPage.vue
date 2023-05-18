<script lang="ts" setup>
function doCv() {
  const src = cvObj.imread(document.getElementById(ID_HTML_IMAGE_ELEMENT) as HTMLImageElement);
  const dstx = new cvObj.Mat();
  const dsty = new cvObj.Mat();
  cvObj.cvtColor(src, src, cvObj.COLOR_RGB2GRAY, 0);
  cvObj.Sobel(src, dstx, cvObj.CV_8U, 1, 0, 3, 1, 0, cvObj.BORDER_DEFAULT);
  cvObj.Sobel(src, dsty, cvObj.CV_8U, 0, 1, 3, 1, 0, cvObj.BORDER_DEFAULT);
  cvObj.imshow(document.getElementById(ID_HTML_CANVAS_ELEMENT_X) as HTMLCanvasElement, dstx);
  cvObj.imshow(document.getElementById(ID_HTML_CANVAS_ELEMENT_Y) as HTMLCanvasElement, dsty);
  src.delete();
  dstx.delete();
  dsty.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doCv" />
    <InputImage :src="$getAssetsImage('lena.png')" />
    <div class="row no-wrap items-center q-gutter-x-md">
      <OutputCanvasX />
      <OutputCanvasY />
    </div>
  </div>
</template>
