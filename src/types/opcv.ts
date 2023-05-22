import { Point } from "opencv-ts";

export class Line {
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

export class LinePoint {
  startPoint: Point;
  endPoint: Point;

  constructor(startPoint: Point, endPoint: Point) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
  }
}
