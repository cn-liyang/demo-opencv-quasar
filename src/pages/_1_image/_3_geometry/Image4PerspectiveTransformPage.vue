<script lang="ts" setup>
const inputId = "inputId";
const outputId = "outputId";

function doIt() {
  const src = cvObj.imread(<HTMLImageElement>document.getElementById(inputId));
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
    <ActionButton @action="doIt" />
    <InputImage :id="inputId" :src="$getAssetsImage('lena.png')" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
