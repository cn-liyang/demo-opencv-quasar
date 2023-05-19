<script lang="ts" setup>
const inputId = "inputId";
const outputId = "outputId";

function doCv() {
  const src = opcv.imread(document.getElementById(inputId) as HTMLImageElement);
  console.log(
    "src image properties:" +
      `\nsize: ${src.size().width}*${src.size().height},` +
      `\ndepth: ${src.depth()},` +
      `\nchannels: ${src.channels()},` +
      `\ntype: ${src.type()}`
  );
  const lowerb = new opcv.Mat(src.rows, src.cols, src.type(), [0, 0, 0, 0]);
  const upperb = new opcv.Mat(src.rows, src.cols, src.type(), [150, 150, 150, 255]);
  const dst = new opcv.Mat();
  opcv.inRange(src, lowerb, upperb, dst);
  console.log(
    "dst image properties:" +
      `\nsize: ${dst.size().width}*${dst.size().height},` +
      `\ndepth: ${dst.depth()},` +
      `\nchannels: ${dst.channels()},` +
      `\ntype: ${dst.type()}`
  );
  opcv.imshow(document.getElementById(outputId) as HTMLCanvasElement, dst);
  src.delete();
  dst.delete();
  lowerb.delete();
  upperb.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doCv" />
    <InputImage :id="inputId" :src="$getAssetsImage('lena.png')" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
