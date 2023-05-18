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
  const srcTri = cvObj.matFromArray(4, 1, cvObj.CV_32FC2, [56, 65, 368, 52, 28, 387, 389, 390]);
  const dstTri = cvObj.matFromArray(4, 1, cvObj.CV_32FC2, [0, 0, 300, 0, 0, 300, 300, 300]);
  const M = cvObj.getPerspectiveTransform(srcTri, dstTri);
  const dsize = new cvObj.Size(src.rows, src.cols);
  cvObj.warpPerspective(src, dst, M, dsize, cvObj.INTER_LINEAR, cvObj.BORDER_CONSTANT, new cvObj.Scalar());
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
  srcTri.delete();
  dstTri.delete();
  M.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doCv" />
    <InputImage :src="$getAssetsImage('lena.png')" :id="inputId" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
