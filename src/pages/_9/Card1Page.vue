<script lang="ts" setup>
const outputId = "outputId";

async function asyncCvIoImageFile(file: File) {
  const src = cvObj.imread(await asyncPicaResizeImgFile500px2Canvas(file));

  const gray = new cvObj.Mat();
  cvObj.cvtColor(src, gray, cvObj.COLOR_RGBA2GRAY, 0);
  cvObj.GaussianBlur(gray, gray, new cvObj.Size(3, 3), 0, 0, cvObj.BORDER_DEFAULT);

  const edge = new cvObj.Mat();
  cvObj.Canny(gray, edge, 50, 100);
  gray.delete();

  const contours = new cvObj.MatVector();
  const hierarchy = new cvObj.Mat();
  cvObj.findContours(edge, contours, hierarchy, cvObj.RETR_LIST, cvObj.CHAIN_APPROX_SIMPLE);
  let contour = contours.get(0);
  const contourArea = cvObj.contourArea(contour);
  for (let i = 0; i < contours.size(); i++) {
    console.log("i", i);
    const _contour = contours.get(i);
    const _contourArea = cvObj.contourArea(_contour);
    if (contourArea < _contourArea) {
      contour = _contour;
    }
    _contour.delete();
  }
  const poly = new cvObj.MatVector();
  for (let i = 0; i < contours.size(); ++i) {
    const tmp = new cvObj.Mat();
    const cnt = contours.get(i);
    cvObj.approxPolyDP(cnt, tmp, 1, true);
    console.log("tmp", tmp);
    poly.push_back(tmp);
    cnt.delete();
    tmp.delete();
  }
  for (let i = 0; i < contours.size(); ++i) {
    cvObj.drawContours(src, poly, i, new cvObj.Scalar(0, 0, 0), 1, cvObj.LINE_8, hierarchy, 0);
  }
  cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, src);

  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, edge);
  src.delete();
  edge.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <InputFileImage @action="asyncCvIoImageFile" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
