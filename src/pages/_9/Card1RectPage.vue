<script lang="ts" setup>
const outputId = "outputId";
const hiddenId = "hiddenId";

async function asyncCvImageFile(file: File) {
  const src = cvObj.imread(await asyncResizeImgFile2Canvas(file));
  const colorg = doColor(src);
  // cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), colorg);
  const edgesA = doEdges(colorg);
  // cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), edgesA);
  const contr0 = doPolyContour(edgesA);
  /* cvObj.drawContours(src, contr0, 0, new cvObj.Scalar(255, 0, 0, 255), 1, cvObj.LINE_8);
  cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), src); */
  const filled = doFillPoly(contr0, src.size());
  // cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), filled);
  const dilate = doDilate(filled);
  // cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), dlteP);
  const edgesD = doEdges(dilate);
  // cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), edgesD);
  const linesD = doLines(edgesD);
  /* linesD.forEach((i) => cvObj.line(src, i.startPoint, i.endPoint, new cvObj.Scalar(255, 0, 0, 255)));
  cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), src); */
  const warped = doWarp(linesD, src);
  // cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), warped);
  const canvas = <HTMLCanvasElement>document.getElementById(hiddenId);
  cvObj.imshow(canvas, warped);
  const blobOt = await asyncPicaResizeCanvasMax2Blob(canvas, SIZE_ID_W);
  console.log("blobOt");
  const b64Url = await asyncAltImgFile2Base64Url(blobOt);
  console.log("b64Url", b64Url);
  const resize = doResize4Id(warped);
  cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), resize);
  src.delete();
  colorg.delete();
  edgesA.delete();
  contr0.delete();
  filled.delete();
  dilate.delete();
  edgesD.delete();
  linesD.delete();
  warped.delete();
  resize.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <InputFileImage @action="asyncCvImageFile" />
    <OutputCanvas :id="hiddenId" style="visibility: hidden" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
