function asyncAltImgFile2Base64Url(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => resolve((e.target?.result as string) || "");
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

export { asyncAltImgFile2Base64Url, asyncGetImgFileRect };
