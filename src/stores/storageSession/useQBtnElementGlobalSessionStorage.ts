import { IBounding } from "src/types/size";

export default createGlobalState(() => {
  const model = useSessionStorage(KEY_SIZE_Q_BTN_ELEMENT, {
    x: 0,
    y: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  function setQBtnElementSize(size: IBounding) {
    setRef(model, size);
  }

  function getQBtnElementSize() {
    return <IBounding>getRef(model);
  }

  return {
    setQBtnElementSize,
    getQBtnElementSize,
  };
});
