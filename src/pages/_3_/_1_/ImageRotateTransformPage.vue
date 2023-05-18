<script lang="ts" setup>
const inputId = "inputId";
const outputId = "outputId";

function doCv() {
  const src = cvObj.imread(document.getElementById(inputId) as HTMLImageElement);
  console.log(
    "src image properties:" +
      `\nsize: ${src.size().width}*${src.size().height},` +
      `\ndepth: ${src.depth()},` +
      `\nchannels: ${src.channels()},` +
      `\ntype: ${src.type()}`
  );
  const dst = new cvObj.Mat();
  const dsize = new cvObj.Size(src.rows, src.cols);
  const center = new cvObj.Point(src.cols / 2, src.rows / 2);
  const M = cvObj.getRotationMatrix2D(center, 45, 1);
  cvObj.warpAffine(src, dst, M, dsize, cvObj.INTER_LINEAR, cvObj.BORDER_CONSTANT, new cvObj.Scalar());
  console.log(
    "dst image properties:" +
      `\nsize: ${dst.size().width}*${dst.size().height},` +
      `\ndepth: ${dst.depth()},` +
      `\nchannels: ${dst.channels()},` +
      `\ntype: ${dst.type()}`
  );
  cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, dst);
  src.delete();
  dst.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doCv" />
    <InputImage :src="$getAssetsImage('lena.png')" :id="inputId" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
