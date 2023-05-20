export default function () {
  const $q = useQuasar();

  const _cancel = {
    label: "取消",
    flat: true,
    dense: true,
    color: "secondary",
  };
  const _ok = {
    label: "确认",
    flat: true,
    dense: true,
    color: "primary",
  };

  function dialogAlert(message: string, onOk: () => void) {
    return $q
      .dialog({
        class: "bg-red-1",
        title: "警告：",
        message,
        cancel: _cancel,
        ok: _ok,
      })
      .onOk(onOk);
  }

  return { dialogAlert };
}
