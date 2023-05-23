<script lang="ts" setup>
import { cvObj } from "boot/opcv";

const outputId = "outputId";

async function asyncCvIoImageFile(file: File) {
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
  const pspctv = doPerspective(linesD, src);
  // cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), pspctv);
  src.delete();
  colorg.delete();
  edgesA.delete();
  contr0.delete();
  filled.delete();
  dilate.delete();
  edgesD.delete();
  linesD.delete();
  pspctv.delete();
  const blob = new Blob([pspctv.data], { type: EMimeImageType.PNG });
  console.log("blob", blob);
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <InputFileImage @action="asyncCvIoImageFile" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
