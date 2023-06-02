<script lang="ts" setup>
const inputId = "inputId";
const outputId = "outputId";

function doIt() {
  const src = cvObj.imread(<HTMLImageElement>document.getElementById(inputId));
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
