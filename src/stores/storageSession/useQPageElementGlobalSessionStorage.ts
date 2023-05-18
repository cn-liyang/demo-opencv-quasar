import { ISize } from "src/types/size";

export default createGlobalState(() => {
  const model = useSessionStorage(KEY_SIZE_Q_PAGE_ELEMENT, {
    width: 0,
    height: 0,
  });

  function setQPageElementSize(size: ISize) {
    setRef(model, size);
  }

  function getQPageElementSize() {
    return getRef(model) as ISize;
  }

  function setQPageElementWidth(width: number) {
    getRef(model).width = width;
  }

  function getQPageElementWidth() {
    return getRef(model).width;
  }

  function setQPageElementHeight(height: number) {
    getRef(model).height = height;
  }

  function getQPageElementHeight() {
    return getRef(model).height;
  }

  function getQPageElementRatio() {
    return getRef(model).width / getRef(model).height;
  }

  return {
    setQPageElementSize,
    getQPageElementSize,
    setQPageElementWidth,
    getQPageElementWidth,
    setQPageElementHeight,
    getQPageElementHeight,
    getQPageElementRatio,
  };
});
