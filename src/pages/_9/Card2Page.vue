<script lang="ts" setup>
const outputId = "outputId";

async function asyncCvIoImageFile(file: File) {
  const src = cvObj.imread(await asyncResizeImgFile2Canvas(file));
  const color = doColor(src);
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, color);
  const edges = doEdges(color);
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, edges);
  const polyC = doPolyContour(edges);
  // cvObj.drawContours(src, polyC, 0, new cvObj.Scalar(255, 0, 0, 255), 1, cvObj.LINE_8);
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, src);
  const fillC = doFillPoly(polyC, src.size());
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, fillC);
  const diltC = doDilate(fillC);
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, dlteP);
  const edgeC = doEdges(diltC);
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, edgeC);
  const polyP = doPolyDP(edgeC);
  // cvObj.drawContours(src, polyP, 0, new cvObj.Scalar(255, 0, 0, 255), 1, cvObj.LINE_8);
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, src);
  /* const mat = polyP.get(0);
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
  color.delete();
  edges.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <InputFileImage @action="asyncCvIoImageFile" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
