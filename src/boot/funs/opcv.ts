import { Mat, MatVector, Size } from "opencv-ts";
import { Line, LinePoint } from "src/types/opcv";

let imgFileArea = 0;

async function asyncResizeImgFile2Canvas(file: File | Blob) {
  const base64Url = await asyncAltImgFile2Base64Url(file);
  const { width, height } = await asyncGetImgFileRect(base64Url);
  const { toWidth, toHeight } = resizeRect500(width, height);
  imgFileArea = toWidth * toHeight;
  return await asyncPicaResizeImgFileMax2Canvas(file, Math.max(toWidth, toHeight));
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
    4,
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
  const linea: Line[] = [];
  const lines = new cvObj.Mat();
  cvObj.HoughLines(edges, lines, 1, Math.PI / 180, 30);
  for (let i = 0; i < lines.rows; ++i) {
    const rho = lines.data32F[i * 2];
    const theta = lines.data32F[i * 2 + 1];
    linea.push(new Line(rho, theta));
  }
  lines.delete();
  return linea;
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
};
