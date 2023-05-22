<script lang="ts" setup>
import { Mat, MatVector, Point, Size } from "opencv-ts";

const outputId = "outputId";

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

function doPolyContour(edges: Mat) {
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
  const polys = new cvObj.MatVector();
  for (let i = 0; i < contourArray.length; i++) {
    const cnt = contours.get(contourArray[i].id);
    const tmp = new cvObj.Mat();
    const arcLength = cvObj.arcLength(cnt, true);
    cvObj.approxPolyDP(cnt, tmp, arcLength * 0.01, true);
    if (tmp.total() === 4) {
      polys.push_back(cnt);
      cnt.delete();
      tmp.delete();
      break;
    }
    cnt.delete();
    tmp.delete();
  }
  contours.delete();
  hierarchy.delete();
  return polys;
}

function doFillPoly(polyV: MatVector, size: Size) {
  const dark = new cvObj.Mat.zeros(size.height, size.width, cvObj.CV_8UC3);
  cvObj.fillPoly(dark, polyV, new cvObj.Scalar(255, 0, 0));
  return dark;
}

function doDilate(polyV: Mat) {
  const dilate = new cvObj.Mat();
  const M = new cvObj.Mat.ones(3, 3, cvObj.CV_8U);
  cvObj.dilate(
    polyV,
    dilate,
    M,
    new cvObj.Point(-1, -1),
    4,
    cvObj.BORDER_CONSTANT,
    cvObj.morphologyDefaultBorderValue()
  );
  M.delete();
  return dilate;
}

function doPolyDP(edges: Mat) {
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
  const polys = new cvObj.MatVector();
  for (let i = 0; i < contourArray.length; i++) {
    const cnt = contours.get(contourArray[i].id);
    const tmp = new cvObj.Mat();
    const arcLength = cvObj.arcLength(cnt, true);
    cvObj.approxPolyDP(cnt, tmp, arcLength * 0.01, true);
    if (tmp.total() === 4) {
      polys.push_back(tmp);
      cnt.delete();
      tmp.delete();
      break;
    }
    cnt.delete();
    tmp.delete();
  }
  contours.delete();
  hierarchy.delete();
  return polys;
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
  // cvObj.drawContours(src, polyD, 0, new cvObj.Scalar(255, 0, 0, 255), 1, cvObj.LINE_8);
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, src);
  const poly1 = polyD.get(0);
  console.log("edge1", edge1.size());
  const { maxLoc } = cvObj.minMaxLoc(edge1);
  cvObj.rectangle(
    src,
    maxLoc,
    new cvObj.Point(maxLoc.x + 50, maxLoc.y + 50),
    new cvObj.Scalar(255, 0, 0, 255),
    1,
    cvObj.LINE_8,
    0
  );
  // cvObj.imshow(document.getElementById(outputId) as HTMLCanvasElement, src);
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
