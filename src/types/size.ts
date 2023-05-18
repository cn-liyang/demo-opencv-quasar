export interface ISize {
  width: number;
  height: number;
}

export interface IBounding extends ISize {
  x: number;
  y: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}
