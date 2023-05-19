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
  const dst = new opcv.Mat();
  const dsize = new opcv.Size(src.rows, src.cols);
  const center = new opcv.Point(src.cols / 2, src.rows / 2);
  const M = opcv.getRotationMatrix2D(center, 45, 1);
  opcv.warpAffine(src, dst, M, dsize, opcv.INTER_LINEAR, opcv.BORDER_CONSTANT, new opcv.Scalar());
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
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doCv" />
    <InputImage :id="inputId" :src="$getAssetsImage('lena.png')" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
