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
    this.startPoint = new cvObj.Point(x0 - LENGTH_500 * b, y0 + LENGTH_500 * a);
    this.endPoint = new cvObj.Point(x0 + LENGTH_500 * b, y0 - LENGTH_500 * a);
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
    }
    cnt.delete();
    tmp.delete();
  }
  const dark = new cvObj.Mat.zeros(rows, cols, cvObj.CV_8UC3);
  cvObj.fillPoly(dark, poly, new cvObj.Scalar(255, 0, 0));
  contours.delete();
  hierarchy.delete();
  poly.delete();
  return dark;
}

function doLines(edge1: Mat) {
  const linea: Line[] = [];
  const lines = new cvObj.Mat();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cvObj.HoughLines(edge1, lines, 1, Math.PI / 180, 30, 0, 0, 0, Math.PI);
  for (let i = 0; i < lines.rows; ++i) {
    const rho = lines.data32F[i * 2];
    const theta = lines.data32F[i * 2 + 1];
    linea.push(new Line(rho, theta));
  }
  return linea;
}

function getIntersectionPoint(l1: Line, l2: Line) {
  if (Math.abs(l1.theta - l2.theta) < 0.5) {
    return;
  }
  const a1 =
    Math.abs(l1.startPoint.x - l1.endPoint.x) < Number.EPSILON
      ? 0
      : (l1.startPoint.y - l1.endPoint.y) / (l1.startPoint.x - l1.endPoint.x);
  const b1 = l1.startPoint.y - a1 * l1.startPoint.x;
  const a2 =
    Math.abs(l2.startPoint.x - l2.endPoint.x) < Number.EPSILON
      ? 0
      : (l2.startPoint.y - l2.endPoint.y) / (l2.startPoint.x - l2.endPoint.x);
  const b2 = l2.startPoint.y - a2 * l2.startPoint.x;
  if (Math.abs(a2 - a1) > Number.EPSILON) {
    const x = (b1 - b2) / (a2 - a1);
    const y = a1 * x + b1;
    return new cvObj.Point(x, y);
  }
}

function getDistance(p1: Point, p2: Point) {
  const x = Math.abs(p1.x - p2.x);
  const y = Math.abs(p1.y - p2.y);
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function getCenter(points: Point[]) {
  const x = points.reduce((sum, p) => sum + p.x, 0) / points.length;
  const y = points.reduce((sum, p) => sum + p.y, 0) / points.length;
  return new cvObj.Point(x, y);
}

function doPoint4(lines: Line[]) {
  const points: Point[] = [];
  for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      const point = getIntersectionPoint(lines[i], lines[j]);
      if (point) {
        points.push(point);
      }
    }
  }
  const center = getCenter(points);
  points.sort(
    (a, b) =>
      Math.atan((a.y - center.y) / (a.x - center.x || 0.01)) - Math.atan((b.y - center.y) / (b.x - center.x || 0.01))
  );
  const clusters: Point[][] = [[]];
  for (let i = 1; i < points.length; i++) {
    if (getDistance(points[i - 1], points[i]) < 30) {
      clusters[clusters.length - 1].push(points[i]);
    } else {
      clusters.push([points[i]]);
    }
  }
  return clusters
    .sort((a, b) => b.length - a.length)
    .slice(0, 4)
    .map((i) => getCenter(i));
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
  const point4 = doPoint4(lines);
  console.log("point4", point4);
  const dark = new cvObj.Mat.zeros(src.rows, src.cols, cvObj.CV_8UC3);
  cvObj.rectangle(src, point4[0], point4[3], new cvObj.Scalar(255, 0, 0), 1, cvObj.LINE_8, 0);
  cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, src);
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
