export default function () {
  const $q = useQuasar();

  function notifyPositive(message: string) {
    return $q.notify({
      type: "positive",
      icon: "thumb_up",
      position: "top",
      message,
    });
  }

  function notifyNegative(message: string) {
    return $q.notify({
      type: "negative",
      icon: "thumb_down",
      position: "top",
      message,
    });
  }

  function notifyWarning(message: string) {
    return $q.notify({
      type: "warning",
      icon: "announcement",
      position: "top",
      message,
    });
  }

  function notifyInfo(message: string) {
    return $q.notify({
      type: "info",
      icon: "message",
      position: "top",
      message,
    });
  }

  return { notifyPositive, notifyNegative, notifyWarning, notifyInfo };
}
