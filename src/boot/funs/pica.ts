import { EMimeImageType } from "src/types/enums/mime";

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
  const { width: toWidth, height: toHeight } = resizeRectMaxRatio({ width, height }, RECT_PIXEL_512, RECT_RATIO_3VS4);
  return await picaReducer.toBlob(blob, _getOptions(Math.max(toWidth, toHeight)));
}

async function asyncPicaResizeImageFile2Blob(file: File | Blob) {
  const base64Url = await asyncAltImageFile2DataUrl(file);
  const { width, height } = await asyncGetImageFileRect(base64Url);
  const { width: toWidth, height: toHeight } = resizeRectMaxRatio({ width, height }, RECT_PIXEL_512, RECT_RATIO_3VS4);
  return await picaReducer.toBlob(file, _getOptions(Math.max(toWidth, toHeight)));
}

async function asyncPicaResizeImageFile2Canvas(file: File | Blob) {
  const base64Url = await asyncAltImageFile2DataUrl(file);
  const { width, height } = await asyncGetImageFileRect(base64Url);
  const { width: toWidth, height: toHeight } = resizeRectMaxRatio({ width, height }, RECT_PIXEL_512, RECT_RATIO_3VS4);
  return await picaReducer.toCanvas(file, _getOptions(Math.max(toWidth, toHeight)));
}

async function asyncPicaResizeCanvasMax2Blob(html: HTMLCanvasElement, max?: number) {
  const blob = await picaObj.toBlob(html, EMimeImageType.PNG);
  return await picaReducer.toBlob(blob, _getOptions(max));
}

async function asyncPicaResizeImageFileMax2Blob(file: File | Blob, max?: number) {
  return await picaReducer.toBlob(file, _getOptions(max));
}

async function asyncPicaResizeImageFileMax2Canvas(file: File | Blob, max?: number) {
  return await picaReducer.toCanvas(file, _getOptions(max));
}

export {
  asyncPicaResizeCanvas2Blob,
  asyncPicaResizeImageFile2Blob,
  asyncPicaResizeImageFile2Canvas,
  asyncPicaResizeCanvasMax2Blob,
  asyncPicaResizeImageFileMax2Blob,
  asyncPicaResizeImageFileMax2Canvas,
};
