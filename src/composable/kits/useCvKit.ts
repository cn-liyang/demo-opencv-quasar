import cv from "@techstark/opencv-js";

export default function () {
  async function asyncFileUpdated(file: File) {
    const iHtmlCanvasElement = await asyncPicaResizeImgFile2Canvas(file);
    const mat = cv.imread(iHtmlCanvasElement);
    const src = mat.data;
    console.log("data", src);
    const rect = mat.size();
    console.log("size", rect);
    const oHtmlCanvasElement = document.getElementById(ID_HTML_CANVAS_ELEMENT) as HTMLCanvasElement;
    cv.imshow(oHtmlCanvasElement, mat);
    mat.delete();
  }

  return { asyncFileUpdated };
}
