<script lang="ts" setup>
function doCv() {
  const src = cvObj.imread(document.getElementById(ID_HTML_IMAGE_ELEMENT) as HTMLImageElement);
  const dst = new cvObj.Mat();
  cvObj.pyrDown(src, dst, new cvObj.Size(0, 0), cvObj.BORDER_DEFAULT);
  cvObj.imshow(document.getElementById(ID_HTML_CANVAS_ELEMENT) as HTMLCanvasElement, dst);
  src.delete();
  dst.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doCv" />
    <InputImage :src="$getAssetsImage('lena.png')" />
    <OutputCanvas />
  </div>
</template>
