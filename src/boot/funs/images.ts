function resizeRectInch6(fromWidth: number, fromHeight: number) {
  const fromRatio = fromWidth / fromHeight;
  if (fromRatio > SIZE_INCH6_R) {
    return { toWidth: SIZE_INCH6_W, toHeight: SIZE_INCH6_H * fromRatio };
  } else {
    return { toWidth: SIZE_INCH6_W / fromRatio, toHeight: SIZE_INCH6_H };
  }
}

function resizeRectId(fromWidth: number, fromHeight: number) {
  const fromRatio = fromWidth / fromHeight;
  if (fromRatio > SIZE_ID_R) {
    return { toWidth: SIZE_ID_W, toHeight: SIZE_ID_H / fromRatio };
  } else {
    return { toWidth: SIZE_ID_W * fromRatio, toHeight: SIZE_ID_H };
  }
}

function resizeRect500(fromWidth: number, fromHeight: number) {
  const lengthRatio = Math.max(fromWidth, fromHeight) / LENGTH_500;
  if (lengthRatio > 1) {
    return { toWidth: fromWidth / lengthRatio, toHeight: fromHeight / lengthRatio };
  } else {
    return { toWidth: fromWidth * lengthRatio, toHeight: fromHeight * lengthRatio };
  }
}

function asyncAltImgFile2Base64Url(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => resolve(<string>e.target?.result || "");
    reader.onerror = (e) => reject(e);
  });
}

function asyncGetImgFileRect(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.onload = () => resolve({ width: image.width, height: image.height });
    image.onerror = (e) => reject(e);
  });
}

export { resizeRectInch6, resizeRectId, resizeRect500, asyncAltImgFile2Base64Url, asyncGetImgFileRect };
