<script lang="ts" setup>
function cvCvtColor() {
  const src = cvObj.imread(document.getElementById(ID_HTML_IMAGE_ELEMENT) as HTMLImageElement);
  console.log(
    "src image properties:" +
      `\nwidth: ${src.cols},` +
      `\nheight: ${src.rows},` +
      `\nsize: ${src.size().width}*${src.size().height},` +
      `\ndepth: ${src.depth()},` +
      `\nchannels: ${src.channels()},` +
      `\ntype: ${src.type()}`
  );
  const rect = new cvObj.Rect(100, 100, 100, 100);
  const clo = src.clone();
  const dst = clo.roi(rect);
  cvObj.imshow(document.getElementById(ID_HTML_CANVAS_ELEMENT) as HTMLCanvasElement, dst);
  src.delete();
  dst.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <q-btn color="primary" label="截图" outline rounded @click.prevent="cvCvtColor" />
    <InputImage :src="$getAssetsImage('lena.png')" />
    <OutputCanvas />
  </div>
</template>
