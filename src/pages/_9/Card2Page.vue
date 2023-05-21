<script lang="ts" setup>
import { Mat } from "opencv-ts";

const outputId = "outputId";

function doGray(src: Mat) {
  const gray = new cvObj.Mat();
  cvObj.cvtColor(src, gray, cvObj.COLOR_RGBA2GRAY);
  cvObj.GaussianBlur(gray, gray, new cvObj.Size(3, 3), 0, 0, cvObj.BORDER_DEFAULT);
  return gray;
}

function doEdge(gray: Mat) {
  const edge = new cvObj.Mat();
  cvObj.Canny(gray, edge, 50, 100);
  return edge;
}

async function asyncCvIoImageFile(file: File) {
  const src = cvObj.imread(await asyncPicaResizeImgFile500px2Canvas(file));
  const gray = doGray(src);
  const edge = doEdge(gray);

  const contours = new cvObj.MatVector();
  const hierarchy = new cvObj.Mat();
  cvObj.findContours(edge, contours, hierarchy, cvObj.RETR_LIST, cvObj.CHAIN_APPROX_SIMPLE);

  const contourArray = [];
  for (let i = 0; i < contours.size(); i++) {
    const _contour = contours.get(i);
    const _contourArea = cvObj.contourArea(_contour);
    if (_contourArea > 0) {
      contourArray.push({ id: i, area: _contourArea });
    }
    _contour.delete();
  }
  contourArray.sort((a, b) => b.area - a.area);
  const poly = new cvObj.MatVector();
  for (let i = 0; i < contourArray.length; i++) {
    const cnt = contours.get(contourArray[i].id);
    const tmp = new cvObj.Mat();
    const arcLength = cvObj.arcLength(cnt, true);
    cvObj.approxPolyDP(cnt, tmp, arcLength * 0.01, true);
    if (tmp.total() === 4) {
      poly.push_back(cnt);
      break;
    }
    cnt.delete();
    tmp.delete();
  }

  // cvObj.drawContours(src, poly, 0, new cvObj.Scalar(255, 0, 0), 1, cvObj.LINE_8, hierarchy, 0);
  const rect = poly.get(0);

  const dst = new cvObj.Mat.zeros(src.rows, src.cols, cvObj.CV_8UC3);
  const lines = new cvObj.Mat();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cvObj.HoughLines(edge, lines, 1, Math.PI / 180, 30, 0, 0, 0, Math.PI); // core
  for (let i = 0; i < lines.rows; ++i) {
    const rho = lines.data32F[i * 2];
    const theta = lines.data32F[i * 2 + 1];
    const a = Math.cos(theta);
    const b = Math.sin(theta);
    const x0 = a * rho;
    const y0 = b * rho;
    const startPoint = { x: x0 - 1000 * b, y: y0 + 1000 * a };
    const endPoint = { x: x0 + 1000 * b, y: y0 - 1000 * a };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cvObj.line(dst, startPoint, endPoint, [255, 0, 0, 255]);
  }

  cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, dst);
  src.delete();
  gray.delete();
  edge.delete();
  poly.delete();
  rect.delete();
  dst.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <InputFileImage @action="asyncCvIoImageFile" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
