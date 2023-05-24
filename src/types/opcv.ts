import { Point } from "opencv-ts";

export class Line {
  rho: number;
  theta: number;
  startPoint: Point;
  endPoint: Point;

  constructor(rho: number, theta: number, quantity: number) {
    this.rho = rho;
    this.theta = theta;
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);
    const rx0 = cos * rho;
    const ry0 = sin * rho;
    this.startPoint = new cvObj.Point(rx0 - quantity * sin, ry0 + quantity * cos);
    this.endPoint = new cvObj.Point(rx0 + quantity * sin, ry0 - quantity * cos);
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
