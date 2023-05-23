<script lang="ts" setup>
const inputId = "inputId";
const outputId = "outputId";

function doCv() {
  const src = cvObj.imread(<HTMLImageElement>document.getElementById(inputId));
  console.log(
    "src image properties:" +
      `\nsize: ${src.size().width}*${src.size().height},` +
      `\ndepth: ${src.depth()},` +
      `\nchannels: ${src.channels()},` +
      `\ntype: ${src.type()}`
  );
  const dst = new cvObj.Mat();
  const srcTri = cvObj.matFromArray(3, 1, cvObj.CV_32FC2, [0, 0, 0, 1, 1, 0]);
  const dstTri = cvObj.matFromArray(3, 1, cvObj.CV_32FC2, [0.6, 0.2, 0.1, 1.3, 1.5, 0.3]);
  const M = cvObj.getAffineTransform(srcTri, dstTri);
  const dsize = new cvObj.Size(src.rows, src.cols);
  cvObj.warpAffine(src, dst, M, dsize, cvObj.INTER_LINEAR, cvObj.BORDER_CONSTANT, new cvObj.Scalar());
  console.log(
    "dst image properties:" +
      `\nsize: ${dst.size().width}*${dst.size().height},` +
      `\ndepth: ${dst.depth()},` +
      `\nchannels: ${dst.channels()},` +
      `\ntype: ${dst.type()}`
  );
  cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), dst);
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
