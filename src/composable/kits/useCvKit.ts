export default function () {
  async function asyncFileUpdated(file: File) {
    const iHtmlCanvasElement = await asyncPicaResizeImgFile2Canvas(file);
    const mat = cvObj.imread(iHtmlCanvasElement);
    const src = mat.data;
    console.log("data", src);
    const size = mat.size();
    console.log("size", size);
    const oHtmlCanvasElement = document.getElementById(ID_HTML_CANVAS_ELEMENT) as HTMLCanvasElement;
    cvObj.imshow(oHtmlCanvasElement, mat);
    mat.delete();
  }

  return { asyncFileUpdated };
}
