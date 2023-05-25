import { Mat, MatVector, Point, Size } from "opencv-ts";
import { Line, LinePoint } from "src/types/opcv";

let imgFileArea = 0;

async function asyncResizeImgFile2Canvas(file: File | Blob) {
  const base64Url = await asyncAltImageFile2Base64Url(file);
  const { width, height } = await asyncGetImageFileRect(base64Url);
  const { toWidth, toHeight } = resizeRectMax(width, height, SIZE_INCH6_H);
  imgFileArea = toWidth * toHeight;
  return await asyncPicaResizeImageFileMax2Canvas(file, Math.max(toWidth, toHeight));
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

function _filterContours(edges: Mat) {
  const contours = new cvObj.MatVector();
  const hierarchy = new cvObj.Mat();
  cvObj.findContours(edges, contours, hierarchy, cvObj.RETR_LIST, cvObj.CHAIN_APPROX_SIMPLE);
  const contourArray = [];
  for (let i = 0; i < contours.size(); i++) {
    const _contour = contours.get(i);
    const _contourArea = cvObj.contourArea(_contour);
    if (_contourArea > imgFileArea / 10) {
      contourArray.push({ id: i, area: _contourArea });
    }
    _contour.delete();
  }
  contourArray.sort((a, b) => b.area - a.area);
  hierarchy.delete();
  return { contours, contourArray };
}

function doPolyContour(edges: Mat) {
  const { contours, contourArray } = _filterContours(edges);
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
    3,
    cvObj.BORDER_CONSTANT,
    cvObj.morphologyDefaultBorderValue()
  );
  M.delete();
  return dilate;
}

function doMinAreaRect(polysV: MatVector) {
  const poly = polysV.get(0);
  const rotatedRect = cvObj.minAreaRect(poly);
  poly.delete();
  return rotatedRect;
}

function doPolyDP(edges: Mat) {
  const { contours, contourArray } = _filterContours(edges);
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
  return polys;
}

function doLines(edges: Mat) {
  const lines = new cvObj.Mat();
  cvObj.HoughLines(edges, lines, 1, Math.PI / 180, 40);
  return lines;
}

function doLinesP(edges: Mat) {
  const linea: LinePoint[] = [];
  const lines = new cvObj.Mat();
  cvObj.HoughLinesP(edges, lines, 1, Math.PI / 180, 1);
  for (let i = 0; i < lines.rows; ++i) {
    const startPoint = new cvObj.Point(lines.data32S[i * 4], lines.data32S[i * 4 + 1]);
    const endPoint = new cvObj.Point(lines.data32S[i * 4 + 2], lines.data32S[i * 4 + 3]);
    if (startPoint.x === endPoint.x && startPoint.y === endPoint.y) {
      linea.push(new LinePoint(startPoint, endPoint));
    }
  }
  lines.delete();
  return linea;
}

function getCrossPoint(l1: Line, l2: Line) {
  const theta = Math.abs(l1.theta - l2.theta);
  if (theta < Math.PI / 6) {
    return;
  }
  // y = a * x + b
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

function getCrossPoints(lines: Line[]) {
  const points: Point[] = [];
  for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      const point = getCrossPoint(lines[i], lines[j]);
      if (point) {
        points.push(point);
      }
    }
  }
  return points;
}

function getDistance(p1: Point, p2: Point) {
  const x = Math.abs(p1.x - p2.x);
  const y = Math.abs(p1.y - p2.y);
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function isNear(p1: Point, p2: Point) {
  const dist = getDistance(p1, p2);
  const sqrt = Math.sqrt(imgFileArea) / 10;
  return dist < sqrt;
}

function getPoint4(points: Point[]) {
  const center = {
    x: points.reduce((sum, cur) => sum + cur.x, 0) / points.length,
    y: points.reduce((sum, cur) => sum + cur.y, 0) / points.length,
  };
  points.sort((p1, p2) => {
    const theta1 = Math.atan((p1.y - center.y) / (p1.x - center.x || 0.01));
    const theta2 = Math.atan((p2.y - center.y) / (p2.x - center.x || 0.01));
    return theta1 - theta2;
  });
  const clusters: Point[][] = [[]];
  for (let i = 1; i < points.length; i++) {
    if (isNear(points[i], points[i - 1])) {
      clusters[clusters.length - 1].push(points[i]);
    } else {
      clusters.push([points[i]]);
    }
  }
  return clusters
    .sort((a, b) => b.length - a.length)
    .slice(0, 4)
    .map((i) => {
      const x = ~~(i.reduce((sum, cur) => sum + cur.x, 0) / i.length);
      const y = ~~(i.reduce((sum, cur) => sum + cur.y, 0) / i.length);
      return new cvObj.Point(x, y);
    });
}

function altDataType2Line(lines: Mat) {
  const linea: Line[] = [];
  for (let i = 0; i < lines.rows; ++i) {
    const rho = lines.data32F[i * 2];
    const theta = lines.data32F[i * 2 + 1];
    linea.push(new Line(rho, theta, imgFileArea / 10));
  }
  return linea;
}

function doVertex(lines: Mat) {
  const lines0 = altDataType2Line(lines);
  const points = getCrossPoints(lines0);
  const point4 = getPoint4(points);
  point4.sort((a, b) => a.x - b.x);
  const tmppit: Point[] = [];
  const dist01 = Math.abs(point4[0].x - point4[1].x);
  const dist02 = Math.abs(point4[0].x - point4[2].x);
  if (dist01 < dist02 / 2 && point4[0].y > point4[1].y) {
    tmppit.push(point4[1]);
    tmppit.push(point4[0]);
  } else {
    tmppit.push(point4[0]);
    tmppit.push(point4[1]);
  }
  tmppit.push(point4[2]);
  tmppit.push(point4[3]);
  const dstpit: { distance: number; point: Point }[] = [];
  dstpit.push({ distance: 0, point: tmppit[0] });
  dstpit.push({ distance: getDistance(tmppit[0], tmppit[1]), point: tmppit[1] });
  dstpit.push({ distance: getDistance(tmppit[0], tmppit[2]), point: tmppit[2] });
  dstpit.push({ distance: getDistance(tmppit[0], tmppit[3]), point: tmppit[3] });
  const mappit = dstpit.sort((a, b) => a.distance - b.distance).map((i) => i.point);
  const vertex: Point[] = [];
  if (mappit[0].y > mappit[1].y) {
    vertex.push(mappit[2]);
    vertex.push(mappit[0]);
    vertex.push(mappit[1]);
    vertex.push(mappit[3]);
  } else {
    vertex.push(mappit[0]);
    vertex.push(mappit[2]);
    vertex.push(mappit[3]);
    vertex.push(mappit[1]);
  }
  return vertex;
}

function doWarp(vertex: Point[], src: Mat) {
  const [tl, tr, br, bl] = vertex;
  const maxW = Math.max(getDistance(tl, tr), getDistance(bl, br));
  const maxH = Math.max(getDistance(tl, bl), getDistance(tr, br));
  const srcTri = cvObj.matFromArray(4, 1, cvObj.CV_32FC2, [tl.x, tl.y, tr.x, tr.y, br.x, br.y, bl.x, bl.y]);
  const dstTri = cvObj.matFromArray(4, 1, cvObj.CV_32FC2, [0, 0, maxW - 1, 0, maxW - 1, maxH - 1, 0, maxH - 1]);
  const M = cvObj.getPerspectiveTransform(srcTri, dstTri);
  const dst = new cvObj.Mat();
  cvObj.warpPerspective(src, dst, M, new cvObj.Size(maxW, maxH), cvObj.INTER_LINEAR, cvObj.BORDER_CONSTANT);
  srcTri.delete();
  dstTri.delete();
  M.delete();
  return dst;
}

function doResize4Id(src: Mat) {
  const dst = new cvObj.Mat();
  cvObj.resize(src, dst, new cvObj.Size(SIZE_ID_W, SIZE_ID_H), 0, 0, cvObj.INTER_AREA);
  return dst;
}

export {
  asyncResizeImgFile2Canvas,
  doColor,
  doEdges,
  doPolyContour,
  doFillPoly,
  doDilate,
  doMinAreaRect,
  doPolyDP,
  doLines,
  doLinesP,
  doVertex,
  doWarp,
  doResize4Id,
};
