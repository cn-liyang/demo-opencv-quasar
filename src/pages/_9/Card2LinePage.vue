<script lang="ts" setup>
async function asyncCvImageFile(file: File) {
  const src = cvObj.imread(await asyncResizeImgFile2Canvas(file));

  const colorg = doColor(src);
  cvObj.imshow(<HTMLCanvasElement>document.getElementById("outputId1"), colorg);

  const edgesA = doEdges(colorg);
  cvObj.imshow(<HTMLCanvasElement>document.getElementById("outputId2"), edgesA);

  const contr0 = doPolyContour(edgesA);
  const clone0 = src.clone();
  cvObj.drawContours(clone0, contr0, 0, new cvObj.Scalar(255, 0, 0, 255), 1, cvObj.LINE_8);
  cvObj.imshow(<HTMLCanvasElement>document.getElementById("outputId3"), clone0);
  clone0.delete();

  const filled = doFillPoly(contr0, src.size());
  cvObj.imshow(<HTMLCanvasElement>document.getElementById("outputId4"), filled);

  const dilate = doDilate(filled);
  cvObj.imshow(<HTMLCanvasElement>document.getElementById("outputId5"), dilate);

  const edgesD = doEdges(dilate);
  cvObj.imshow(<HTMLCanvasElement>document.getElementById("outputId6"), edgesD);

  const linesD = doLines(edgesD);
  const cloneD = src.clone();
  for (let i = 0; i < linesD.rows; ++i) {
    const rho = linesD.data32F[i * 2];
    const theta = linesD.data32F[i * 2 + 1];
    const a = Math.cos(theta);
    const b = Math.sin(theta);
    const x0 = a * rho;
    const y0 = b * rho;
    const startPoint = { x: x0 - 1000 * b, y: y0 + 1000 * a };
    const endPoint = { x: x0 + 1000 * b, y: y0 - 1000 * a };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cvObj.line(cloneD, startPoint, endPoint, new cvObj.Scalar(255, 0, 0, 255));
  }
  cvObj.imshow(<HTMLCanvasElement>document.getElementById("outputId7"), cloneD);
  cloneD.delete();

  const vertex = doVertex(linesD);
  const cloneV = src.clone();
  cvObj.circle(cloneV, vertex[0], 1, new cvObj.Scalar(255, 0, 0, 255), 2);
  cvObj.circle(cloneV, vertex[1], 1, new cvObj.Scalar(0, 255, 0, 255), 2);
  cvObj.circle(cloneV, vertex[2], 1, new cvObj.Scalar(0, 0, 255, 255), 2);
  cvObj.circle(cloneV, vertex[3], 1, new cvObj.Scalar(0, 0, 0, 255), 2);
  console.log("vertex[3]", vertex[3]);
  cvObj.imshow(<HTMLCanvasElement>document.getElementById("outputId8"), cloneV);
  cloneV.delete();

  const warped = doWarp(vertex, src);
  cvObj.imshow(<HTMLCanvasElement>document.getElementById("outputId9"), warped);
  // const blobOt = await asyncPicaResizeCanvasMax2Blob(canvas, SIZE_ID_W);
  // console.log("blobOt");
  // const b64Url = await asyncAltImageFile2DataUrl(blobOt);
  // console.log("b64Url", b64Url);
  const resize = doResize4Id(warped);
  cvObj.imshow(<HTMLCanvasElement>document.getElementById("outputId10"), resize);

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
    <OutputCanvas v-for="i in 10" :id="`outputId${i}`" :key="i" />
  </div>
</template>
