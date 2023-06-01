import { IRect } from "src/types/interfaces/size";

function getAssetsImage(name: string) {
  return `src/assets/${name}`;
}

function resizeRectMax(rect: IRect, max: number) {
  const ratio = Math.max(rect.width, rect.height) / max;
  if (ratio > 1) {
    return { width: ~~(rect.width / ratio), height: ~~(rect.height / ratio) };
  } else {
    return { width: rect.width, height: rect.height };
  }
}

function resizeRectMaxRatio(rect: IRect, max: number, ratio: number) {
  const ratio2 = rect.width / rect.height / ratio;
  if (ratio2 > 1) {
    return { width: max, height: ~~((max / ratio) * ratio2) };
  } else {
    return { width: ~~(max * ratio2), height: ~~(max / ratio) };
  }
}

function asyncAltImageFile2DataUrl(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(<string>reader.result);
    reader.onerror = () => reject(reader.error);
  });
}

function asyncGetImageFileRect(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.onload = () => resolve({ width: image.width, height: image.height });
    image.onerror = (e) => reject(e);
  });
}

function asyncGetHtmlImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.onload = () => resolve(image);
    image.onerror = (e) => reject(e);
  });
}

export {
  getAssetsImage,
  resizeRectMax,
  resizeRectMaxRatio,
  asyncAltImageFile2DataUrl,
  asyncGetImageFileRect,
  asyncGetHtmlImageElement,
};
