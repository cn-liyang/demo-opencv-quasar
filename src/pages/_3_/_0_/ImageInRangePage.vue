<script lang="ts" setup>
function doCv() {
  const src = cvObj.imread(document.getElementById(ID_HTML_IMAGE_ELEMENT) as HTMLImageElement);
  console.log(
    "src image properties:" +
      `\nsize: ${src.size().width}*${src.size().height},` +
      `\ndepth: ${src.depth()},` +
      `\nchannels: ${src.channels()},` +
      `\ntype: ${src.type()}`
  );
  const lowerb = new cvObj.Mat(src.rows, src.cols, src.type(), [0, 0, 0, 0]);
  const upperb = new cvObj.Mat(src.rows, src.cols, src.type(), [150, 150, 150, 255]);
  const dst = new cvObj.Mat();
  cvObj.inRange(src, lowerb, upperb, dst);
  console.log(
    "dst image properties:" +
      `\nsize: ${dst.size().width}*${dst.size().height},` +
      `\ndepth: ${dst.depth()},` +
      `\nchannels: ${dst.channels()},` +
      `\ntype: ${dst.type()}`
  );
  cvObj.imshow(document.getElementById(ID_HTML_CANVAS_ELEMENT) as HTMLCanvasElement, dst);
  src.delete();
  dst.delete();
  lowerb.delete();
  upperb.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doCv" />
    <InputImage :src="$getAssetsImage('lena.png')" />
    <OutputCanvas />
  </div>
</template>
