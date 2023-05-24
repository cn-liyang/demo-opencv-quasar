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

function resizeRectMax(fromWidth: number, fromHeight: number, maxLength: number) {
  const lengthRatio = Math.max(fromWidth, fromHeight) / maxLength;
  if (lengthRatio > 1) {
    return { toWidth: fromWidth / lengthRatio, toHeight: fromHeight / lengthRatio };
  } else {
    return { toWidth: fromWidth * lengthRatio, toHeight: fromHeight * lengthRatio };
  }
}

export { resizeRectInch6, resizeRectId, resizeRectMax };
