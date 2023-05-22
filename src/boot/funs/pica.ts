import { EMimeImageType } from "boot/enums/mime";

function getPicaOptions(max = 1024) {
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
  const { toWidth, toHeight } = resizeRectInch6(width, height);
  return await picaReducer.toBlob(blob, getPicaOptions(Math.max(toWidth, toHeight)));
}

async function asyncPicaResizeImgFile2Blob(file: File | Blob) {
  const base64Url = await asyncAltImgFile2Base64Url(file);
  const { width, height } = await asyncGetImgFileRect(base64Url);
  const { toWidth, toHeight } = resizeRectInch6(width, height);
  return await picaReducer.toBlob(file, getPicaOptions(Math.max(toWidth, toHeight)));
}

async function asyncPicaResizeImgFile2Canvas(file: File | Blob) {
  const base64Url = await asyncAltImgFile2Base64Url(file);
  const { width, height } = await asyncGetImgFileRect(base64Url);
  const { toWidth, toHeight } = resizeRectInch6(width, height);
  return await picaReducer.toCanvas(file, getPicaOptions(Math.max(toWidth, toHeight)));
}

async function asyncPicaResizeImgFileMax2Canvas(file: File | Blob, max: number) {
  return await picaReducer.toCanvas(file, getPicaOptions(max));
}

export {
  asyncPicaResizeCanvas2Blob,
  asyncPicaResizeImgFile2Blob,
  asyncPicaResizeImgFile2Canvas,
  asyncPicaResizeImgFileMax2Canvas,
};
