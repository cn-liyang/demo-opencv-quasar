<script lang="ts" setup>
import { Mat, Point } from "opencv-ts";

class Line {
  rho: number;
  theta: number;
  startPoint: Point;
  endPoint: Point;

  constructor(rho: number, theta: number) {
    this.rho = rho;
    this.theta = theta;
    const a = Math.cos(theta);
    const b = Math.sin(theta);
    const x0 = a * rho;
    const y0 = b * rho;
    this.startPoint = new cvObj.Point(x0 - SIZE_500PX * b, y0 + SIZE_500PX * a);
    this.endPoint = new cvObj.Point(x0 + SIZE_500PX * b, y0 - SIZE_500PX * a);
  }
}

const outputId = "outputId";

function doColor(src: Mat) {
  const gray = new cvObj.Mat();
  cvObj.cvtColor(src, gray, cvObj.COLOR_RGBA2GRAY);
  cvObj.GaussianBlur(gray, gray, new cvObj.Size(3, 3), 0, 0, cvObj.BORDER_DEFAULT);
  return gray;
}

function doEdges(gray: Mat) {
  const edges = new cvObj.Mat();
  cvObj.Canny(gray, edges, 50, 100);
  return edges;
}

function doPoly1(edges: Mat, rows: number, cols: number) {
  const contours = new cvObj.MatVector();
  const hierarchy = new cvObj.Mat();
  cvObj.findContours(edges, contours, hierarchy, cvObj.RETR_LIST, cvObj.CHAIN_APPROX_SIMPLE);
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
      cnt.delete();
      tmp.delete();
      break;
    } else {
      cnt.delete();
      tmp.delete();
    }
  }
  const dark = new cvObj.Mat.zeros(rows, cols, cvObj.CV_8UC3);
  cvObj.fillPoly(dark, poly, new cvObj.Scalar(255, 0, 0));
  contours.delete();
  hierarchy.delete();
  poly.delete();
  return dark;
}

function doLines(edge1: Mat) {
  const linea = [];
  const lines = new cvObj.Mat();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cvObj.HoughLines(edge1, lines, 1, Math.PI / 180, 30, 0, 0, 0, Math.PI);
  for (let i = 0; i < lines.rows; ++i) {
    const rho = lines.data32F[i * 2];
    const theta = lines.data32F[i * 2 + 1];
    console.log("Line", rho, theta);
    linea.push(new Line(rho, theta));
  }
  return linea;
}

async function asyncCvIoImageFile(file: File) {
  const src = cvObj.imread(await asyncPicaResizeImgFile500px2Canvas(file));
  const color = doColor(src);
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, color);
  const edges = doEdges(color);
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, edges);
  const poly1 = doPoly1(edges, src.rows, src.cols);
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, poly1);
  const edge1 = doEdges(poly1);
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, edge1);
  const lines = doLines(edge1);
  /* const dark = new cvObj.Mat.zeros(src.rows, src.cols, cvObj.CV_8UC3);
  lines.forEach((i) => {
    cvObj.line(dark, i.startPoint, i.endPoint, new cvObj.Scalar(255, 0, 0));
  });
  cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, dark);
  dark.delete(); */
  const points = [];
  for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      if (Math.abs(lines[i].theta - lines[j].theta) < 0.5) {
        return;
      }
      /* let point = getIntersection(lines[i], lines[j]);
      if (point) {
        points.push(point);
      } */
    }
  }

  src.delete();
  color.delete();
  edges.delete();
  poly1.delete();
}
</script>

<template>
  <div class="column items-center q-gutter-y-md">
    <InputFileImage @action="asyncCvIoImageFile" />
    <OutputCanvas :id="outputId" />
  </div>
</template>
