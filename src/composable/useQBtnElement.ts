export default function () {
  const qBtnElement = ref(null);
  const { x, y, top, right, bottom, left, width, height } = useElementBounding(qBtnElement);
  const { setQBtnElementSize } = useQBtnElementGlobalSessionStorage();

  tryOnMounted(async () => {
    setQBtnElementSize({
      x: getRef(x),
      y: getRef(y),
      top: getRef(top),
      right: getRef(right),
      bottom: getRef(bottom),
      left: getRef(left),
      width: getRef(width),
      height: getRef(height),
    });
  });

  return { qBtnElement };
}
