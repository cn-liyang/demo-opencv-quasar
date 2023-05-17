import { EMimeImageType } from "src/boot/enums/mime";

function _resizeRect(fromWidth: number, fromHeight: number) {
  const fromRatio = fromWidth / fromHeight;
  if (fromRatio > RECT_INCH6_RATIO) {
    return { toWidth: RECT_INCH6_WIDTH, toHeight: RECT_INCH6_HEIGHT * fromRatio };
  } else {
    return { toWidth: RECT_INCH6_WIDTH / fromRatio, toHeight: RECT_INCH6_HEIGHT };
  }
}

function _resizeRect2Max(fromWidth: number, fromHeight: number) {
  const { toWidth, toHeight } = _resizeRect(fromWidth, fromHeight);
  return toWidth > toHeight ? toWidth : toHeight;
}

function _getOptions(max = 1024) {
  return {
    max,
    unsharpAmount: 160,
    unsharpRadius: 0.6,
    unsharpThreshold: 1,
  };
}

async function asyncPicaResizeCanvas2Blob(html: HTMLCanvasElement) {
  const blob = await picaObj.toBlob(html, EMimeImageType.PNG);
  const { width, height } = html;
  const max = _resizeRect2Max(width, height);
  return await picaReducer.toBlob(blob, _getOptions(max));
}

async function asyncPicaResizeImgFile2Blob(file: File | Blob) {
  const base64Url = await asyncAltImgFile2Base64Url(file);
  const { width, height } = await asyncGetImgFileRect(base64Url);
  const max = _resizeRect2Max(width, height);
  return await picaReducer.toBlob(file, _getOptions(max));
}

async function asyncPicaResizeImgFile2Canvas(file: File | Blob) {
  const base64Url = await asyncAltImgFile2Base64Url(file);
  const { width, height } = await asyncGetImgFileRect(base64Url);
  const max = _resizeRect2Max(width, height);
  return await picaReducer.toCanvas(file, _getOptions(max));
}

export { asyncPicaResizeCanvas2Blob, asyncPicaResizeImgFile2Blob, asyncPicaResizeImgFile2Canvas };
