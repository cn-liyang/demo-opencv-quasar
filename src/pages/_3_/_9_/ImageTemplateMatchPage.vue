<script lang="ts" setup>
function doCv() {
  const src = cvObj.imread(document.getElementById(ID_HTML_IMAGE_ELEMENT) as HTMLImageElement);
  const dst = cvObj.Mat.zeros(src.cols, src.rows, cvObj.CV_8UC3);
  cvObj.cvtColor(src, src, cvObj.COLOR_RGBA2GRAY, 0);
  cvObj.threshold(src, src, 120, 200, cvObj.THRESH_BINARY);
  const contours = new cvObj.MatVector();
  const hierarchy = new cvObj.Mat();
  cvObj.findContours(src, contours, hierarchy, cvObj.RETR_CCOMP, cvObj.CHAIN_APPROX_SIMPLE);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  for (let i = 0; i < contours.size(); ++i) {
    const color = new cvObj.Scalar(
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255)
    );
    cvObj.drawContours(dst, contours, i, color, 1, cvObj.LINE_8, hierarchy, 100);
  }
  cvObj.imshow(document.getElementById(ID_HTML_CANVAS_ELEMENT) as HTMLCanvasElement, dst);
  src.delete();
  dst.delete();
  contours.delete();
  hierarchy.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <ActionButton @action="doCv" />
    <InputImage :src="$getAssetsImage('lena.png')" />
    <OutputCanvas />
  </div>
</template>
