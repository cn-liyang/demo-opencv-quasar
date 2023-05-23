<script lang="ts" setup>
import { cvObj } from "boot/opcv";

const outputId = "outputId";

async function asyncCvIoImageFile(file: File) {
  const src = cvObj.imread(await asyncResizeImgFile2Canvas(file));
  const colorg = doColor(src);
  // cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), colorg);
  const edgesA = doEdges(colorg);
  // cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), edgesA);
  const polys0 = doPolyContour(edgesA);
  /* cvObj.drawContours(src, polys0, 0, new cvObj.Scalar(255, 0, 0, 255), 1, cvObj.LINE_8);
  cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), src); */
  const filled = doFillPoly(polys0, src.size());
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
  const canvas = <HTMLCanvasElement>document.createElement("HTMLCanvasElement");
  cvObj.imshow(canvas, pspctv);
  const base64URL = canvas.toDataURL();
  console.log("base64URL", base64URL);
  /* const mat = polysD.get(0);
  const uint8s = mat.data.filter((_, idx) => idx % 4 === 0);
  console.log("uint8s", uint8s);
  const point1 = new cvObj.Point(uint8s[0], uint8s[1]);
  const y2 = Math.abs(uint8s[1] - uint8s[3]);
  const point2 = new cvObj.Point(uint8s[2], uint8s[3]);
  const point3 = new cvObj.Point(uint8s[4], uint8s[5]);
  const point4 = new cvObj.Point(uint8s[6], uint8s[7]);
  cvObj.circle(src, point1, 1, new cvObj.Scalar(255, 0, 0, 255));
  cvObj.circle(src, point2, 2, new cvObj.Scalar(255, 0, 0, 255));
  cvObj.circle(src, point3, 3, new cvObj.Scalar(255, 0, 0, 255));
  cvObj.circle(src, point4, 4, new cvObj.Scalar(255, 0, 0, 255));
  cvObj.imshow(<HTMLCanvasElement>document.getElementById(outputId), src); */
  src.delete();
  colorg.delete();
  edgesA.delete();
  edgesD.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <InputFileImage @action="asyncCvIoImageFile" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
