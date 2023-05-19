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
  const srcTri = opcv.matFromArray(3, 1, opcv.CV_32FC2, [0, 0, 0, 1, 1, 0]);
  const dstTri = opcv.matFromArray(3, 1, opcv.CV_32FC2, [0.6, 0.2, 0.1, 1.3, 1.5, 0.3]);
  const M = opcv.getAffineTransform(srcTri, dstTri);
  const dsize = new opcv.Size(src.rows, src.cols);
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
  srcTri.delete();
  dstTri.delete();
  M.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doCv" />
    <InputImage :id="inputId" :src="$getAssetsImage('lena.png')" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
