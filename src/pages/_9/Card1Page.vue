<script lang="ts" setup>
const outputId = "outputId";

async function asyncCvIoImageFile(file: File) {
  const src = cvObj.imread(await asyncPicaResizeImgFile5002Canvas(file));
  const color = doColor(src);
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, color);
  const edges = doEdges(color);
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, edges);
  const polyC = doPolyContour(edges);
  // cvObj.drawContours(src, polyC, 0, new cvObj.Scalar(255, 0, 0, 255), 1, cvObj.LINE_8);
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, src);
  const fillP = doFillPoly(polyC, src.size());
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, fillP);
  const dlted = doDilate(fillP);
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, dlted);
  const edge1 = doEdges(dlted);
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, edge1);
  const polyD = doPolyDP(edge1);
  cvObj.drawContours(src, polyD, 0, new cvObj.Scalar(255, 0, 0, 255), 1, cvObj.LINE_8);
  cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, src);
  const poly1 = polyD.get(0);
  console.log("poly1.size()", poly1.size());
  const numbers: number[] = [];
  poly1.data
    .filter((_, idx) => idx % poly1.total() === 0)
    .sort((a, b) => a - b)
    .forEach((i) => numbers.push(i));
  console.log("numbers", numbers);
  const point1 = new cvObj.Point(numbers[0], numbers[7]);
  const point2 = new cvObj.Point(numbers[2], numbers[5]);
  const point3 = new cvObj.Point(numbers[4], numbers[3]);
  const point4 = new cvObj.Point(numbers[6], numbers[1]);
  cvObj.circle(src, point1, 1, new cvObj.Scalar(255, 0, 0, 255));
  cvObj.circle(src, point2, 2, new cvObj.Scalar(255, 0, 0, 255));
  cvObj.circle(src, point3, 3, new cvObj.Scalar(255, 0, 0, 255));
  cvObj.circle(src, point4, 4, new cvObj.Scalar(255, 0, 0, 255));
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, src);
  // const srcTri = cvObj.matFromArray(4, 1, cvObj.CV_32FC2, numbers);
  // const dstTri = cvObj.matFromArray(4, 1, cvObj.CV_32FC2, [0, 0, 300, 0, 0, 300, 300, 300]);
  /* for (let i = 0; i < poly1.data.length; i += total) {
    poly1.data[i];
  } */

  // poly1.reshape(4, 2);

  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, dilate);
  // const edge1 = doEdges(polyC);
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, edge1);

  src.delete();
  color.delete();
  edges.delete();
  polyC.delete();
  dlted.delete();
  edge1.delete();
  polyD.delete();
  poly1.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <InputFileImage @action="asyncCvIoImageFile" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
