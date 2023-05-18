export default function () {
  const qPageElement = ref(null);
  const { width, height } = useElementSize(qPageElement);
  const { setQPageElementWidth, setQPageElementHeight } = useQPageElementGlobalSessionStorage();

  tryOnMounted(async () => {
    await Promise.all([
      invoke(async () => {
        await until(width).changed();
        setQPageElementWidth(getRef(width));
      }),
      invoke(async () => {
        await until(height).changed();
        setQPageElementHeight(getRef(height));
      }),
    ]);
  });

  return { qPageElement };
}
