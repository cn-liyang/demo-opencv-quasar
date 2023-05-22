<script lang="ts" setup>
import { Point } from "opencv-ts";
import { cvObj } from "boot/opcv";

const outputId = "outputId";

async function asyncCvIoImageFile(file: File) {
  const src = cvObj.imread(await asyncResizeImgFile2Canvas(file));
  const colorg = doColor(src);
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, colorg);
  const edges0 = doEdges(colorg);
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, edges0);
  const polys0 = doPolyContour(edges0);
  // cvObj.drawContours(src, polys0, 0, new cvObj.Scalar(255, 0, 0, 255), 1, cvObj.LINE_8);
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, src);
  const filled = doFillPoly(polys0, src.size());
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, filled);
  const dilate = doDilate(filled);
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, dlteP);
  const edgesD = doEdges(dilate);
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, edgesD);
  const polysD = doPolyContour(edgesD);
  // cvObj.drawContours(src, polysD, 0, new cvObj.Scalar(255, 0, 0, 255), 1, cvObj.LINE_8);
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, src);
  const rotatedRect = doMinAreaRect(polysD);
  console.log("rotatedRect", rotatedRect);
  const vertices = cvObj.RotatedRect.points(rotatedRect);
  console.log("vertices", vertices);
  cvObj.drawContours(src, polysD, 0, new cvObj.Scalar(0, 255, 0, 255), 1, cvObj.LINE_8);
  for (let i = 0; i < 4; i++) {
    console.log(i, (i + 1) % 4);
    console.log(vertices[i], vertices[(i + 1) % 4]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cvObj.line(src, vertices[i], vertices[(i + 1) % 4], new cvObj.Scalar(255, 0, 0, 255), 1, cvObj.LINE_AA, 0); // core
  }
  cvObj.circle(src, vertices[0], 1, new cvObj.Scalar(0, 0, 255, 255), 1);
  cvObj.circle(src, vertices[1], 2, new cvObj.Scalar(0, 0, 255, 255), 2);
  cvObj.circle(src, vertices[2], 3, new cvObj.Scalar(0, 0, 255, 255), 3);
  cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, src);
  const polyD = doPolyDP(edgesD);
  // cvObj.drawContours(src, polysD, 0, new cvObj.Scalar(255, 0, 0, 255), 1, cvObj.LINE_8);
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, src);

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
  cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, src); */
  src.delete();
  colorg.delete();
  edges0.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <InputFileImage @action="asyncCvIoImageFile" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
